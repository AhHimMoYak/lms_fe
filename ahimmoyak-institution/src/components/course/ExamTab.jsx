const ExamTab = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-medium">시험 관리</h2>
      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
        시험 추가
      </button>
    </div>
    <div className="divide-y">
      {[
        { id: 1, title: '중간평가', type: '객관식', questionCount: 20, duration: 60 },
        { id: 2, title: '최종평가', type: '혼합형', questionCount: 30, duration: 90 }
      ].map(exam => (
        <div key={exam.id} className="p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{exam.title}</h3>
              <p className="text-sm text-gray-500">
                {exam.type} · {exam.questionCount}문항 · {exam.duration}분
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm text-blue-600">문제관리</button>
              <button className="text-sm text-gray-600">결과보기</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ExamTab;