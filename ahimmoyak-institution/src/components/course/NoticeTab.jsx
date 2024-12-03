import {useNavigate, useParams} from "react-router-dom";

const NoticeTab = () => {

  const navigate = useNavigate();
  const {courseId} = useParams();

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">공지사항</h2>
        <button
          onClick={() => navigate(`/courses/${courseId}/notice/new`)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          공지 작성
        </button>
      </div>
      <div className="divide-y">
        {[
          { id: 1, title: '1월 커리큘럼 업데이트 안내', date: '2024-01-15', views: 45 },
          { id: 2, title: '콘텐츠 업데이트 일정', date: '2024-01-10', views: 38 }
        ].map(notice => (
          <div key={notice.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/courses/${courseId}/notice/${notice.id}`)}>
            <div className="flex justify-between">
              <h3 className="font-medium">{notice.title}</h3>
              <div className="text-sm text-gray-500">
                {notice.date} · 조회 {notice.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NoticeTab