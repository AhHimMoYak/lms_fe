import React from 'react';
import { X } from 'lucide-react';

const ContractRequestModal = ({ isOpen, onClose, courseData }) => {
  const [form, setForm] = React.useState({
    startDate: '',
    studentCount: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">계약 신청</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              교육 시작일
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              min={new Date().toISOString().split('T')[0]}
              value={form.startDate}
              onChange={(e) => setForm({...form, startDate: e.target.value})}
            />
            <p className="mt-1 text-sm text-gray-500">
              교육기간: {courseData.duration}일
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              수강 인원
            </label>
            <input
              type="number"
              min="1"
              max={courseData.maxStudents}
              className="w-full p-2 border rounded-lg"
              placeholder="수강 인원을 입력하세요"
              value={form.studentCount}
              onChange={(e) => setForm({...form, studentCount: e.target.value})}
            />
            <p className="mt-1 text-sm text-gray-500">
              최대 수강 가능 인원: {courseData.maxStudents}명
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예상 비용
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>1인당 수강료</span>
                <span>{courseData.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>총 예상 비용</span>
                <span>
                  {(courseData.price * Number(form.studentCount || 0)).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              요청사항
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={4}
              placeholder="교육기관에 전달할 요청사항을 입력하세요"
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractRequestModal;