import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

const ExamTaking = () => {

  const mockExam = {
    id: 1,
    title: "React 기초 평가",
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: "React에서 상태를 관리하기 위해 사용하는 Hook은?",
        options: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer"
        ],
        points: 10
      },
      {
        id: 2,
        question: "김형진은?",
        options: [
          "멋지다",
          "잘생겼다",
          "귀엽다",
          "예쁘다"
        ],
        points: 10
      },
    ]
  };

  const exam = mockExam;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.timeLimit * 60);
  const [isReview, setIsReview] = useState(false);

  const navigate = useNavigate();
  const {courseId} = useParams();

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0 && !isReview) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isReview]);

  // 남은 시간 포맷팅
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 답안 선택 처리
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const onSubmit = (answers) => {
    navigate(`/course/${courseId}/exam`)
  }

  // 현재 문제
  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold">{exam.title}</h1>
              <p className="text-sm text-gray-500">
                {currentQuestionIndex + 1} / {exam.questions.length} 문항
              </p>
            </div>

            {!isReview && (
              <div className="flex items-center gap-4">
                <div className={`text-lg font-mono ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                  {formatTime(timeLeft)}
                </div>
                <button
                  onClick={() => setIsReview(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  제출하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      {!isReview ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* 문제 영역 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>
              <span className="text-sm text-gray-500">
                배점: {currentQuestion.points}점
              </span>
            </div>

            {/* 객관식 문제 */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer
                      ${answers[currentQuestion.id] === index ?
                      'border-blue-500 bg-blue-50' :
                      'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      checked={answers[currentQuestion.id] === index}
                      onChange={() => handleAnswer(currentQuestion.id, index)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3">{option}</span>
                  </label>
                ))}
              </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-gray-600 disabled:text-gray-400"
            >
              이전 문제
            </button>
            <button
              onClick={() => setCurrentQuestionIndex(prev =>
                Math.min(exam.questions.length - 1, prev + 1)
              )}
              disabled={currentQuestionIndex === exam.questions.length - 1}
              className="px-4 py-2 text-gray-600 disabled:text-gray-400"
            >
              다음 문제
            </button>
          </div>
        </div>
      ) : (
        // 제출 확인 화면
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">시험 제출</h2>
            <div className="mb-6">
              <p className="mb-2">총 {exam.questions.length}문항 중 {Object.keys(answers).length}문항 답변 완료</p>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${(Object.keys(answers).length / exam.questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                제출하면 수정이 불가능합니다. 제출하시겠습니까?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsReview(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  돌아가기
                </button>
                <button
                  onClick={() => onSubmit(answers)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  최종 제출
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ExamTaking;