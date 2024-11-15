import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AnswerQuiz = () => {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`https://api.ahimmoyak.click/quiz/v1/${courseId}/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuiz();
    }, [courseId, quizId]);

    const handleSubmitAnswer = async () => {
        try {
            const response = await axios.post(`https://api.ahimmoyak.click/quiz/v1/${courseId}/${quizId}/answer`, {
                answer: selectedAnswer,
            });
            // 답을 제출한 후에만 해설을 표시
            setFeedback(`${response.data.message}\n해설: ${quiz.explanation}`);
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
                    <button onClick={() => navigate(`/mypage/${courseId}/quiz`)}>확인</button>
                </>
            ) : (
                <p>퀴즈를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default AnswerQuiz;
