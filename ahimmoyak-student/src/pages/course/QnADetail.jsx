import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const QuestionDetail = () => {
  const { qnaId } = useParams();
  const navigate = useNavigate();
  const [qna, setQna] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQna, setEditedQna] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [user, setUsername] = useState("");
  const boardId = qnaId;
  const axiosInstance = AxiosManager();

  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`auth/v1/info`);
        setUsername(response.data.username);

      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (qnaId) {
      axiosInstance.get(`board/v1/${qnaId}`)
          .then((response) => {
            const data = response.data;
            setQna({
              title: data.title,
              content: data.content,
              author: data.userName,
              createdAt: data.createdAt,
              date: data.updatedAt,
              view: data.view || 0,
              institutionComment: data.institutionComment,
              commentCount: data.commentCount,
            });
            setEditedQna({
              title: data.title,
              content: data.content,
            });
          })
          .catch((error) => {
            console.error("Failed to fetch question details: ", error);
          });
    }
  }, [qnaId]);

  useEffect(() => {
    if (qnaId) {
      axiosInstance.get(`board/v1/${qnaId}/comments`)
          .then((response) => {
            setComments(response.data.items);
          })
          .catch((error) => {
            console.error("댓글 가져오기 실패: ", error);
          });
    }
  }, [qnaId]);

  const commentPostClick = async (e) => {
    e.preventDefault();

    const requestDTO = {
      boardId: qnaId,
      content: newComment,
      institutionComment: 0, // 강사일 경우 1, 아니면 0
      is_institution: "false", // 강사 여부
    };
    const newCommentObj = {
      id: Date.now(), // Temporary ID until the server assigns one
      userName: user,
      content: newComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      is_institution: "true",
    };
    setComments((prevComments) => [...prevComments, newCommentObj]);
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
    setComments((prevComments) =>
        prevComments.map((comment) =>
            comment.id === editingCommentId
                ? { ...comment, content: editedComment, updatedAt: new Date().toISOString() }
                : comment
        )
    );
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
      setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
      );
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

  const handleSave = async () => {
    const requestDTO = {
      title: editedQna.title,
      content: editedQna.content,
    };

    try {
      await axiosInstance.patch(`board/v1/${qnaId}`, requestDTO);
      setIsEditing(false);
    } catch (error) {
      console.error("질문 수정 실패: ", error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {

      axiosInstance
          .delete(`board/v1/${qnaId}`)
          .then((response) => {
            if (response) {
              navigate(-1);
            }
          });
    }
  };

  if (!qna) {
    return <div>로딩 중...</div>;
  }

  return (
      <div className="">
        <h1 className="text-lg font-bold mb-4">질문게시판</h1>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {isEditing ? (
                <div className="space-y-4">
                  <input
                      type="text"
                      value={editedQna.title}
                      onChange={(e) => setEditedQna({...editedQna, title: e.target.value})}
                      className="w-full border rounded-lg p-2 text-xl font-bold"
                  />
                  <textarea
                      value={editedQna.content}
                      onChange={(e) => setEditedQna({...editedQna, content: e.target.value})}
                      className="w-full border rounded-lg p-2 h-64"
                  />
                </div>
            ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                  <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                          qna.institutionComment > 0 ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100"
                      }`}
                  >
                    {qna.institutionComment > 0 ? "답변 완료" : "답변 대기중"}
                  </span>
                      <h2 className="text-xl font-bold">{qna.title}</h2>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 gap-4 pb-4 border-b border-gray-200">
                      <span>{qna.author}</span>
                      <span>
                    {qna.createdAt === qna.date
                        ? new Date(qna.date).toISOString().split("T")[0]
                        : `${new Date(qna.date).toISOString().split("T")[0]} (수정됨)`}
                  </span>
                    </div>
                  </div>

                  <div className="py-8 min-h-[200px]">{qna.content}</div>
                </>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-end gap-2">
              {isEditing ? (
                  <>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
                      저장
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-200 rounded text-sm"
                    >
                      취소
                    </button>
                  </>
              ) : (
                  <>
                    {qna.author === user && (
                        <>
                          <button
                              onClick={() => setIsEditing(true)}
                              className="px-4 py-2 text-sm text-blue-600"
                          >
                            수정
                          </button>
                          <button
                              onClick={handleDelete}
                              className="px-4 py-2 text-sm text-red-600"
                          >
                            삭제
                          </button>
                        </>
                    )}
                  </>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
          <h3 className="font-bold text-lg">댓글 {comments.length}개</h3>
          {comments.length > 0 ? (
              comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
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
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.userName}</span>
                              {comment.is_institution === "true" && (
                                  <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded">강사</span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                      {comment.createdAt === comment.updatedAt
                          ? new Date(comment.updatedAt).toISOString().split("T")[0]
                          : `${new Date(comment.updatedAt).toISOString().split("T")[0]} (수정됨)`}
                    </span>
                          </div>
                          <p>{comment.content}</p>
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
              <p>댓글이 없습니다.</p>
          )}
        </div>

        {/* Comment Form */}
        <form className="p-4 border-t">
        <textarea
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="답변을 작성해주세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        />
            <button
                onClick={commentPostClick}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              답변 등록
            </button>
        </form>
      </div>
)
  ;
};

export default QuestionDetail;
