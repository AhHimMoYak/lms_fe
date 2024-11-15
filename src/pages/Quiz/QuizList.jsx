import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios.jsx';

const QuizListPage = () => {
    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.get(`/course/${courseId}/quizzes`);
                setQuizzes(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuizzes();
    }, [courseId, axiosInstance]);

    return (
        <div>
            <h2>코스 {courseId}의 퀴즈 목록</h2>
            <button onClick={() => navigate(`/course/${courseId}/quiz/create`)}>퀴즈 생성</button>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-card">
                    <h3>{quiz.question}</h3>
                    <button onClick={() => navigate(`/course/${courseId}/quiz/${quiz.id}`)}>조회</button>
                    <button onClick={() => navigate(`/course/${courseId}/quiz/${quiz.id}/edit`)}>수정</button>
                    <button onClick={async () => {
                        await axiosInstance.delete(`/quiz/${quiz.id}`);
                        setQuizzes(quizzes.filter(q => q.id !== quiz.id));
                    }}>삭제</button>
                    <button onClick={() => navigate(`/course/${courseId}/quiz/${quiz.id}/solve`)}>문제풀기</button>
                </div>
            ))}
        </div>
    );
};

export default QuizListPage;
