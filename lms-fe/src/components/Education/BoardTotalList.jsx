import { useEffect, useState } from "react";
import "../../styles/Mypage/BoardList.css";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {format} from "date-fns";

function BoardTotalList() {
    const [boards, setBoards] = useState([]); // 전체 게시글 리스트
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]); // 각 페이지의 키들을 저장
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [page, setPage] = useState(0); // 현재 페이지 인덱스
    const [filter, setFilter] = useState("all");
    const { type } = useParams();
    const limit = 10; // 페이지당 항목 수
    const navigate = useNavigate();
    const { data, fetchData } = useAxios();

    const institutionId = 1;

    const fetchBoards = async (lastKey = null, reset = false) => {
        setLoading(true);
        try {
            const keyParam = lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : '';
            const response = await fetchData(`https://api.ahimmoyak.click/board/v1/institutions/${institutionId}/${type}?limit=${limit}${keyParam}`, "GET");
            if (response && response.items) {
                setBoards((prevBoards) => reset ? response.items : [
                    ...prevBoards,
                    ...response.items.filter((item) => !prevBoards.some((board) => board.id === item.id))
                ]);

                const newLastEvaluatedKey = response.lastEvaluatedKey || null;
                if (newLastEvaluatedKey && !reset) {
                    setLastEvaluatedKeys((prevKeys) => [...prevKeys, newLastEvaluatedKey]);
                }
            }
        } catch (error) {
            console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
        setLoading(false);
    };


    useEffect(() => {
        setPage(0);
        setBoards([]);
        setLastEvaluatedKeys([]);
        fetchBoards(null, true);
    }, [type]);


    useEffect(() => {
        if (data) {
            setBoards(data.items);
            setLastEvaluatedKeys([data.lastEvaluatedKey || null]);
        }
    }, [data]);

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (lastEvaluatedKeys[page]) {
            setPage((prevPage) => prevPage + 1);
            fetchBoards(lastEvaluatedKeys[page]);
        }
    };

    // 이전 페이지로 이동
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
            const previousKey = page > 1 ? lastEvaluatedKeys[page - 2] : null;
            fetchBoards(previousKey, true);
        }
    };

    const handleBoardDetail = (courseId, type, boardId) => {
        navigate(`/education/course/${courseId}/board/${type}/${boardId}`);
    };

    const filteredBoards = boards.filter((board) => {
        if (filter === "answered") return board.commentCount > 0;
        if (filter === "notAnswered") return board.commentCount === 0;
        return true; // 'all'인 경우
    });

    return (
        <div className="board-list-container">
            <h2>{type} 게시판</h2>
            {type !== "Notice" && (
                <div className="filter-buttons">
                    <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
                        전체
                    </button>
                    <button onClick={() => setFilter("answered")} className={filter === "answered" ? "active" : ""}>
                        답변 완료
                    </button>
                    <button onClick={() => setFilter("notAnswered")}
                            className={filter === "notAnswered" ? "active" : ""}>
                        미답변
                    </button>
                </div>
            )}
            <table className="board-total-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>코스명</th>
                    <th className="title">제목</th>
                    <th className="author">작성자</th>
                    <th className="date">날짜</th>
                    {type !== "Notice" && <th>답변 여부</th>}
                </tr>
                </thead>
                <tbody>
                {filteredBoards.map((board, index) => (
                    <tr key={board.id} onClick={() => handleBoardDetail(board.courseId, board.type, board.id)}>
                        <td>{page * limit + index + 1}</td>
                        <td>{board.course}</td>
                        <td>{board.title.length > 13 ? `${board.title.substring(0, 13)}...` : board.title}</td>
                        <td>{board.userName}</td>
                        <td>{format(new Date(board.createdAt), "yy/MM/dd HH:mm")}</td>
                        {type !== "Notice" && (
                            <td className={board.commentCount > 0 ? "answered" : "not-answered"}>
                                {board.commentCount > 0 ? "완료" : "미완료"}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>

            {loading && <p>로딩 중...</p>}

            <div className="board-pagination">
                <button onClick={handlePreviousPage} disabled={page === 0 || loading}>
                    이전 페이지
                </button>
                <button onClick={handleNextPage} disabled={!lastEvaluatedKeys[page] || loading}>
                    다음 페이지
                </button>
            </div>
        </div>
    );
}

export default BoardTotalList;
