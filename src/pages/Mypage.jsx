import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Mypage() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXJ1bWlydSIsImVtYWlsIjoiYWxmbjA1MUBnbWFpbC5jb20iLCJpc3MiOiJBaGltbW95YWsiLCJpYXQiOjE3MjQxNDkxMTUsImV4cCI6MTcyNDE4NTExNX0.lZHq5HETpUZzotHEuHmC8FDj23uPwSqTdgLA0Kyd-q8";

  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <h1>대시보드</h1>;
      case "courseList":
        return <h1>코스 목록</h1>;
      case "qa":
        return <h1>Q&A</h1>;
      default:
        return <h1>대시보드</h1>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        token={token}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="main-content">{renderPageContent()}</div>
    </div>
  );
}

export default Mypage;
