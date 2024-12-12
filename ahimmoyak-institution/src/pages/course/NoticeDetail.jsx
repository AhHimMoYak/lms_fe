import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const NoticeDetail = () => {
    const { noticeId} = useParams();
    const navigate = useNavigate();
    const axiosInstance = AxiosManager();
    const [isEditing, setIsEditing] = useState(false);
    const [editedNotice, setEditedNotice] = useState(null);

    useEffect(() => {
        if (noticeId) {
            axiosInstance.get(`board/v1/${noticeId}`)
                .then((response) => {
                    const data = response.data;
                    setEditedNotice({
                        title: data.title,
                        content: data.content,
                        createdAt: data.createdAt,
                        date: data.updatedAt,
                        view: data.view || 0,
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch notice details: ", error);
                });
        } else {
            console.error("Invalid noticeId: ", noticeId);
        }
    }, [noticeId]);

    const handleSave = () => {
        const requestDto = {
            title: editedNotice.title,
            content: editedNotice.content
        }
        axiosInstance.patch(`board/v1/${noticeId}`, requestDto, {withCredentials: true})
            .then(() => setIsEditing(false));
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (isConfirmed) {
            axiosInstance
                .delete(`board/v1/${noticeId}`, {withCredentials: true})
                .then((response) => {
                    if (response) {
                        // navigate("/courses/1/notice"); // 삭제가 성공적으로 완료된 후 페이지 이동
                        navigate(-1); // 삭제가 성공적으로 완료된 후 페이지 이동
                    }
                })
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!editedNotice) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    {isEditing ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editedNotice.title}
                                onChange={(e) =>
                                    setEditedNotice({...editedNotice, title: e.target.value})
                                }
                                className="w-full border rounded-lg p-2 text-2xl font-bold"
                            />
                            <textarea
                                value={editedNotice.content}
                                onChange={(e) =>
                                    setEditedNotice({...editedNotice, content: e.target.value})
                                }
                                className="w-full border rounded-lg p-2 h-64"
                            />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-2">{editedNotice.title}</h1>
                            <div className="flex justify-between text-sm text-gray-500 pb-4 border-b">
                                <span> 작성일 {editedNotice.createdAt === editedNotice.date
                                    ? new Date(editedNotice.date).toISOString().split('T')[0]
                                    : `${new Date(editedNotice.date).toISOString().split('T')[0]} (수정됨)`}
                                </span>
                                <span>조회 {Math.floor(editedNotice.view / 2)}</span>
                            </div>
                            <div className="mt-6 whitespace-pre-line">{editedNotice.content}</div>
                        </>
                    )}
                </div>
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-end gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                                >
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
                                <button
                                    onClick={handleBack}
                                    className="px-4 py-2 bg-gray-200 rounded text-sm"
                                >
                                    목록
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;
