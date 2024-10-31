import {useEffect, useState} from "react";

import '/src/styles/Main/Quiz.css'
import useAxios from "../../hooks/api/useAxios.jsx";
import {useParams} from "react-router-dom";

const Quiz = ({}) => {

    const {liveId} = useParams();
    const [option, setOption] = useState('');
    const [quizList, setQuizList] = useState('');
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const {data, error, fetchData} = useAxios();
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState('');

    const handleOptionChange = (e) => {
        setOption(Number(e.target.value));
    }

    const handleOptionSubmit = () => {
        const currentQuiz = quizList[currentQuizIndex];
        console.log("Selected option:", option);
        console.log("Correct answer:", currentQuiz.answer);

        if (option === currentQuiz.answer) {
            setMessage('정답');
        } else {
            setMessage('오답');
        }
        setSubmitted(true);
    }

    const handleNextQuiz = () => {
        setSubmitted(false);
        setMessage('');
        setOption(null);
        setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
        fetchData(`/live/${liveId}/quiz`, "GET");
    }, []);

    useEffect(() => {
        if (data) {
            setQuizList(data)
        }
    }, [data]);

    const currentQuiz = quizList[currentQuizIndex];

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                {currentQuiz ? (
                    <>
                        <h2 className="quiz-title">{currentQuiz.question}</h2>
                        <form>
                            {currentQuiz.options?.map((opt) => (
                                <label key={opt.idx}>
                                    <input
                                        type="radio"
                                        value={opt.idx}
                                        checked={option === opt.idx}
                                        onChange={handleOptionChange}
                                    />
                                    {opt.text}
                                </label>
                            ))}
                        </form>
                        {!submitted ? (
                            <button type="button" onClick={handleOptionSubmit}>제출</button>
                        ) : (
                            <button type="button" onClick={handleNextQuiz}>다음</button>
                        )}
                        {message && <p className="quiz-message">{message}</p>}
                    </>
                ) : (
                    <p>모든 퀴즈를 완료했습니다!</p>
                )}
            </div>
        </div>
    );
};

export default Quiz;
