import React, { useState } from 'react';
import { Plus, Save, Trash2, Edit2, X, Check } from 'lucide-react';

const ExamManagement = () => {
  const [exam, setExam] = useState({
    title: '중간평가',
    questions: [
      {
        id: 1,
        content: 'React의 가상 DOM(Virtual DOM)의 주요 목적은?',
        options: [
          '웹페이지의 로딩 속도 향상',
          '실제 DOM 조작의 최소화',
          '메모리 사용량 감소',
          '코드의 가독성 향상'
        ],
        answer: '2',
        explanation: '가상 DOM은 실제 DOM 조작을 최소화하여 성능을 개선합니다.'
      },
  {
    id: 2,
      content
  :
    'useEffect Hook의 의존성 배열이 비어있을 때 효과는?',
      options
  :
    [
      '컴포넌트가 마운트될 때만 실행',
      '모든 렌더링마다 실행',
      '상태가 변경될 때마다 실행',
      '컴포넌트가 언마운트될 때만 실행'
    ],
      answer
  :
    '1',
      explanation
  :
    '빈 의존성 배열은 컴포넌트 마운트 시에만 실행됨을 의미합니다.'
  }
]
});

  const [newQuestion, setNewQuestion] = useState({
    content: '',
    options: ['', '', '', ''],
    answer: '',
    explanation: ''
  });

  const [editingId, setEditingId] = useState(null);


  const handleAddQuestion = () => {
    if (newQuestion.content && newQuestion.answer) {
      setExam({...exam, questions: [...exam.questions, { ...newQuestion, id: Date.now() }] });
      setNewQuestion({
        content: '',
        options: ['', '', '', ''],
        answer: '',
        explanation: ''
      });
    }
  };

  const handleEditQuestion = (id) => {
    const question = exam.questions.find(q => q.id === id);
    setEditingId(id);
    setNewQuestion({ ...question });
  };

  const handleUpdateQuestion = () => {
    setExam({...exam, questions: exam.questions.map(q =>
        q.id === editingId ? { ...newQuestion, id: editingId } : q
      )});
    setEditingId(null);
    setNewQuestion({
      content: '',
      options: ['', '', '', ''],
      answer: '',
      explanation: ''
    });
  };

  const handleDeleteQuestion = (id) => {
    setExam(exam.filter(q => q.id !== id));
  };

  const [titleEditing, setTitleEditing] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {!titleEditing ? (
          <header className="mb-4 space-x-2">
            <span className="text-2xl font-bold mb-4">{exam.title}</span>
            <button
              onClick={() => setTitleEditing(true)}
              className="text-blue-600"
            >
              <Edit2 className="w-4 h-4"/>
            </button>
          </header>
        ) : (
          <header className="mb-4 space-x-2">
            <input value={exam.title} onChange={(e) => setExam({...exam, title: e.target.value})} className="text-2xl font-bold mb-4 border-2 rounded-lg"/>
            <button
              onClick={() => setTitleEditing(false)}
              className="text-blue-600"
            >
              <Check className="w-4 h-4"/>
            </button>
          </header>
        )}

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">문제 내용</label>
            <textarea
              value={newQuestion.content}
              onChange={e => setNewQuestion({...newQuestion, content: e.target.value})}
              className="w-full border rounded-lg p-2 h-24"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">선택지</label>
            <div className="space-y-2">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <span className="w-8 text-center py-2">{index + 1}.</span>
                  <input
                    type="text"
                    value={option}
                    onChange={e => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({...newQuestion, options: newOptions});
                    }}
                    className="flex-1 border rounded p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">정답</label>
            <select
              value={newQuestion.answer}
              onChange={e => setNewQuestion({...newQuestion, answer: e.target.value})}
              className="border rounded p-2"
            >
              <option value="">선택하세요</option>
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">해설</label>
            <textarea
              value={newQuestion.explanation}
              onChange={e => setNewQuestion({...newQuestion, explanation: e.target.value})}
              className="w-full border rounded-lg p-2 h-24"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={editingId ? handleUpdateQuestion : handleAddQuestion}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {editingId ? '수정완료' : '문제 추가'}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewQuestion({
                    content: '',
                    options: ['', '', '', ''],
                    answer: '',
                    explanation: ''
                  });
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">등록된 문제 목록 ({exam.length}개)</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Save className="w-4 h-4"/> 저장
          </button>
        </div>
        <div className="divide-y">
          {exam.questions.map((question, index) => (
            <div key={question.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">문제 {index + 1}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQuestion(question.id)}
                    className="text-blue-600"
                  >
                    <Edit2 className="w-4 h-4"/>
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
              <p className="mb-4">{question.content}</p>
              <div className="space-y-1 mb-4">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex}
                       className={`pl-4 ${optIndex + 1 === parseInt(question.answer) ? 'text-blue-600 font-medium' : ''}`}>
                    {optIndex + 1}. {option}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">{question.explanation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;