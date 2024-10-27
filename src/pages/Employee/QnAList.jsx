import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Employee/QnAList.css";

function QnAList() {
    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const own = query.get("own") || false;
    const { courseId } = useParams();
    const { data, fetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/courseBoard/${courseId}?type=QNA&page=${page}&size=10`, "GET");
    }, [courseId,page]);


    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };
    const handleCreateQnA= ()=>{
        navigate(`/mypage/course/${courseId}/qna/post`)
    }
    const handleRowClick=(courseBoardId)=>{
        navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
    }

    if (!data) {
        return <div>로딩 중...</div>;
    }
    const totalPages = data.totalPage
    return (
        <div className="qna-list-container">
            <div className="courselist-header">
                <div className="courselist-name">{data.courseTitle || "강좌 제목 없음"}</div>
                <button className="create-qna" onClick={handleCreateQnA}> 글작성</button>
            </div>
            <table className="qna-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>답변 여부</th>
                </tr>
                </thead>
                <tbody>
                {data.boards.map((board, index) => (
                    <tr key={board.id} onClick={() => handleRowClick(board.boardId)}>
                        <td>{(page - 1) * 10 + index + 1}</td>
                        <td>{board.title}</td>
                        <td> {new Date(board.createdAt).toISOString().split("T")[0]}</td>
                        <td className={board.commitCount > 0 ? "answered" : "not-answered"}>
                            {board.commitCount > 0 ? "완료" : "미완료"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 버튼 */}
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    {"<"}
                </button>

                {(() => {
                    const groupSize = 5; // 한 번에 보여줄 페이지 수
                    const currentGroup = Math.floor((page - 1) / groupSize);
                    const startPage = currentGroup * groupSize + 1;
                    const endPage = Math.min(startPage + groupSize - 1, totalPages);

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