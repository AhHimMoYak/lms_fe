import Pagination from "../../components/board/Pagination.jsx";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const QnABoard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const axiosInstance = AxiosManager();
    const limit = 10;
    const { courseId } = useParams();

    const fetchQuestions = async (keyParam = null) => {
        setLoading(true);

        try {
            const keyParamQuery = keyParam
                ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(keyParam))}`
                : "";
            const response = await axiosInstance.get(
                `board/v1/courses/${courseId}/qna?limit=${limit}${keyParamQuery}`);

            if (response.data) {
                const { items, totalCount, lastEvaluatedKey } = response.data;
                setTotalPages(Math.ceil(totalCount / limit));
                setQuestions(items);
                setLastEvaluatedKeys((prevKeys) => {
                    const updatedKeys = [...prevKeys];
                    updatedKeys[currentPage - 1] = lastEvaluatedKey;
                    return updatedKeys;
                });
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions(null);
    }, [filter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        const keyParam = lastEvaluatedKeys[page - 2] || null;
        fetchQuestions(keyParam);
    };

    const filteredQuestions = questions.filter((q) => {
        if (filter === "answered") return q.institutionComment > 0;
        if (filter === "notAnswered") return q.institutionComment === 0;
        return true;
    });


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
                            setCurrentPage(1); // 필터 변경 시 페이지 초기화
                            fetchQuestions(null); // 새로운 필터로 데이터 새로 가져오기
                        }}
                    >
                        <option value="all">전체 보기</option>
                        <option value="answered">답변 완료</option>
                        <option value="notAnswered">답변 대기중</option>
                    </select>

                </div>
                <NavLink
                    to={`/course/${courseId}/qna/write`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    질문하기
                </NavLink>
            </div>

            <div className="space-y-2">
                {filteredQuestions.map((question) => (
                    <div key={question.id} className="bg-white rounded-lg shadow-sm p-4">
                        <NavLink to={`/course/${courseId}/qna/${question.id}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">
                                    {question.title.length > 20 ? `${question.title.slice(0, 20)}...` : question.title}
                                </h3>
                                <span
                                    className={`px-2 py-1 text-sm rounded ${
                                        question.institutionComment > 0
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {question.institutionComment > 0 ? "답변 완료" : "답변 대기중"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <div className="flex space-x-4">
                                    <span>{question.userName}</span>
                                    <span>{question.createdAt === question.updatedAt
                                        ? new Date(question.updatedAt).toISOString().split('T')[0]
                                        : `${new Date(question.updatedAt).toISOString().split('T')[0]} (수정됨)`}</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
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

export default QnABoard;
