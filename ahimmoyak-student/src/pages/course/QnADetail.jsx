import PostNavigation from "../../components/board/PostNavigation.jsx";
import {NavLink, useParams} from "react-router-dom";

const QuestionDetail = () => {

  const {courseId} = useParams();

  // 예시 데이터
  const sampleQuestion = {
    id: 1,
    title: "과제 제출 기한 관련 질문입니다.",
    content: "안녕하세요. 이번 주차 과제 제출 기한이 언제까지인가요?",
    author: "학생1",
    createdAt: '2024-03-25',
    type: "qna",
    status: "답변완료",
    commentCount: 3,
    comments: [
      {
        author: "교수님",
        content: "이번 주차 과제는 금요일 오후 6시까지입니다.",
        createdAt: '2024-03-25',
        isInstructor: true
      }
    ]
  };
  const samplePrev = {
    id: 0,
    title: "이전 질문을 또 물어보겠습니다.",
    content: "안녕하세요. 이번 주차 과제 제출 기한이 언제까지인가요?",
    author: "학생1",
    createdAt: '2024-03-25',
    type: "qna",
    status: "답변완료",
    commentCount: 3,
    comments: [
      {
        author: "교수님",
        content: "이번 주차 과제는 금요일 오후 6시까지입니다.",
        createdAt: '2024-03-25',
        isInstructor: true
      }
    ]
  };
  const sampleNext = {
    id: 0,
    title: "다음 질문은 아마도 없을겁니다.",
    content: "안녕하세요. 이번 주차 과제 제출 기한이 언제까지인가요?",
    author: "학생1",
    createdAt: '2024-03-25',
    type: "qna",
    status: "답변완료",
    commentCount: 3,
    comments: [
      {
        author: "교수님",
        content: "이번 주차 과제는 금요일 오후 6시까지입니다.",
        createdAt: '2024-03-25',
        isInstructor: true
      }
    ]
  };

  const data = sampleQuestion;

  return (
    <div className="">
      <h1 className="text-lg font-bold mb-4">질문게시판</h1>

      {/* 게시글 상세 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded
                ${data.status === '답변완료' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                {data.status}
              </span>
              <h2 className="text-xl font-bold">{data.title}</h2>
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{data.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{data.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="py-8 min-h-[200px]">
            {data.content}
          </div>

          {/* 답변 섹션 */}
          <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
            <h3 className="font-bold text-lg">
              댓글 {data.commentCount}개
            </h3>
            {data.comments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.author}</span>
                    {comment.isInstructor && (
                      <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                        강사답변
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {comment.createdAt}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          {/* 답변 작성 폼 */}
          <div className="mt-6 border rounded-lg p-4">
            <textarea
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="답변을 작성해주세요..."
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                답변 등록
              </button>
            </div>
          </div>

          {/* 이전/다음 글 네비게이션 */}
          <PostNavigation
            prevPost={samplePrev}
            nextPost={sampleNext}
          />
        </div>
      </div>

      {/* 목록 버튼 */}
      <NavLink to={`/course/${courseId}/qna`} className="mt-6 flex justify-center">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          목록
        </button>
      </NavLink>
    </div>
  );
};

export default QuestionDetail;