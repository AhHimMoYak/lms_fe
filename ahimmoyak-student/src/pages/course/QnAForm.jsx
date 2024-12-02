import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const QnAForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // API 호출 로직
      console.log('Submit form data:', formData);
      navigate(`/course/${courseId}/qna`);
    } catch (error) {
      console.error('Failed to submit question:', error);
      alert('질문 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.title.trim() || formData.content.trim()) {
      if (window.confirm('작성 중인 내용이 있습니다. 목록으로 돌아가시겠습니까?')) {
        navigate(`/course/${courseId}/qna`);
      }
    } else {
      navigate(`/course/${courseId}/qna`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-bold">질문 작성하기</h1>
        <p className="text-sm text-gray-500 mt-1">
          강의 내용이나 과제에 대해 궁금한 점을 질문해주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="질문의 제목을 입력해주세요"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="질문하실 내용을 자세히 작성해주세요."
                rows={12}
                className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 작성 가이드 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                효과적인 질문 작성 가이드
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 질문의 맥락을 구체적으로 설명해주세요.</li>
                <li>• 관련된 강의나 자료를 언급해주시면 더 좋습니다.</li>
                <li>• 문제 상황이나 오류 메시지가 있다면 함께 공유해주세요.</li>
                <li>• 이미 시도해본 해결 방법이 있다면 함께 적어주세요.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? '등록 중...' : '질문 등록'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QnAForm;