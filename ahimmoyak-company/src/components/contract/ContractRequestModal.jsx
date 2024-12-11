import React from 'react';
import { X } from 'lucide-react';
import axios from "axios";

const ContractRequestModal = ({ isOpen, onClose, courseData, courseId, onContractSubmit }) => {
  const [form, setForm] = React.useState({
    beginDate: '',
    attendeeCount: '',
    pricePerPerson: '',
    deposit: '',
    endDate: '',
  });

  const API_URL = 'http://localhost:8080';

  if (!isOpen) return null;

  const handleBeginDateChange = (value) => {
    const endDate = new Date(value);
    endDate.setDate(endDate.getDate() + (courseData.period || 0));
    setForm({
      ...form,
      beginDate: value,
      endDate: endDate.toISOString().split('T')[0],
    });
  };

  const handlePriceOrAttendeeChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    const totalDeposit = Number(updatedForm.pricePerPerson || 0) * Number(updatedForm.attendeeCount || 0);
    updatedForm.deposit = totalDeposit; // Update deposit based on changes
    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      beginDate: form.beginDate,
      endDate: form.endDate,
      attendeeCount: Number(form.attendeeCount),
      deposit: form.deposit,
    };

    try {
      const response = await axios.post(
          `${API_URL}/v1/companies/courseProvides`,
          requestData,
          {
            params: {
              userId: 2,
              courseId: courseId,
            },
            withCredentials: true,
          }
      );

      console.log('Contract Created:', response.data);
      onClose();
      if (onContractSubmit) {
        await onContractSubmit();
      }
      alert('계약 신청이 완료되었습니다.');
    } catch (error) {
      console.log(courseId);
      console.error('Error creating contract:', error);
      alert('계약 신청에 실패했습니다. 다시 시도해주세요.');
    }
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
                  value={form.beginDate}
                  onChange={(e) => handleBeginDateChange(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                교육 종료일
              </label>
              <input
                  type="text"
                  className="w-full p-2 border rounded-lg bg-gray-100"
                  value={form.endDate}
                  readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                수강 인원
              </label>
              <input
                  type="number"
                  min="1"
                  className="w-full p-2 border rounded-lg"
                  placeholder="수강 인원을 입력하세요"
                  value={form.attendeeCount}
                  onChange={(e) => handlePriceOrAttendeeChange('attendeeCount', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1인당 수강료
              </label>
              <input
                  type="number"
                  min="1"
                  className="w-full p-2 border rounded-lg"
                  placeholder="1인당 수강료를 입력하세요"
                  value={form.pricePerPerson}
                  onChange={(e) => handlePriceOrAttendeeChange('pricePerPerson', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                총 예상 비용 (Deposit)
              </label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between font-semibold">
                  <span>총 비용</span>
                  <span>{Number(form.deposit || 0).toLocaleString()}원</span>
                </div>
              </div>
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
