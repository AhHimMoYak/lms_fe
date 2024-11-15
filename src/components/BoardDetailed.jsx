import useAxios from "../hooks/api/useAxios.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Mypage/Board.css";
import {decodeTokenTutor} from "../authentication/decodeTokenTutor.jsx";
import Comment from "./Comment.jsx";
import {format} from "date-fns";

function BoardDetailed() {
    const {data, fetchData} = useAxios();
    const {data: deleteData, fetchData: deleteFetchData} = useAxios();
    const navigate = useNavigate();
    const {courseProvideId, boardId}= useParams();

    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}`, "GET");
    }, [boardId]);

    const onClickEdit = () => {
        navigate(`/mypage/course/${courseProvideId}/board/${boardId}/edit`);
    }

    const onClickDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            deleteFetchData(`https://api.ahimmoyak.click/board/v1/courseProvide/${boardId}`, "DELETE");
        }
    };
    console.log(deleteData);
    useEffect(() => {
        if (deleteData==='') {
            if(decodeTokenTutor()){
                navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
            }
            else {
                navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
            }
        }
    }, [deleteData]);

    const handleList = () => {
        if(decodeTokenTutor()){
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
        }
        else{
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
        }
    }

    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="qna-board-container">
            <div className="qna-board-actions">
                <button className="edit-button" onClick={() => onClickEdit()}>수정</button>
                <button className="delete-button" onClick={onClickDelete}>삭제</button>
            </div>
            <div className="qna-board-header">
                <h2>QnA 게시판</h2>
                <div className="qna-board-header-info">
                    <p>{data.userName}</p>
                    <p>{format(new Date(data.updatedAt), "yy/MM/dd HH:mm")}</p>
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
                    <div className="qna-board-comment-input">
                        <Comment boardId={boardId}/>
                    </div>
                </div>
            </div>

            <button className="qna-back-button" onClick={handleList}>
                목록
            </button>
        </div>
    );
}

export default BoardDetailed;