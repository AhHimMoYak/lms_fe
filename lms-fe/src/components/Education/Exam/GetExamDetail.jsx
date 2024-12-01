import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const ExamDetail = () => {
    const {courseId, examId} = useParams();
    const navigate = useNavigate();
    const [examDetail, setExamDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExamDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/detail`
                );
                setExamDetail(response.data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || "시험 상세 정보를 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchExamDetail();
    }, [courseId, examId]);

    if (loading) {
        return <div>시험 상세 정보를 로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div>
            <h1>{examDetail.title}</h1>
            <p>{examDetail.description}</p>
            <h2>퀴즈 목록</h2>
            {examDetail.quizzes.map((quiz, index) => (
                <div key={quiz.id}>
                    <h3>{index + 1}. {quiz.question}</h3>
                    <ul>
                        {quiz.choices.map((choice, idx) => (
                            <li key={idx}>
                                {choice}
                                {idx === quiz.correctAnswer && " (정답)"}
                            </li>
                        ))}
                    </ul>
                    {quiz.explanation && <p>설명: {quiz.explanation}</p>}
                </div>
            ))}
            <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </div>
    );
};

export default ExamDetail;
