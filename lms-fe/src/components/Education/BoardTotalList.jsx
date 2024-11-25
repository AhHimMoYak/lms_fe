import { useEffect, useState } from "react";
import "../../styles/Mypage/BoardList.css";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";

function BoardTotalList() {
    const [boards, setBoards] = useState([]); // 전체 게시글 리스트
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]); // 각 페이지의 키들을 저장
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [page, setPage] = useState(0); // 현재 페이지 인덱스
    const { type } = useParams();
    const limit = 10; // 페이지당 항목 수
    const navigate = useNavigate();
    const { data, fetchData } = useAxios();

    const institutionId = "2";

    const fetchBoards = async (lastKey = null, reset = false) => {
        setLoading(true);
        try {
            const keyParam = lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : '';
            await fetchData(`https://api.ahimmoyak.click/board/v1/institution/${institutionId}/${type}?limit=${limit}${keyParam}`, "GET");

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

    // 컴포넌트가 처음 렌더링될 때 또는 type이 변경될 때 데이터를 불러옵니다.
    useEffect(() => {
        setPage(0); // type이 변경될 때 페이지 번호를 초기화합니다.
        setBoards([]); // 기존 데이터를 초기화합니다.
        setLastEvaluatedKeys([]); // 기존 키 데이터를 초기화합니다.
        fetchBoards(null, true); // 새 데이터를 불러옵니다.
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

    const handleBoardDetail = (courseProvideId, type, boardId) => {
        navigate(`/education/course/${courseProvideId}/board/${type}/${boardId}`);
    };

    return (
        <div className="board-list-container">
            <h2>{type} 게시판</h2>
            <table className="board-total-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>코스명</th>
                    <th>제목</th>
                    <th>작성자</th>
                    {type !== "Notice" && <th>답변 여부</th>}
                </tr>
                </thead>
                <tbody>
                {boards.map((board, index) => (
                    <tr key={board.id} onClick={() => handleBoardDetail(board.courseProvideId, board.type, board.id)}>
                        <td>{page * limit + index + 1}</td>
                        <td>{board.course}</td>
                        <td>{board.title.length > 13 ? `${board.title.substring(0, 13)}...` : board.title}</td>
                        <td>{board.userName}</td>
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
