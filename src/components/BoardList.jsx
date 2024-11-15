import { useEffect, useState } from "react";
import "../styles/Mypage/QnAList.css";
import useAxios from "../hooks/api/useAxios.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {format} from "date-fns";

function BoardList() {
    const [boards, setBoards] = useState([]); // 전체 게시글 리스트
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]); // 각 페이지의 키들을 저장
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [page, setPage] = useState(0); // 현재 페이지 인덱스
    const limit = 10; // 페이지당 항목 수
    const navigate = useNavigate();
    const {data, fetchData } = useAxios();
    const {state} = useLocation();

    // 데이터 불러오는 함수
    const fetchBoards = async (lastKey = null, reset = false) => {
        setLoading(true);
        try {
            const keyParam = lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : '';
            await fetchData(`https://api.ahimmoyak.click/board/v1/courseProvide/${state.courseProvideId}/${state.type}?limit=${limit}${keyParam}`, "GET");

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

    const handleWriteBoard = () => {
        navigate(`/test/post`,{state:{courseProvideId: state.courseProvideId, type: state.type}});
    }

    const handleBoardDetail = (boardId) =>{
        navigate(`/test/${boardId}`);
    }
    return (
        <div className="qna-list-container">
            <h1>Q&A 게시판</h1>
            <button onClick={handleWriteBoard}>글쓰기</button>
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
                {boards.map((board, index) => (
                    <tr key={board.id} onClick={()=>handleBoardDetail(board.id,board.createdAt)}>
                        <td>{page * limit + index + 1}</td>
                        <td>{board.title}</td>
                        <td>{}</td>
                        <td className={board.commentCount > 0 ? "answered" : "not-answered"}>
                            {board.commentCount > 0 ? "완료" : "미완료"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {loading && <p>로딩 중...</p>}

            <div className="qna-pagination">
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

export default BoardList;
