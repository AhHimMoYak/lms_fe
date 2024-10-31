import useAxios from "../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";
import "../styles/QuizResult.css"

function QuizResult() {
    const { data, fetchData } = useAxios();
    const [openQuizId, setOpenQuizId] = useState('');

    useEffect(() => {
        fetchData('/live/1/quiz', "GET");
    }, []);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const toggleQuiz = (id) => {
        setOpenQuizId((prevId) => (prevId === id ? null : id)); // Toggle open/close
    };

    return (
        <div className="quiz-result">
            <h2 className="quiz-result-title">퀴즈 결과</h2>
            <div className="quiz-container">
                {data?.map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <div
                            className="quiz-header"
                            onClick={() => toggleQuiz(quiz.id)}
                        >
                            <span className="quiz-question">{quiz.question}</span>
                            <span className="quiz-answer-rate"><strong>정답률:</strong> </span>
                        </div>
                        {openQuizId === quiz.id && ( // Show content if this quiz is open
                            <div className="quiz-options">
                                <ol className="quiz-options-list">
                                    {quiz.options.map((option) => (
                                        <pi key={option.idx} className="quiz-option">
                                            <span className="quiz-option-text">{option.idx}. {option.text}</span>
                                            <span className="quiz-option-suffix">명</span>
                                        </pi>
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
