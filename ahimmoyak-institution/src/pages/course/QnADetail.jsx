import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "lucide-react";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const QnADetail = () => {
  const { qnaId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [qna, setQna] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [user, setUsername] = useState("");
  const axiosInstance = AxiosManager();
  const boardId = qnaId;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`auth/v1/info`, {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (qnaId) {
      axiosInstance
          .get(`board/v1/${qnaId}`)
          .then((response) => {
            const data = response.data;
            setQna({
              title: data.title,
              content: data.content,
              author: data.userName,
              createdAt: data.createdAt,
              date: data.updatedAt,
              view: data.view || 0,
              institutionCount: data.institutionCount,
              commentCount: data.commentCount,
            });
          })
          .catch((error) => {
            console.error("Failed to fetch question details: ", error);
          });
    }
  }, [qnaId]);

  useEffect(() => {
    if (qnaId) {
      axiosInstance
          .get(`board/v1/${qnaId}/comments`)
          .then((response) => {
            setComments(response.data.items);
          })
          .catch((error) => {
            console.error("Failed to fetch comments: ", error);
          });
    }
  }, [qnaId]);

  const commentPostClick = async (e) => {
    e.preventDefault();

    const requestDTO = {
      boardId: qnaId,
      content: newComment,
      institutionComment: 1,
      is_institution: "true",
    };

    try {
      await axiosInstance.post(`board/v1/${qnaId}/comments`, requestDTO);
      setNewComment("");
      const commentResponse = await axiosInstance.get(`board/v1/${qnaId}/comments`);
      setComments(commentResponse.data.items);
    } catch (error) {
      console.error("댓글 등록 실패: ", error);
    }
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const saveEditedComment = async () => {
    const requestDto = {
      content: editedComment
    }
    try {
      await axiosInstance.patch(`board/v1/comments/${editingCommentId}`, requestDto);
      setEditingCommentId(null);
      setEditedComment("");
      const commentResponse = await axiosInstance.get(`board/v1/${qnaId}/comments`);
      setComments(commentResponse.data.items);
    } catch (error) {
      console.error("댓글 수정 실패: ", error);
    }
  };

  const deleteComment = async (commentId) => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`board/v1/${boardId}/${commentId}`);
        const commentResponse = await axiosInstance.get(`board/v1/${qnaId}/comments`);
        setComments(commentResponse.data.items);
      } catch (error) {
        console.error("댓글 삭제 실패: ", error);
      }
    }
  };

  if (!qna) {
    return <div>로딩 중...</div>;
  }

  return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{qna.title}</h1>
            <div className="flex justify-between text-sm text-gray-500 pb-4 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{qna.author}</span>
              </div>
              <span>
              {qna.createdAt === qna.date
                  ? new Date(qna.date).toISOString().split("T")[0]
                  : `${new Date(qna.date).toISOString().split("T")[0]} (수정됨)`}
            </span>
            </div>
            <div className="mt-6 whitespace-pre-line">{qna.content}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium">답변 {qna.commentCount}</h2>
          </div>
          <div className="divide-y">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="p-4">
                      {editingCommentId === comment.id ? (
                          <div>
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="w-full border rounded-lg p-2 h-24"
                    />
                            <div className="flex justify-end gap-2 mt-2">
                              <button
                                  onClick={saveEditedComment}
                                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                저장
                              </button>
                              <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="px-4 py-2 text-sm bg-gray-200 rounded-md"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                      ) : (
                          <>
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium">{comment.userName}</span>
                                {comment.is_institution === "true" && (
                                    <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded">강사</span>)}
                              </div>
                              <span className="text-sm text-gray-500">
                        {comment.createdAt === comment.updatedAt
                            ? new Date(comment.updatedAt).toISOString().split("T")[0]
                            : `${new Date(comment.updatedAt).toISOString().split("T")[0]} (수정됨)`}
                      </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                            {comment.userName === user && (
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                      onClick={() => handleCommentEdit(comment.id, comment.content)}
                                      className="px-4 py-2 text-sm text-blue-600"
                                  >
                                    수정
                                  </button>
                                  <button
                                      onClick={() => deleteComment(comment.id)}
                                      className="px-4 py-2 text-sm text-red-600"
                                  >
                                    삭제
                                  </button>
                                </div>
                            )}
                          </>
                      )}
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">아직 댓글이 없습니다.</div>
            )}
          </div>

          <form className="p-4 border-t">
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="답변을 입력하세요"
              className="w-full border rounded-lg p-2 h-24 mb-2"
              required
          />
            <div className="flex justify-end">
              <button onClick={commentPostClick} className="px-4 py-2 bg-blue-600 text-white rounded">
                답변 등록
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-end">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">
            목록
          </button>
        </div>
      </div>
  );
};

export default QnADetail;
