import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../../styles/Mypage/Board.css";
import {decodeTokenTutor} from "../../authentication/decodeTokenTutor.jsx";
import Comment from "../Comment.jsx";
import {format} from "date-fns";

function BoardDetailed() {
    const {data, fetchData} = useAxios();
    const {data: deleteData, fetchData: deleteFetchData} = useAxios();
    const navigate = useNavigate();
    const {courseProvideId, boardId}= useParams();

    useEffect(() => {
        if (boardId) {
            console.log(`Fetching data for boardId: ${boardId}`);
            fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}`, "GET");
        } else {
            console.error("Invalid boardId: ", boardId);
        }
    }, [boardId]);

    const onClickEdit = () => {
        navigate(`/mypage/course/${courseProvideId}/board/${boardId}/edit`);
        // navigate(`/education/course/${courseProvideId}/board/${boardId}/edit`);  // TODO 교육기관일때 이동해야하는 곳
    }

    const onClickDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            deleteFetchData(`https://api.ahimmoyak.click/board/v1/${boardId}`, "DELETE");
        }
    };

    useEffect(() => {
        if (deleteData==='') {
            if(decodeTokenTutor()){
                navigate(`/education/course/${courseProvideId}/board/${data.type}`);
            }
            else {
                navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
            }
        }
    }, [deleteData]);

    const handleList = () => {
        if(decodeTokenTutor()){
            navigate(`/education/course/${courseProvideId}/board/${data.type}`);
        }
        else{
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
        }
    }

    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="board-container">
            <div className="board-actions">
                <button className="edit-button" onClick={() => onClickEdit()}>수정</button>
                <button className="delete-button" onClick={onClickDelete}>삭제</button>
            </div>
            <div className="board-header">
                <h2>QnA 게시판</h2>
                <div className="board-header-info">
                    <p>{data.userName}</p>
                    <p>{format(new Date(data.updatedAt), "yy/MM/dd HH:mm")}  {data.updatedAt !== data.createdAt && " (수정됨)"}</p>
                </div>
            </div>
            <div className="board-content">
                <div className="board-item">
                    <div className="board-title">
                        <span>{data.title}</span>
                        <span className="board-author">{data.user}</span>
                    </div>
                    <div className="board-question">
                        {data.s3Urls && data.s3Urls.length > 0 && (
                            <div className="board-images">
                                {data.s3Urls.map((url, index) => (
                                    <img key={index} src={url} alt={`Uploaded file ${index + 1}`} className="board-image" />
                                ))}
                            </div>
                        )}
                        <p>{data.content}</p>
                    </div>
                    <div className="board-comment-input">
                        <Comment boardId={boardId}/>
                    </div>
                </div>
            </div>

            <button className="back-button" onClick={handleList}>
                목록
            </button>
        </div>
    );
}

export default BoardDetailed;