import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const TakeExam = () => {
    const {courseId, examId} = useParams(); // URL에서 courseId와 examId 가져오기
    const [exam, setExam] = useState(null); // 시험 정보 상태
    const [answers, setAnswers] = useState([]); // 학생 답안 상태
    const [submitted, setSubmitted] = useState(false); // 제출 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchExam = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/exam/${courseId}/get`);
                console.log("Full API Response:", response);
                setExam(response.data);
                setAnswers(new Array(response.data[0]?.quizzes?.length || 0).fill(null)); // 초기화
            } catch (err) {
                console.error("Error fetching exam:", err);
                setError(err.response?.data?.message || "Failed to load the exam.");
            } finally {
                setLoading(false);
            }
        };

        fetchExam();
    }, [courseId, examId]);

    const handleAnswerChange = (quizIndex, choiceIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[quizIndex] = choiceIndex; // 답안 저장
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        if (answers.some((answer) => answer === null)) {
            alert("Please answer all questions before submitting.");
            return;
        }

        try {
            const payload = {
                examId,
                courseId,
                answers,
            };
            const response = await axios.post(`https://api.ahimmoyak.click/exam/v1/exam/${courseId}/${examId}/submit`, payload);
            setExam(response.data); // 결과 데이터 갱신
            setSubmitted(true); // 제출 완료
        } catch (err) {
            setError("Failed to submit the exam.");
        }
    };

    if (loading) {
        return (
            <div style={{padding: "20px", textAlign: "center"}}>
                <h2>Loading Exam...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding: "20px", textAlign: "center", color: "red"}}>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            {/* 데이터가 로드되었는지 확인 */}
            {exam ? (
                <>
                    <h1 style={{ textAlign: "center", color: "#2c3e50" }}>{exam[0]?.title || "Exam Title"}</h1>
                    <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "30px" }}>
                        {exam[0]?.description || "Answer the following questions carefully."}
                    </p>
                    {submitted ? (
                        <div>
                            <h2 style={{ color: "#27ae60", textAlign: "center" }}>Results</h2>
                            <ul>
                                {exam[0]?.quizzes.map((quiz, index) => (
                                    <li key={quiz.id} style={{ marginBottom: "20px" }}>
                                        <p>
                                            <strong>Question {index + 1}:</strong> {quiz.question}
                                        </p>
                                        <p>
                                            <strong>Your Answer:</strong>{" "}
                                            {quiz.choices[answers[index]] || "No answer provided"}
                                        </p>
                                        <p
                                            style={{
                                                color:
                                                    quiz.correctAnswer === answers[index]
                                                        ? "#27ae60"
                                                        : "#e74c3c",
                                            }}
                                        >
                                            <strong>
                                                {quiz.correctAnswer === answers[index]
                                                    ? "Correct!"
                                                    : "Wrong!"}
                                            </strong>
                                        </p>
                                        <p>
                                            <strong>Correct Answer:</strong> {quiz.choices[quiz.correctAnswer]}
                                        </p>
                                        {quiz.explanation && (
                                            <p>
                                                <strong>Explanation:</strong> {quiz.explanation}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {exam[0]?.quizzes.map((quiz, index) => (
                                <div
                                    key={quiz.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        marginBottom: "20px",
                                        background: "#f9f9f9",
                                    }}
                                >
                                    <p style={{ fontWeight: "bold", color: "#34495e", marginBottom: "10px" }}>
                                        {index + 1}. {quiz.question}
                                    </p>
                                    <div>
                                        {quiz.choices.map((choice, choiceIndex) => (
                                            <div key={choiceIndex} style={{ marginBottom: "10px" }}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value={choiceIndex}
                                                        checked={answers[index] === choiceIndex}
                                                        onChange={() => handleAnswerChange(index, choiceIndex)}
                                                        style={{ marginRight: "10px" }}
                                                    />
                                                    {choice}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="submit"
                                style={{
                                    marginTop: "20px",
                                    background: "#2980b9",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "4px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                            >
                                Submit Exam
                            </button>
                        </form>
                    )}
                </>
            ) : (
                <p style={{ textAlign: "center", color: "#e74c3c" }}>No exam data available.</p>
            )}
        </div>
    );
};

export default TakeExam;
