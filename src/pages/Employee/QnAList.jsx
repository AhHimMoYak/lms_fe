import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Employee/QnAList.css";

function QnAList() {
    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const own = query.get("own") || false;
    const { courseId } = useParams();
    const { data, error, fetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/courseBoard/${courseId}?type=QNA&page=${page}&size=10`, "GET");
    }, [courseId,page]);


    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };
    // 에러 처리
    if (error) {
        return <div>에러 발생: {error.message}</div>;
    }

    // 로딩 중일 때 처리
    if (!data) {
        return <div>로딩 중...</div>;
    }
    const totalPages = data.totalPage
    // 전체 페이지 수 계산
    console.log(totalPages)
    return (
        <div className="qna-list-container">
            <div className="courselist-name">{data.courseTitle || "강좌 제목 없음"}
            <button className="create-qna"> 글작성 </button></div>
            <table className="qna-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>강좌명</th>
                    <th>날짜</th>
                    <th>답변 여부</th>
                </tr>
                </thead>
                <tbody>
                {data.boards.map((board, index) => (
                    <tr key={board.id}>
                        <td>{(page - 1) * 10 + index + 1}</td>
                        <td>{board.title}</td>
                        <td>2024.01.01</td>
                        <td className={board.commitCount > 0 ? "answered" : "not-answered"}>
                            {board.commitCount >0 ? "완료" : "답변하지 않음"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 버튼 */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    {"<"}
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={page === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}

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