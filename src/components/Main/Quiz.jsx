import {useEffect, useState} from "react";

import '/src/styles/Main/QuizList.css'
import useAxios from "../../hooks/api/useAxios.jsx";
import {useParams} from "react-router-dom";

const Quiz = ({}) => {

    const {liveId} = useParams();
    const [option, setOption] = useState('');
    const [quiz, setQuiz] = useState('');
    const {data, error, fetchData} = useAxios();
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState('');

    const handleOptionChange = (e) => {
        setOption(Number(e.target.value));
    }

    const handleOptionSubmit = (option) => {
        if (option === data[0].answer) {
            setMessage('정답');
        } else {
            setMessage('오답');
        }
        setSubmitted(true);
    }

    useEffect(() => {
        fetchData(`/live/${liveId}/quiz`, "GET");
    }, []);

    useEffect(() => {
        if (data) {
            setQuiz(data[0])
        }
    }, [data]);


    return (
        <div className="quiz-page">
            <div className="quiz-container">
                <h2 className="quiz-title">{quiz.question}</h2>
                <form>
                    {quiz.options?.map((opt) => (
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
                {!submitted && (
                    <button type="button" onClick={() => handleOptionSubmit(option)}>제출</button>
                )}
                {message && <p className="quiz-message">{message}</p>}
            </div>
        </div>
    );
}

export default Quiz;
