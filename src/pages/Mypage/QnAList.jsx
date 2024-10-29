import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Mypage/QnAList.css";

function QnAList() {
    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const own = query.get("own") || false;
    const { courseId } = useParams();
    const { data, fetchData } = useAxios();
    const { data: courseData, fetchData: courseFetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/${courseId}/board/QNA`, "GET");
        courseFetchData(`/course/${courseId}`, "GET");
    }, [courseId, page]);

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };
    const handleCreateQnA = () => {
        navigate(`/mypage/course/${courseId}/qna/post`);
    };
    const handleRowClick = (courseBoardId) => {
        navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
    };
    useEffect(() => {
        if (!data) {
            console.log(data);
        }
    }, [data]);
    if (!data || !courseData) {
        return <div>로딩 중...</div>;
    }
    const itemsPerPage = 10; // 한 페이지당 보여줄 게시물 수
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentPageData = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="qna-list-container">
            <div className="courselist-header">
                <div className="courselist-name">
                    {courseData.title || "강좌 제목 없음"}
                </div>
                <button className="create-qna" onClick={handleCreateQnA}>
                    글작성
                </button>
            </div>
            <table className="qna-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>답변 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((board, index) => (
                        <tr
                            key={board.id}
                            onClick={() => handleRowClick(board.boardId)}
                        >
                            <td>{(page - 1) * itemsPerPage + index + 1}</td>
                            <td>{board.title}</td>
                            <td
                                className={
                                    board.comment > 0
                                        ? "answered"
                                        : "not-answered"
                                }
                            >
                                {board.comment > 0 ? "완료" : "미완료"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    {"<"}
                </button>

                {(() => {
                    const groupSize = 5; // 한 번에 보여줄 페이지 수
                    const currentGroup = Math.floor((page - 1) / groupSize);
                    const startPage = currentGroup * groupSize + 1;
                    const endPage = Math.min(
                        startPage + groupSize - 1,
                        totalPages
                    );

                    const pages = [];
                    for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                            <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={page === i ? "active" : ""}
                            >
                                {i}
                            </button>
                        );
                    }

                    return pages;
                })()}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default QnAList;
