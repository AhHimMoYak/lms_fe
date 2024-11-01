import useAxios from "../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";
import "../styles/QuizResult.css"

function QuizResult({liveId, quizData, quizState}) {

    const [openQuizId, setOpenQuizId] = useState('');

    const toggleQuiz = (id) => {
        setOpenQuizId((prevId) => (prevId === id ? null : id)); // Toggle open/close
    };

  const mergedData = quizData
    .filter(quiz => quizState.some(state => state.quizId === quiz.id))
    .map(quiz => {
      const state = quizState.find(state => state.quizId === quiz.id);

      const mergedState = quiz.options.map(opt => {
        const optionCount = state.options.find(o => o.idx === opt.idx);
        return {
          ...opt,
          count: optionCount? optionCount.count : 0
        };
      });
      return{
        ...quiz,
        options: mergedState
      }
    })

    return (
        <div className="quiz-result">
            <h2 className="quiz-result-title">퀴즈 결과</h2>
            <div className="quiz-container">
                {mergedData?.map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <div
                            className="quiz-header"
                            onClick={() => toggleQuiz(quiz.id)}
                        >
                            <span className="quiz-question">{quiz.question}</span>
                            {/*<span className="quiz-answer-rate"><strong>정답률:</strong> </span>*/}
                        </div>
                        {openQuizId === quiz.id && ( // Show content if this quiz is open
                            <div className="quiz-options">
                                <ol className="quiz-options-list">
                                    {quiz.options.map((option) => (
                                        <li key={option.idx} className="quiz-option">
                                            <span className="quiz-option-text">{option.idx}. {option.text}</span>
                                            <span className="quiz-option-suffix">{option.count}명</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="quiz-correct-answer"><strong>정답:</strong> {quiz.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizResult;
