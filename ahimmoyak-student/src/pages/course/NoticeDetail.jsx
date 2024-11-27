import PostNavigation from "../../components/board/PostNavigation.jsx";
import {NavLink, useParams} from "react-router-dom";

const NoticeDetail = () => {

  const {courseId} = useParams();

  // 예시 데이터
  const sampleNotice = {
    id: 1,
    title: "2024학년도 1학기 온라인 강의 안내",
    content: "안녕하세요. 2024학년도 1학기 온라인 강의 운영에 대해 안내드립니다...",
    author: "관리자",
    type: "notice",
    createdAt: "2024-03-25",
    viewCount: 128
  };
  const samplePrev = {
    id: 0,
    title: "2023학년도 2학기 온라인 강의 안내",
    content: "안녕하세요. 2024학년도 1학기 온라인 강의 운영에 대해 안내드립니다...",
    author: "관리자",
    type: "notice",
    createdAt: "2024-03-25",
    viewCount: 128
  };
  const sampleNext = {
    id: 2,
    title: "2024학년도 2학기 온라인 강의 안내",
    content: "안녕하세요. 2024학년도 1학기 온라인 강의 운영에 대해 안내드립니다...",
    author: "관리자",
    type: "notice",
    createdAt: "2024-03-25",
    viewCount: 128
  };

  const data = sampleNotice;

  return (
    <>
      <h1 className="text-lg font-bold mb-4">공지사항</h1>
      <div className="">

        {/* 게시글 상세 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
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
                <div>조회 {data.viewCount}</div>
              </div>
            </div>

            <div className="py-8 min-h-[200px]">
              {data.content}
            </div>

            {/* 이전/다음 글 네비게이션 */}
            <PostNavigation
              prevPost={samplePrev}
              nextPost={sampleNext}
            />
          </div>
        </div>

        {/* 목록 버튼 */}
        <NavLink className="mt-6 flex justify-center" to={`/course/${courseId}/notice`}>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            목록
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default NoticeDetail;
