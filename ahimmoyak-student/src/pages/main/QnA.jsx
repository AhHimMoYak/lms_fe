const QnA = () => {
  const questions = [
    {
      id: 1,
      title: 'React Hook의 생명주기에 대해 질문있습니다',
      content: 'useEffect와 기존 클래스 컴포넌트의 생명주기 메소드는 어떤 차이가 있나요?',
      createdAt: '2024-03-20',
      isAnswered: true,
      answer: 'Hook의 useEffect는 여러 생명주기 메소드의 기능을 통합했습니다. 의존성 배열을 통해 더 유연한 동작이 가능하며...'
    },
    {
      id: 2,
      title: 'setState가 비동기로 동작하는 이유가 궁금합니다',
      content: '왜 상태 업데이트가 즉시 반영되지 않나요?',
      createdAt: '2024-03-19',
      isAnswered: false
    }
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">질의응답</h2>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 p-2 border rounded"
        />
        <select className="p-2 border rounded">
          <option value="all">전체</option>
          <option value="answered">답변 완료</option>
          <option value="waiting">답변 대기중</option>
        </select>
      </div>

      <div className="space-y-4">
        {questions.map(question => (
          <div key={question.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-2">{question.title}</h3>
            <p className="text-gray-600 mb-4">{question.content}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{question.createdAt}</span>
              <span className={`px-3 py-1 rounded ${
                question.isAnswered
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {question.isAnswered ? '답변 완료' : '답변 대기중'}
              </span>
            </div>
            {question.isAnswered && (
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">답변</h4>
                <p>{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnA;