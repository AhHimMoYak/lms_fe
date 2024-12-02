import Pagination from "../../components/board/Pagination.jsx";
import {useState} from "react";
import {NavLink, useParams} from "react-router-dom";

const QnABoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const itemsPerPage = 10;

  const {courseId} = useParams();

  // 전체 질문 데이터
  const allQuestions = Array(25).fill(null).map((_, i) => ({
    id: i + 1,
    title: `Q${i + 1}: useEffect 의존성 배열 관련 질문입니다.`,
    content: 'useEffect의 의존성 배열을 비워두면 어떤 경우에 문제가 발생할 수 있나요?',
    author: `학생${i + 1}`,
    createAt: '2024-03-25',
    isAnswered: Math.random() > 0.5,
    comments: Math.floor(Math.random() * 5)
  }));

  // 필터링 및 정렬 적용
  const filteredQuestions = allQuestions.filter(q => {
    if (filter === 'answered') return q.isAnswered;
    if (filter === 'waiting') return !q.isAnswered;
    return true;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sort === 'latest') return b.id - a.id;
    return b.comments - a.comments;
  });

  // 현재 페이지의 질문만 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = sortedQuestions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedQuestions.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold mb-4">질문게시판</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            className="px-3 py-2 border rounded"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // 필터 변경 시 첫 페이지로
            }}
          >
            <option value="all">전체 보기</option>
            <option value="answered">답변 완료</option>
            <option value="waiting">답변 대기중</option>
          </select>
          <select
            className="px-3 py-2 border rounded"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1); // 정렬 변경 시 첫 페이지로
            }}
          >
            <option value="latest">최신순</option>
            <option value="comments">답변순</option>
          </select>
        </div>
        <NavLink
          to={`/course/${courseId}/qna/write`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          질문하기
        </NavLink>
      </div>

      <div className="space-y-2">
        {currentQuestions.map(question => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-4">
            <NavLink to={`/course/${courseId}/qna/${question.id}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{question.title}</h3>
                <span className={`px-2 py-1 text-sm rounded ${
                  question.isAnswered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {question.isAnswered ? '답변 완료' : '답변 대기중'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex space-x-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>{question.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{question.createAt}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
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
export default QnABoard;