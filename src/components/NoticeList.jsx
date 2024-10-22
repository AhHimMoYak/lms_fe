import NoticeItem from "./NoticeItem";
import useAxios from "../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";
import "../styles/NoticeList.css";

const NoticeList = () => {
  const { fetchData, data } = useAxios();
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const type = "NOTICE";

  useEffect(() => {
    fetchData(`/board?type=${type}&page=${currentPage}&size=10`, "get");
  }, [currentPage]);

  useEffect(() => {
    if (data && data.content) {
      setNotices(data.content);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NoticeList;
