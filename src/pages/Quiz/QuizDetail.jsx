import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QuizDetail = () => {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
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

    return (
        <div>
            {quiz && (
                <>
                    <h2>{quiz.question}</h2>
                    <ul>{quiz.choices.map((choice, index) => <li key={index}>{choice}</li>)}</ul>
                    <p>정답 해설: {quiz.explanation}</p>
                    <button onClick={() => navigate(`/mypage/${courseId}/quiz`)}>확인</button>
                </>
            )}
        </div>
    );
};

export default QuizDetail;
