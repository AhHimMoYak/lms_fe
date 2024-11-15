import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios.jsx';

const AnswerQuiz = () => {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axiosInstance.get(`/quiz/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuiz();
    }, [quizId, axiosInstance]);

    const handleSubmitAnswer = async () => {
        try {
            const response = await axiosInstance.post(`/quiz/${quizId}/answer`, {
                answer: selectedAnswer,
            });
            setFeedback(response.data.message);
            if (response.data.explanation) {
                setFeedback((prev) => `${prev}\n해설: ${response.data.explanation}`);
            }
        } catch (error) {
            setFeedback('정답 확인에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div>
            {quiz ? (
                <>
                    <h2>{quiz.question}</h2>
                    <ul>
                        {quiz.choices.map((choice, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={index}
                                        onChange={() => setSelectedAnswer(index)}
                                        checked={selectedAnswer === index}
                                    />
                                    {choice}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmitAnswer}>답 제출</button>
                    {feedback && <p>{feedback}</p>}
                    <button onClick={() => navigate(`/course/${courseId}/quizzes`)}>확인</button>
                </>
            ) : (
                <p>퀴즈를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default AnswerQuiz;
