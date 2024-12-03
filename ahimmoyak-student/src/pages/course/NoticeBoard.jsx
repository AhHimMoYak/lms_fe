import Pagination from "../../components/board/Pagination.jsx";
import {useState} from "react";
import {NavLink, useParams} from "react-router-dom";

const NoticeBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {courseId} = useParams();

  // 전체 공지사항 데이터
  const allNotices = Array(23).fill(null).map((_, i) => ({
    id: i + 1,
    title: `공지사항 ${i + 1}: React 18 업데이트에 따른 강의 내용 변경 안내`,
    content: '강의 내용이 React 18의 새로운 기능을 반영하여 업데이트되었습니다...',
    author: '관리자',
    type: "notice",
    createAt: '2024-03-25',
    views: Math.floor(Math.random() * 100) + 50
  }));

  // 현재 페이지의 공지사항만 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = allNotices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allNotices.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold mb-4">공지사항</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {currentNotices.map((notice, index) => (
          <NavLink key={notice.id}  to={`/course/${courseId}/notice/${notice.id}`}>
            <div className={`p-4 hover:bg-gray-200 ${index !== currentNotices.length - 1 ? 'border-b' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{notice.title}</h3>
                <span className="text-sm text-gray-500">조회 {notice.views}</span>
              </div>
              <div className="text-sm text-gray-500 flex space-x-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>{notice.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>{notice.createAt}</span>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default NoticeBoard;