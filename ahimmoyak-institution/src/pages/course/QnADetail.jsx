import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'lucide-react';

const QnADetail = () => {
  const { courseId, questionId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');

  const question = {
    title: 'React Hook의 생명주기 질문',
    content: 'useEffect와 기존 클래스 컴포넌트의 생명주기 메서드의 차이점이 궁금합니다.',
    author: '김학생',
    date: '2024-01-15',
    comments: [
      {
        id: 1,
        author: '김강사',
        content: '기존 클래스 컴포넌트의 생명주기와 Hook의 주요 차이점은...',
        date: '2024-01-15',
        isInstructor: true
      },
      {
        id: 2,
        author: '이학생',
        content: '저도 같은 고민을 했었는데 도움이 되었습니다.',
        date: '2024-01-15'
      }
    ]
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // API 호출 로직
    setNewComment('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 pb-4 border-b">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{question.author}</span>
            </div>
            <span>{question.date}</span>
          </div>
          <div className="mt-6 whitespace-pre-line">
            {question.content}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="font-medium">답변 {question.comments.length}</h2>
        </div>
        <div className="divide-y">
          {question.comments.map((comment) => (
            <div key={comment.id} className="p-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{comment.author}</span>
                  {comment.isInstructor && (
                    <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                      강사
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitComment} className="p-4 border-t">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="답변을 입력하세요"
            className="w-full border rounded-lg p-2 h-24 mb-2"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              답변 등록
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default QnADetail;