import { useEffect, useState } from "react";
import "../../styles/Mypage/BoardList.css";
import useAxios from "../../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";

function BoardTotalList() {
    const [boards, setBoards] = useState([]);
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("all");
    const limit = 10; // 페이지당 항목 수
    const navigate = useNavigate();
    const {data, fetchData } = useAxios();

    const userName = "난중에고치기";
    const fetchBoards = async (lastKey = null, reset = false) => {
        setLoading(true);
        try {
            const keyParam = lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : '';
            await fetchData(`https://api.ahimmoyak.click/board/v1/user-name/${userName}?limit=${limit}${keyParam}`, "GET");

            if (data && data.items) {
                setBoards((prevBoards) => reset ? data.items : [
                    ...prevBoards,
                    ...data.items.filter((item) => !prevBoards.some((board) => board.id === item.id))
                ]);

                const newLastEvaluatedKey = data.lastEvaluatedKey || null;
                if (newLastEvaluatedKey && !reset) {
                    setLastEvaluatedKeys((prevKeys) => [...prevKeys, newLastEvaluatedKey]);
                }
            }
        } catch (error) {
            console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
        setLoading(false);
    };

    // 컴포넌트가 처음 렌더링될 때 첫 페이지 데이터를 불러옵니다.
    useEffect(() => {
        fetchBoards(null, true);
    }, []);

    useEffect(() => {
        if (data && data.items) {
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
    const handleBoardDetail = (courseProvideId,type,boardId) =>{
        navigate(`/mypage/course/${courseProvideId}/board/${type}/${boardId}`);
    }

    const filteredBoards = boards.filter((board) => {
        if (filter === "answered") return board.commentCount > 0;
        if (filter === "notAnswered") return board.commentCount === 0;
        return true; // 'all'인 경우
    });

    return (
        <div className="board-list-container">
            <h1>내가 작성한 글</h1>
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
            <table className="board-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>답변 여부</th>
                </tr>
                </thead>
                <tbody>
                {filteredBoards.map((board, index) => (
                    <tr key={board.id} onClick={() => handleBoardDetail(board.courseProvideId, board.type, board.id)}>
                        <td>{page * limit + index + 1}</td>
                        <td>{board.title.length > 13 ? `${board.title.substring(0, 13)}...` : board.title}</td>
                        <td>{board.userName}</td>
                        <td>{format(new Date(board.createdAt), "yy/MM/dd HH:mm")}</td>
                        <td className={board.commentCount > 0 ? "answered" : "not-answered"}>
                            {board.commentCount > 0 ? "완료" : "미완료"}
                        </td>
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
