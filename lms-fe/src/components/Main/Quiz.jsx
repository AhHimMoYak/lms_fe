import {useEffect, useState} from "react";

import '/src/styles/Main/Quiz.css'
import useAxios from "../../hooks/api/useAxios.jsx";
import {useParams} from "react-router-dom";
import {decodeToken} from "../../authentication/decodeToken.jsx";

const Quiz = ({closeModal, quiz, stompClient, liveId, addHistory}) => {

    const [option, setOption] = useState('');
    // const [quizList, setQuizList] = useState({"id": 1, "question": "질문입니다.", "answer":1, "solution": "해설입니다.", options:[{"text": "일번", "idx": 1},{"text": "이번", "idx": 2},{"text": "삼번", "idx": 3},{"text": "사번", "idx": 4}]});
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const {data, error, fetchData} = useAxios();
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState('');

    const handleOptionChange = (e) => {
        setOption(Number(e.target.value));
    }

    const handleOptionSubmit = () => {
        // const currentQuiz = quizList[currentQuizIndex];
        const currentQuiz = quiz;
        console.log("Selected option:", option);
        console.log("Correct answer:", currentQuiz.answer);

        if (option === currentQuiz.answer) {
            setMessage('정답입니다!');
        } else {
            setMessage('오답입니다.');
        }
        setSubmitted(true);
        if (stompClient) {
            const message = {
                username:decodeToken(),
                quizId: quiz.id,
                answer: option
            };
            stompClient.publish({
                destination: `/pub/quiz/${liveId}/answer`,
                body: JSON.stringify(message),
            });
        }
        addHistory({
            quiz: quiz,
            option: option
        })

    }

    const handleNextQuiz = () => {
        closeModal();
        // setSubmitted(false);
        // setMessage('');
        // setOption(null);
        // setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    };


    // const currentQuiz = quizList[currentQuizIndex];
    const currentQuiz = quiz;

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                {currentQuiz ? (
                    <>
                        <h2 className="quiz-title">실시간 퀴즈</h2>
                        <h3 className="quiz-title">Q: {currentQuiz.question}</h3>
                        <form>
                            {currentQuiz.options?.map((opt) => (
                              <div key={opt.idx}>
                                <label key={opt.idx}>
                                    <input
                                        type="radio"
                                        value={opt.idx}
                                        checked={option === opt.idx}
                                        onChange={handleOptionChange}
                                    />
                                    {opt.text}
                                </label><br/>
                              </div>
                            ))}
                        </form>
                        {message && <p className="quiz-message">{message}</p>}
                        {!submitted ? (
                            <button type="button" onClick={handleOptionSubmit}>제출</button>
                        ) : (
                            <button type="button" onClick={handleNextQuiz}>닫기</button>
                        )}
                    </>
                ) : (
                    <p>모든 퀴즈를 완료했습니다!</p>
                )}
            </div>
        </div>
    );
};

export default Quiz;
