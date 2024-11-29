import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateExam = () => {
    const { courseId, examId } = useParams();
    const navigate = useNavigate();
    const [examDetail, setExamDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

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

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(
                `https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/edit`,
                examDetail
            );
            alert("시험 정보가 성공적으로 저장되었습니다.");
            navigate(-1); // 저장 후 이전 페이지로 이동
        } catch (err) {
            alert("시험 정보를 저장하는 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field, value) => {
        setExamDetail((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleQuizChange = (index, field, value) => {
        const updatedQuizzes = [...examDetail.quizzes];
        updatedQuizzes[index][field] = value;
        setExamDetail((prev) => ({
            ...prev,
            quizzes: updatedQuizzes,
        }));
    };

    if (loading) {
        return <div>시험 정보를 로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div>
            <h1>시험 수정</h1>
            <label>
                제목:
                <input
                    type="text"
                    value={examDetail.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
            </label>
            <label>
                설명:
                <textarea
                    value={examDetail.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </label>
            <h2>퀴즈 목록</h2>
            {examDetail.quizzes.map((quiz, index) => (
                <div key={quiz.id}>
                    <h3>퀴즈 {index + 1}</h3>
                    <label>
                        질문:
                        <input
                            type="text"
                            value={quiz.question}
                            onChange={(e) => handleQuizChange(index, "question", e.target.value)}
                        />
                    </label>
                    <label>
                        정답 번호:
                        <input
                            type="number"
                            min="0"
                            max={quiz.choices.length - 1}
                            value={quiz.correctAnswer}
                            onChange={(e) => handleQuizChange(index, "correctAnswer", parseInt(e.target.value))}
                        />
                    </label>
                    <label>
                        선택지:
                        {quiz.choices.map((choice, idx) => (
                            <div key={idx}>
                                <input
                                    type="text"
                                    value={choice}
                                    onChange={(e) => {
                                        const updatedChoices = [...quiz.choices];
                                        updatedChoices[idx] = e.target.value;
                                        handleQuizChange(index, "choices", updatedChoices);
                                    }}
                                />
                            </div>
                        ))}
                    </label>
                    <label>
                        설명:
                        <textarea
                            value={quiz.explanation || ""}
                            onChange={(e) => handleQuizChange(index, "explanation", e.target.value)}
                        />
                    </label>
                </div>
            ))}
            <button onClick={handleSave} disabled={saving}>
                {saving ? "저장 중..." : "저장"}
            </button>
            <button onClick={() => navigate(-1)}>취소</button>
        </div>
    );
};

export default UpdateExam;
