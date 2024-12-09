import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const NoticeDetail = () => {
  const {courseId,noticeId} = useParams();
  const [notice, setNotice] = useState('');
  const axiosInstance = AxiosManager();

  useEffect(() => {
    if (noticeId) {
      axiosInstance.get(`board/v1/${noticeId}`)
          .then((response) => {
            const data = response.data;
            console.log(response);
            setNotice({
              title: data.title,
              content: data.content,
              author: data.userName,
              createdAt: data.createdAt,
              date: data.updatedAt,
              view: data.view / 2 || 0,
            });
          })
          .catch((error) => {
            console.error("Failed to fetch notice details: ", error);
          });
    } else {
      console.error("Invalid noticeId: ", noticeId);
    }
  }, [noticeId]);

  if (!notice) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <h1 className="text-lg font-bold mb-4">공지사항</h1>
      <div className="">

        {/* 게시글 상세 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{notice.title}</h2>
              </div>

              <div className="flex items-center text-sm text-gray-500 gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{notice.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{notice.data}</span>
                </div>
                <div>조회 {Math.floor(notice.view / 2)}</div>
              </div>
            </div>

            <div className="py-8 min-h-[200px]">
              {notice.content}
            </div>


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
