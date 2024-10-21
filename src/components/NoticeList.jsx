import NoticeItem from "./NoticeItem";
import useAxios from "../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";

const NoticeList = () => {
  const { fetchData, data } = useAxios();
  const [notices, setNotices] = useState([]);

  const type = "NOTICE";

  useEffect(() => {
    fetchData(`/board?type=${type}&page=1&size=10`, "get");
  }, []);

  useEffect(() => {
    if (data && data.content) {
      setNotices(data.content);
    }
  }, [data]);

  return (
    <div className="list_wrapper">
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <NoticeItem
            key={index}
            title={notice.title}
            content={notice.content}
            createAt={notice.createAt}
          />
        ))
      ) : (
        <div>No notices available.</div>
      )}
    </div>
  );
};

export default NoticeList;
