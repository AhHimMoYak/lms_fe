import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import "../../styles/Mypage/QnADetailed.css";
import {jwtDecode} from "jwt-decode";

function QnADetailed() {
    const {courseId, courseBoardId} = useParams();
    const {data, fetchData} = useAxios();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access');
    useEffect(() => {
        fetchData(`/course/${courseId}/board/QNA/${courseBoardId}`, "GET");
        if (accessToken) {
            const user = jwtDecode(accessToken);
            setUsername(user.sub);
        }
    }, [courseBoardId, username]);
    const onClickEdit = ()=>{
        navigate(`/mypage/course/${courseId}/qna/edit`, {state:{courseBoardId:courseBoardId}});
    }
    const onClickDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            fetchData(`/courseBoard/${courseId}?courseBoardId=${courseBoardId}`, "DELETE");
            navigate(`/mypage/course/${courseId}/qna/questions`);
        }
    };
    // 로딩 중일 때 처리
    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="qna-board-container">
            <div className="qna-board-header">
                <h2>QnA 게시판</h2>
             {data.username === username && (
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
                        <span className="qna-board-author">{data.username}</span>
                    </div>
                    <div className="qna-board-question">
                        <p>{data.content}</p>
                    </div>
                </div>
                <div className="qna-board-answer">
                    {data.comments.length > 0 && (
                        <>
                            <span>답변</span>
                            <div className="qna-board-answer-content">
                                {data.comments.map((comment, index) => (
                                    <p key={index}>{comment.content}</p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QnADetailed;
