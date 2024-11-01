import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../../styles/Mypage/QnADetailed.css";
import {jwtDecode} from "jwt-decode";
import {decodeTokenTutor} from "../../authentication/decodeTokenTutor.jsx";
import { decodeToken } from "../../authentication/decodeToken.jsx";

function QnADetailed() {
    const {courseId, courseBoardId} = useParams();
    const {data, fetchData} = useAxios();
    const {data: deleteData, fetchData: deleteFetchData} = useAxios();
    const {data: commentData, fetchData: commentFetchData} = useAxios();
    const {data: commentDeleteData, fetchData: commentDeleteFetchData} = useAxios();
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/${courseId}/board/QNA/${courseBoardId}`, "GET");
    }, [courseBoardId]);

    const onClickEdit = () => {
        if(decodeTokenTutor()){
            navigate(`/education/course/${courseId}/qna/${courseBoardId}/edit`);
        }
        else{
            navigate(`/mypage/course/${courseId}/qna/${courseBoardId}/edit`);
        }
    }

    const onClickDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            deleteFetchData(`/course/${courseId}/board/${courseBoardId}`, "DELETE");
        }
    };

    useEffect(() => {
        if (deleteData) {
            if(decodeTokenTutor()){
                navigate(`/education/course/${courseId}/qna`);
            }
            else {
                navigate(`/mypage/course/${courseId}/qna`);
            }
            
        }
    }, [deleteData]);

    const handleList = () => {
        if(decodeTokenTutor()){
            navigate(`/education/course/${courseId}/qna`);
        }
        else{
            navigate(`/mypage/course/${courseId}/qna`);
        }
        
    }
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    }
    const handleCommentSubmit = () => {
        commentFetchData(`/course/${courseId}/board/${courseBoardId}/comment`, "POST",
            {comment: newComment}
        )
            .then(() => {
                setNewComment('');
                fetchData(`/course/${courseId}/board/qna/${courseBoardId}`, "GET");
            });
    }

    const handleCommentEdit = (commentId) => {
        navigate(`/education/course/${courseId}/qna/${courseBoardId}/edit`)
    }

    const handleCommentDelete = (commentId) => {
        commentDeleteFetchData(`/course/${courseId}/board/${courseBoardId}/comment/${commentId}`, "DELETE");
    }

    useEffect(() => {
        if(commentDeleteData){
            alert(commentDeleteData);
            window.location.reload();
        }
    },[commentDeleteData]);
   

    // 로딩 중일 때 처리
    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="qna-board-container">
            <div className="qna-board-header">
                <h2>QnA 게시판</h2>
                {data.user === decodeToken() && (
                    <div className="qna-board-actions">
                        <button className="edit-button" onClick={() => onClickEdit(courseBoardId)}>수정</button>
                        <button className="delete-button" onClick={onClickDelete}>삭제</button>
                    </div>
                )}
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
                    {data.comments.length === 0 && decodeTokenTutor() && (
                        <div className="qna-board-comment">
                            <textarea
                                className="qna-board-comment-input"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="댓글을 입력하세요..."
                            />
                            <div className="qna-board-comment-actions">
                                <button className="qna-board-comment-submit" onClick={() => handleCommentSubmit()}>댓글
                                    작성
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="qna-board-answer">
                    {data.comments.length > 0 && (
                        <>
                            <span>답변</span>
                            {decodeTokenTutor() && <div className="qna-board-actions">
                                <button className="edit-button" onClick={() => handleCommentEdit(data.comments[0].id)}>수정</button>
                                <button className="delete-button" onClick={() => handleCommentDelete(data.comments[0].id)}>삭제</button>
                            </div>
                            }                            
                            <div className="qna-board-answer-content">
                                {data.comments.map((comment, index) => (
                                    <p key={index}>{comment.content}</p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <button className="qna-back-button" onClick={handleList}>
                목록
            </button>
        </div>
    );
}

export default QnADetailed;