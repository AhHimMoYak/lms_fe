import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AxiosManager from "../authentication/AxiosManager.jsx";

const NoticeTab = () => {
    const [boards, setBoards] = useState([]); // 전체 게시글 리스트
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]); // 각 페이지의 키들을 저장
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [page, setPage] = useState(0); // 현재 페이지 인덱스
    const limit = 10; // 페이지당 항목 수
    const navigate = useNavigate();
    const { courseId } = useParams();
    const type = "notice";
    const axiosInstance = AxiosManager();

    const fetchBoards = async (keyParam = "",reset = false) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `board/v1/courses/${courseId}/${type}?limit=${limit}${keyParam}`
            );

            if (response.data && response.data.items) {
                setBoards((prevBoards) =>
                    keyParam
                        ? [
                            ...prevBoards,
                            ...response.data.items.filter(
                                (item) => !prevBoards.some((board) => board.id === item.id)
                            ),
                        ]
                        : response.data.items
                );

                const newLastEvaluatedKey = response.data.lastEvaluatedKey || null;
                if (newLastEvaluatedKey && keyParam) {
                    setLastEvaluatedKeys((prevKeys) => [...prevKeys, newLastEvaluatedKey]);
                } else {
                    setLastEvaluatedKeys([newLastEvaluatedKey]);
                }
            }
        } catch (error) {
            console.error("Error fetching boards:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards(null,true);
    }, [type,courseId]);

    const handleNextPage = () => {
        if (lastEvaluatedKeys[page]) {
            const keyParam = `&lastEvaluatedKey=${encodeURIComponent(
                JSON.stringify(lastEvaluatedKeys[page])
            )}`;
            setPage((prevPage) => prevPage + 1);
            fetchBoards(keyParam);
        }
    };

    return (
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
                {boards.map((notice) => (
                    <div
                        key={notice.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/courses/${courseId}/notice/${notice.id}`)}
                    >
                        <div className="flex justify-between">
                            <h3 className="font-medium">{notice.title}</h3>
                            <div className="text-sm text-gray-500">
                                {notice.date} · 조회 {notice.view}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && <div className="p-4 text-center">로딩 중...</div>}
                {!loading && lastEvaluatedKeys[page] && (
                    <button
                        onClick={handleNextPage}
                        className="p-4 w-full text-center text-blue-600 hover:underline"
                    >
                        더 보기
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoticeTab;
