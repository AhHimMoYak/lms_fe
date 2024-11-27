import {NavLink, useParams} from "react-router-dom";

const ExamReview = () => {

  const mockExamResult = {
    id: 1,
    title: "React 기초 평가",
    submittedAt: "2024-03-27T10:30:00",
    timeSpent: 25,
    totalPoints: 100,
    passingScore: 60,
    questions: [
      {
        question: "React에서 상태를 관리하기 위해 사용하는 Hook은?",
        options: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer"
        ],
        points: 10,
        correctAnswer: 0,
        userAnswer: 0,
        isCorrect: true,
        score: 10,
        explanation: "useState는 React의 기본적인 Hook 중 하나로, 함수형 컴포넌트에서 상태를 관리할 수 있게 해줍니다. 컴포넌트의 상태가 변경될 때마다 리렌더링이 발생하며, 이를 통해 동적인 UI를 구현할 수 있습니다."
      },
      {
        question: "React 컴포넌트의 생명주기와 관련된 Hook은?",
        options: [
          "useState",
          "useEffect",
          "useRef",
          "useMemo"
        ],
        points: 10,
        correctAnswer: 1,
        userAnswer: 2,
        isCorrect: false,
        score: 0,
        explanation: "useEffect Hook은 React 컴포넌트의 생명주기와 관련된 작업을 수행할 수 있게 해줍니다. componentDidMount, componentDidUpdate, componentWillUnmount와 같은 클래스 컴포넌트의 생명주기 메서드를 대체할 수 있습니다."
      },
      {
        question: "김형진은?",
        options: [
          "멋지다",
          "잘생겼다",
          "귀엽다",
          "예쁘다"
        ],
        points: 10,
        correctAnswer: 1,
        userAnswer: 2,
        isCorrect: false,
        score: 0,
        explanation: "당연히 답은 3번인듯"
      }
    ]
  };

  const examResult = mockExamResult;

  const {courseId} = useParams();

  const calculateTotalScore = () => {
    return examResult.questions.reduce((total, q) => total + (q.score || 0), 0);
  };

  const calculatePassStatus = () => {
    const totalScore = calculateTotalScore();
    const passingScore = examResult.passingScore || 60;
    return totalScore >= passingScore;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="mb-8">
        <NavLink
          to={`/course/${courseId}/exam`}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </NavLink>

        <h1 className="text-2xl font-bold mb-2">{examResult.title} - 결과 확인</h1>
        <p className="text-gray-600 mb-4">응시일: {new Date(examResult.submittedAt).toLocaleString()}</p>

        {/* 결과 요약 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">총점</div>
              <div className="text-2xl font-bold text-blue-600">
                {calculateTotalScore()}/{examResult.totalPoints}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">정답률</div>
              <div className="text-2xl font-bold">
                {Math.round((calculateTotalScore() / examResult.totalPoints) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">소요시간</div>
              <div className="text-2xl font-bold">{examResult.timeSpent}분</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">합격여부</div>
              <div className={`text-2xl font-bold ${calculatePassStatus() ? 'text-green-600' : 'text-red-600'}`}>
                {calculatePassStatus() ? '합격' : '불합격'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 문제 리뷰 */}
      <div className="space-y-8">
        {examResult.questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            {/* 문제 헤더 */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  <div className="text-sm text-gray-500 mt-1">배점: {question.points}점</div>
                </div>
              </div>
              <div className="flex items-center">
                {question.isCorrect ? (
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    정답
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    오답
                  </span>
                )}
                <span className="ml-3 font-medium">
                  {question.score}/{question.points}점
                </span>
              </div>
            </div>

            {/* 객관식 문제 */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-4 rounded-lg border ${
                    optionIndex === question.correctAnswer && optionIndex === question.userAnswer
                      ? 'border-green-500 bg-green-50'
                      : optionIndex === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : optionIndex === question.userAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex-shrink-0 mr-3">
                      {optionIndex === question.correctAnswer && (
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && (
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <span className={`flex-1 ${
                      optionIndex === question.correctAnswer ? 'font-medium' : ''
                    }`}>
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 해설 */}
            {question.explanation && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">해설</h4>
                <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {question.explanation}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamReview;