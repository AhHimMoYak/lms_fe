import useAxios from "../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from "date-fns";
import "../styles/Comment.css"
import {Button} from "@mui/material";

function Comment() {
    const { data, fetchData } = useAxios();
    const { fetchData: commentFetchData} = useAxios();
    const { data: commentDeleteData, fetchData: commentDeleteFetchData } = useAxios();
    const { data: commentEditData, fetchData: commentEditFetchData } = useAxios();
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const { boardId } = useParams();

    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}/comments`, "GET");
    }, [boardId]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const commentPostClick = async (e) =>{
        e.preventDefault();

        const requestDTO = {
            userName: "지금은 하드코딩",
            boardId: boardId,
            content: comment
        };
        await commentFetchData(`https://api.ahimmoyak.click/board/v1/${boardId}/comments`,"POST",requestDTO);
        setComment("");
        fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}/comments`, "GET");
    }

    useEffect(() => {
        if (commentDeleteData) {
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
        }
    }, [commentDeleteData]);

    useEffect(() => {
        if (commentEditData) {
            alert("댓글이 수정되었습니다.");
            setEditCommentId(null);
            setEditedComment('');
            fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}/comments`, "GET");
        }
    }, [commentEditData]);

    const handleCommentDelete = (commentId) => {
        const requestDTO = {
            boardId: boardId,
        };
        commentDeleteFetchData(`https://api.ahimmoyak.click/board/v1/comments/${commentId}`, "DELETE",requestDTO);
    };

    const handleCommentEdit = (commentId, content) => {
        setEditCommentId(commentId);
        setEditedComment(content);
    };

    const submitCommentEdit = (id) => {
        commentEditFetchData(`https://api.ahimmoyak.click/board/v1/comments/${id}`, "PATCH", {
            content: editedComment
        });
    };

    return (
        <div className="comment">
            <span>답변</span>
            <div className="comment-content">
                {Array.isArray(data?.items) && data.items.length > 0 ? (
                    data.items.map((comment, index) => (
                        <div key={index}>
                            {editCommentId === comment.id ? (
                                <div>
                                    <textarea
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                        className="comment-input"
                                    />
                                    <button className="save-button" onClick={() => submitCommentEdit(comment.id)}>저장
                                    </button>
                                    <button className="cancel-button" onClick={() => setEditCommentId(null)}>취소</button>
                                </div>
                            ) : (
                                <div className="comment-item">
                                    <div className="comment-header">
                                        <p className="comment-userName">{comment.userName}</p>
                                        <p className="comment-date">{format(new Date(comment.updatedAt), "yy/MM/dd HH:mm")}{comment.updatedAt !== comment.createdAt && "(수정됨)"}  </p>
                                    </div>
                                    <p>{comment.content}</p>
                                    <div className="comment-actions">
                                        <button className="comment-edit-button"
                                                onClick={() => handleCommentEdit(comment.id, comment.content)}>수정
                                        </button>
                                        <button className="comment-delete-button"
                                                onClick={() => handleCommentDelete(comment.id)}>삭제
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
            />
            <Button onClick={commentPostClick}>작성</Button>
        </div>
    );
}

export default Comment;
