import {useNavigate, useParams} from "react-router-dom";

const NoticeDetail = () => {
  const { courseId, noticeId } = useParams();
  const notice = {
    title: '1월 커리큘럼 업데이트 안내',
    content: '안녕하세요.\n\n1월 커리큘럼이 다음과 같이 업데이트될 예정입니다...',
    date: '2024-01-15',
    views: 45
  };

  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 pb-4 border-b">
            <span>작성일 {notice.date}</span>
            <span>조회 {notice.views}</span>
          </div>
          <div className="mt-6 whitespace-pre-line">
            {notice.content}
          </div>
        </div>
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 text-sm text-blue-600">수정</button>
            <button className="px-4 py-2 text-sm text-red-600">삭제</button>
            <button
              onClick={() => navigate(`/courses/${courseId}?tab=notice`)}
              className="px-4 py-2 bg-gray-200 rounded text-sm"
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeDetail;