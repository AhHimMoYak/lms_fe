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
  const size = 5;

  useEffect(() => {
    fetchData(`/board?type=${type}&page=${currentPage}&size=${size}`, "get");
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

  const paddedNotices = [...notices];
  while (paddedNotices.length < size) {
    paddedNotices.push({ title: "", createAt: "" });
  }

  return (
    <div className="noticeList">
      <div className="title_wrapper">
        <div className="board_title">공지사항</div>
        <button className="more_button">더보기</button>
      </div>
      <div className="list_wrapper">
        {paddedNotices.map((notice, index) => (
          <NoticeItem
            key={index}
            title={notice.title || " "}
            createAt={notice.createAt || " "}
          />
        ))}
      </div>
      {/* Pagination moved outside of the list wrapper */}
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
