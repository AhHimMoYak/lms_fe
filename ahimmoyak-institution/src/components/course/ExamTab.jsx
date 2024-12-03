import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";

const ExamTab = () => {
  const [exams, setExams] = useState([
    { id: 1, title: '중간평가', questionCount: 20 },
    { id: 2, title: '최종평가', questionCount: 30 }
  ]);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [newExam, setNewExam] = useState({ title: ''});
  const {courseId} = useParams();
  const navigate = useNavigate();

  const handleAddExam = () => {
    if (newExam.title && newExam.duration) {
      setExams([...exams, {
        id: exams.length + 1,
        title: newExam.title,
        questionCount: 0
      }]);
      setIsAddingExam(false);
      setNewExam({ title: '' });
    }
  };

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">시험 관리</h2>
        <button
          onClick={() => setIsAddingExam(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          시험 추가
        </button>
      </div>
      <div className="divide-y">
        {isAddingExam && (
          <div className="p-4 bg-gray-50">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="시험 제목"
                className="flex-1 border rounded p-2"
                value={newExam.title}
                onChange={e => setNewExam({...newExam, title: e.target.value})}
              />
              <button
                onClick={handleAddExam}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                확인
              </button>
              <button
                onClick={() => setIsAddingExam(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                취소
              </button>
            </div>
          </div>
        )}
        {exams.map(exam => (
          <div key={exam.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/courses/${courseId}/exam/${exam.id}`)}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{exam.title}</h3>
                <p className="text-sm text-gray-500">
                  {exam.questionCount}문항 · {exam.duration}분
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600">문제관리</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamTab;