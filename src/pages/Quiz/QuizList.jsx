import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QuizListPage = () => {
    const { courseId } = useParams();
    const [quizList, setQuizList] = useState([]);
    const navigate = useNavigate();

    const fetchQuizList = async () => {
        try {
            const response = await axios.get(`https://api.ahimmoyak.click/quiz/v1/${courseId}`);
            setQuizList(response.data.items || response.data);
        } catch (error) {
            console.error("퀴즈 목록을 불러오는 중 오류 발생:", error);
        }
    };

    const deleteQuiz = async (quizId) => {
        try {
            await axios.delete(`https://api.ahimmoyak.click/quiz/v1/${courseId}/${quizId}`);
            setQuizList(quizList.filter(q => q.id !== quizId));
        } catch (error) {
            console.error("퀴즈 삭제 실패:", error);
        }
    };

    useEffect(() => {
        fetchQuizList();
    }, [courseId]);

    return (
        <div>
            <h2>코스 {courseId}의 퀴즈 목록</h2>
            <button onClick={() => navigate(`/mypage/${courseId}/quiz/create`)}>퀴즈 생성</button>
            {quizList.map((quiz) => (
                <div key={quiz.id} className="quiz-card">
                    <h3>{quiz.question}</h3>
                    <button onClick={() => navigate(`/mypage/${courseId}/quiz/${quiz.id}`)}>조회</button>
                    <button onClick={() => navigate(`/mypage/${courseId}/quiz/${quiz.id}/update`)}>수정</button>
                    <button onClick={() => deleteQuiz(quiz.id)}>삭제</button>
                    <button onClick={() => navigate(`/mypage/${courseId}/quiz/${quiz.id}/answer`)}>문제풀기</button>
                </div>
            ))}
        </div>
    );
};

export default QuizListPage;
