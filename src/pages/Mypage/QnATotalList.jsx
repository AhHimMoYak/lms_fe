import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";

import "../../styles/Mypage/QnATotalList.css";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function QnATotalList() {
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page") || 1;
    const own = query.get("own") || false;
    const navigate = useNavigate();

    const { data: qnaData, error, fetchData: fetchQna } = useAxios();

    useEffect(() => {
        fetchQna(`/board/qna`, "GET");
    }, [page]);

    if (!qnaData) {
        return <div>로딩 중...</div>;
    }

    const handleRowClick = (courseId, courseBoardId) => {
        if(decodeTokenTutor()){
            navigate(`/education/course/${courseId}/qna/${courseBoardId}`);
        }
        else{
            navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);       
        }
    };

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };
    const itemsPerPage = 10; // 한 페이지당 보여줄 게시물 수
    const totalPages = Math.ceil(qnaData.length / itemsPerPage);

    const currentPageData = qnaData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <div className="myQna-list-container">
            <div className="myQna-list-header">
                <div className="myQna-list-title">내 QNA 목록</div>
                <table className="myQna-list-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>코스</th>
                            <th>제목</th>
                            <th>답변 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((board, index) => (
                            <tr key={board.boardId} onClick={() => handleRowClick(board.courseId, board.boardId)} className="myQna-clickable-row">
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td>{board.courseTitle}</td>
                                <td>{board.title}</td>
                                <td className={board.commitCount > 0 ? "answered" : "not-answered"}>{board.commitCount > 0 ? "완료" : "미완료"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div
                    className="gap"
                    style={{
                        height: `${(itemsPerPage - currentPageData.length) * 8}vh`,
                    }}
                ></div>
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
                                <button key={i} onClick={() => handlePageChange(i)} className={page === i ? "active" : ""}>
                                    {i}
                                </button>
                            );
                        }

                        return pages;
                    })()}

                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnATotalList;
