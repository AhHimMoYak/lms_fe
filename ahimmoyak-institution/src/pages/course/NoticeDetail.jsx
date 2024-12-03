import {useNavigate, useParams} from "react-router-dom";
import React, { useState } from "react";

const NoticeDetail = () => {
  const { courseId, noticeId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotice, setEditedNotice] = useState({
    title: '1월 커리큘럼 업데이트 안내',
    content: '안녕하세요.\n\n1월 커리큘럼이 다음과 같이 업데이트될 예정입니다...',
    date: '2024-01-15',
    views: 45
  });

  const handleSave = () => {
    // API 호출 로직
    setIsEditing(false);
  };

  const handleDelete = () => {
    //
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
                onChange={e => setEditedNotice({...editedNotice, title: e.target.value})}
                className="w-full border rounded-lg p-2 text-2xl font-bold"
              />
              <textarea
                value={editedNotice.content}
                onChange={e => setEditedNotice({...editedNotice, content: e.target.value})}
                className="w-full border rounded-lg p-2 h-64"
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">{editedNotice.title}</h1>
              <div className="flex justify-between text-sm text-gray-500 pb-4 border-b">
                <span>작성일 {editedNotice.date}</span>
                <span>조회 {editedNotice.views}</span>
              </div>
              <div className="mt-6 whitespace-pre-line">
                {editedNotice.content}
              </div>
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
                <button className="px-4 py-2 text-sm text-red-600">삭제</button>
                <button
                  onClick={() => navigate(-1)}
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