import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateExam = () => {
    const { courseId } = useParams(); // URL에서 courseId 가져오기
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quizzes, setQuizzes] = useState([
        { question: "", choices: ["", "", "", ""], correctAnswer: null, explanation: "" },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleQuizChange = (index, field, value) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[index][field] = value;
        setQuizzes(updatedQuizzes);
    };

    const handleChoiceChange = (quizIndex, choiceIndex, value) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[quizIndex].choices[choiceIndex] = value;
        setQuizzes(updatedQuizzes);
    };

    const setCorrectAnswer = (quizIndex, choiceIndex) => {
        const updatedQuizzes = [...quizzes];
        updatedQuizzes[quizIndex].correctAnswer = choiceIndex; // 정답은 인덱스로 설정
        setQuizzes(updatedQuizzes);
    };

    const addQuiz = () => {
        setQuizzes([
            ...quizzes,
            { question: "", choices: ["", "", "", ""], correctAnswer: null, explanation: "" },
        ]);
    };

    const removeQuiz = (index) => {
        const updatedQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(updatedQuizzes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = { title, description, quizzes };
            const response = await axios.post(`https://api.ahimmoyak.click/exam/v1/exam/${courseId}/create`, payload);
            setSuccess("Exam created successfully!");
            setTitle("");
            setDescription("");
            setQuizzes([{ question: "", choices: ["", "", "", ""], correctAnswer: null, explanation: "" }]);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create exam.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Create Exam</h1>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
            <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Exam Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                        placeholder="Enter the exam title"
                        required
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Exam Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                        placeholder="Enter a brief description of the exam"
                    />
                </div>
                <div>
                    <h3 style={{ color: "#34495e" }}>Quizzes</h3>
                    {quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px", background: "#fff" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Question {quizIndex + 1}:</label>
                            <input
                                type="text"
                                value={quiz.question}
                                onChange={(e) => handleQuizChange(quizIndex, "question", e.target.value)}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                                placeholder="Enter the question"
                                required
                            />
                            <div style={{ marginTop: "15px" }}>
                                <strong>Choices:</strong>
                                {quiz.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                                        <input
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(quizIndex, choiceIndex, e.target.value)}
                                            style={{ flex: "1", padding: "10px", borderRadius: "4px", border: "1px solid #ddd", marginRight: "10px" }}
                                            placeholder={`Choice ${choiceIndex + 1}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCorrectAnswer(quizIndex, choiceIndex)}
                                            style={{
                                                padding: "8px 12px",
                                                backgroundColor:
                                                    quiz.correctAnswer === choiceIndex ? "#27ae60" : "#bdc3c7",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: choice.trim() === "" ? "not-allowed" : "pointer",
                                                opacity: choice.trim() === "" ? 0.6 : 1,
                                                transition: "background-color 0.3s",
                                            }}
                                            disabled={choice.trim() === ""} // 지문이 비어있을 경우 버튼 비활성화
                                        >
                                            {quiz.correctAnswer === choiceIndex ? "Correct" : "Set Correct"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label style={{ display: "block", marginTop: "15px", fontWeight: "bold" }}>Explanation:</label>
                            <textarea
                                value={quiz.explanation}
                                onChange={(e) => handleQuizChange(quizIndex, "explanation", e.target.value)}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ddd", marginTop: "5px" }}
                                placeholder="Provide an explanation (optional)"
                            />
                            <button
                                type="button"
                                onClick={() => removeQuiz(quizIndex)}
                                style={{
                                    marginTop: "15px",
                                    background: "#e74c3c",
                                    color: "#fff",
                                    padding: "10px 15px",
                                    borderRadius: "4px",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                            >
                                Remove Quiz
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addQuiz}
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
                        Add Quiz
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: "30px",
                        background: loading ? "#95a5a6" : "#3498db",
                        color: "#fff",
                        padding: "15px 30px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                >
                    {loading ? "Creating Exam..." : "Create Exam"}
                </button>
            </form>
        </div>
    );
};

export default CreateExam;
