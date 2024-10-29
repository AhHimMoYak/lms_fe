import { useLocation, useNavigate } from "react-router-dom";

import "/src/styles/Mypage/QnATotalList.css";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";

function QnATotalList() {
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page") || 1;
    const own = query.get("own") || false;
    const navigate = useNavigate();

    const { data: qnaData, error, fetchData: fetchQna } = useAxios();

    useEffect(() => {
        fetchQna(`/courseBoard/myBoard?page=${page}&size=10`, "GET");
    }, [page]);

    if (!qnaData) {
        return <div>로딩 중...</div>;
    }

    const handleRowClick = (boardId) => {
        navigate(`/mypage/qna/${boardId}`);
    };

    const totalPages = qnaData.totalPage;

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };

    return (
        <div className="myQna-list-container">
            <div className="myQna-list-header">
                <h2 className="myQna-list-title">내 QNA 목록</h2>
                <table className="myQna-list-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>코스</th>
                            <th>제목</th>
                            <th>종류</th>
                            <th>질문일</th>
                            <th>답변 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qnaData.boards.map((board, index) => (
                            <tr
                                key={board.boardId}
                                onClick={() => handleRowClick(board.boardId)}
                                className="myQna-clickable-row"
                            >
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td>{board.courseName}</td>
                                <td>{board.title}</td>
                                <td>{board.type}</td>
                                <td>
                                    {" "}
                                    {
                                        new Date(board.createdAt)
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </td>
                                <td
                                    className={
                                        board.commitCount > 0
                                            ? "answered"
                                            : "not-answered"
                                    }
                                >
                                    {board.commitCount > 0 ? "완료" : "미완료"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="courselist-pagination"></div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${
                            page === index + 1 ? "active" : ""
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QnATotalList;
