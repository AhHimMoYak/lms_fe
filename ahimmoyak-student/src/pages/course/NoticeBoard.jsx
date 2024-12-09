import Pagination from "../../components/board/Pagination.jsx";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const axiosInstance = AxiosManager();
    const limit = 10;
    const { courseId } = useParams();

    const fetchNotices = async (keyParam = null) => {
        setLoading(true);
        try {
            const keyParamQuery = keyParam
                ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(keyParam))}`
                : "";
            const response = await axiosInstance.get(`board/v1/courses/${courseId}/notice?limit=${limit}${keyParamQuery}`);
            if (response.data && response.data.items) {
                const { items, totalCount, lastEvaluatedKey } = response.data;
                setNotices(items);
                setTotalPages(Math.ceil(totalCount / limit));

                setLastEvaluatedKeys((prevKeys) => {
                    const updatedKeys = [...prevKeys];
                    updatedKeys[currentPage - 1] = lastEvaluatedKey;
                    return updatedKeys;
                });
            } else {
                console.warn("No items found in response data");
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices(null);
    }, []);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        const keyParam = lastEvaluatedKeys[page - 2] || null;
        fetchNotices(keyParam);
    };


  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold mb-4">공지사항</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {notices.map((notice, index) => (
          <NavLink key={notice.id}  to={`/course/${courseId}/notice/${notice.id}`}>
            <div className={`p-4 hover:bg-gray-200 ${index !== notices.length - 1 ? 'border-b' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{notice.title}</h3>
                <span className="text-sm text-gray-500">조회 {Math.floor(notice.view / 2)}</span>
              </div>
              <div className="text-sm text-gray-500 flex space-x-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>{notice.userName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>{notice.createdAt === notice.updatedAt
                      ? new Date(notice.updatedAt).toISOString().split('T')[0]
                      : `${new Date(notice.updatedAt).toISOString().split('T')[0]} (수정됨)`}</span>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
        {loading && <p>로딩 중...</p>}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default NoticeBoard;