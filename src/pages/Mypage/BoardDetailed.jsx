import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import "../../styles/Mypage/QnADetailed.css";
import {decodeTokenTutor} from "../../authentication/decodeTokenTutor.jsx";
import CommentList from "./CommentList.jsx";

function BoardDetailed() {
    const {data, fetchData} = useAxios();
    const {data: deleteData, fetchData: deleteFetchData} = useAxios();

    const navigate = useNavigate();
    const {boardId}= useParams();
    const {state} = useLocation();

    console.log(boardId);
    console.log(state.createdAt);

    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/v1/board/${boardId}/${state.createdAt}`, "GET");
    }, [boardId]);

    const onClickEdit = (createdAt) => {
        navigate(`/test/${boardId}/edit`,{state:{createdAt : createdAt}});
    }

    const onClickDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            deleteFetchData(`https://api.ahimmoyak.click/v1/board/courseProvide/${boardId}/${state.createdAt}`, "DELETE");
        }
    };
    console.log(deleteData);
    useEffect(() => {
        if (deleteData==='') {
            if(decodeTokenTutor()){
                navigate(`/test`);
            }
            else {
                navigate(`/test`);
            }
        }
    }, [deleteData]);

    const handleList = () => {
        if(decodeTokenTutor()){
            navigate(`/test`);
        }
        else{
            navigate(`/test`);
        }
        
    }

    // 로딩 중일 때 처리
    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="qna-board-container">
            <div className="qna-board-header">
                <h2>QnA 게시판</h2>
                    <div className="qna-board-actions">
                        <button className="edit-button" onClick={() => onClickEdit(state.createdAt)}>수정</button>
                        <button className="delete-button" onClick={onClickDelete}>삭제</button>
                    </div>
            </div>
            <div className="qna-board-content">
                <div className="qna-board-item">
                    <div className="qna-board-title">
                        <span>{data.title}</span>
                        <span className="qna-board-author">{data.user}</span>
                    </div>
                    <div className="qna-board-question">
                        <p>{data.content}</p>
                    </div>
                    <CommentList/>
                </div>
            </div>

            <button className="qna-back-button" onClick={handleList}>
                목록
            </button>
        </div>
    );
}

export default BoardDetailed;