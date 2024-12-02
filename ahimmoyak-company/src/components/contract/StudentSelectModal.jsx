import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const StudentSelectModal = ({ isOpen, onClose, contract, onSubmit }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 1, name: '홍길동', email: 'test@ahimmoyak.click' },
    { id: 2, name: '김영희', email: 'practice@ahimmoyak.click' },
    { id: 3, name: '이철수', email: 'example@ahimmoyak.click' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.includes(searchTerm) ||
    emp.email.includes(searchTerm)
  );

  const toggleStudent = (employeeId) => {
    setSelectedStudents(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEmployees = employees.filter(emp => selectedStudents.includes(emp.id));
    onSubmit(selectedEmployees);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">수강생 선택</h2>
            <p className="text-sm text-gray-600 mt-1">
              {contract.courseTitle} ({contract.studentCount}명)
            </p>
          </div>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름, 이메일로 검색..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="border rounded-lg mb-4 max-h-[400px] overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center p-3 border-b last:border-b-0 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(employee.id)}
                  onChange={() => toggleStudent(employee.id)}
                  className="h-4 w-4 mr-3"
                />
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-gray-600">
                    {employee.email}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              선택된 인원: {selectedStudents.length}/{contract.studentCount}명
            </p>
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedStudents.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectModal;