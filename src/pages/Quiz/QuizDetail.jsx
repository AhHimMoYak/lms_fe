import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios.jsx';

const QuizDetailPage = () => {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

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

    return (
        <div>
            {quiz && (
                <>
                    <h2>{quiz.question}</h2>
                    <ul>{quiz.choices.map((choice, index) => <li key={index}>{choice}</li>)}</ul>
                    <p>정답 해설: {quiz.explanation}</p>
                    <button onClick={() => navigate(`/course/${courseId}/quizzes`)}>확인</button>
                </>
            )}
        </div>
    );
};

export default QuizDetailPage;
