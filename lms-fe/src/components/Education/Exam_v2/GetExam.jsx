import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetExam = () => {
    const { courseId } = useParams(); // URL에서 courseId 가져오기
    const [exams, setExams] = useState([]); // 시험 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/exam/${courseId}/get`); // 엔드포인트 호출
                console.log("Fetched Exams Data:", response.data);
                setExams(response.data); // API 응답 데이터를 상태로 설정
                setError(null);
            } catch (err) {
                console.error("시험 목록 조회 실패:", err);
                setError(err.response?.data?.message || "시험 목록을 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, [courseId]);

    if (loading) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>Loading exams...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Exam List</h1>
            <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "30px" }}>
                Below are the exams for <strong>Course ID: {courseId}</strong>. Click on a quiz to see more details.
            </p>
            {exams.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#95a5a6" }}>No exams found for this course.</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                    {exams.map((exam, examIndex) => (
                        <div
                            key={exam.examId}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "15px",
                                background: "#f9f9f9",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h3 style={{ color: "#34495e", marginBottom: "10px" }}>
                                {examIndex + 1}. {exam.title}
                            </h3>
                            <p style={{ marginBottom: "10px", fontSize: "14px", color: "#7f8c8d" }}>
                                <strong>Description:</strong> {exam.description || "No description provided"}
                            </p>
                            <h4 style={{ marginBottom: "10px", color: "#2c3e50" }}>Quizzes</h4>
                            {exam.quizzes.map((quiz, quizIndex) => (
                                <div
                                    key={quiz.id}
                                    style={{
                                        border: "1px solid #eee",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        background: "#fff",
                                    }}
                                >
                                    <p style={{ fontWeight: "bold", color: "#34495e", marginBottom: "5px" }}>
                                        {quizIndex + 1}. {quiz.question}
                                    </p>
                                    <ol style={{ marginLeft: "20px", color: "#7f8c8d" }}>
                                        {quiz.choices.map((choice, choiceIndex) => (
                                            <li
                                                key={choiceIndex}
                                                style={{
                                                    marginBottom: "5px",
                                                    fontWeight:
                                                        quiz.correctAnswer === choiceIndex ? "bold" : "normal",
                                                    color: quiz.correctAnswer === choiceIndex ? "#27ae60" : "#34495e",
                                                }}
                                            >
                                                {choice || "No choice provided"}
                                            </li>
                                        ))}
                                    </ol>
                                    {quiz.explanation && (
                                        <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
                                            <strong>Explanation:</strong> {quiz.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetExam;
