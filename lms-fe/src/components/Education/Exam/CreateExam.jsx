import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가

const CreateExam = () => {
    const { courseId } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용
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
        updatedQuizzes[quizIndex].correctAnswer = choiceIndex;
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
            await axios.post(`https://api.ahimmoyak.click/exam/v1/${courseId}/create`, payload);
            setSuccess("시험이 성공적으로 생성되었습니다!");

            // 성공 시 리스트 페이지로 이동 (리다이렉션)
            navigate(`/education/course/${courseId}/exam`);
        } catch (err) {
            setError(err.response?.data?.error || "시험 생성에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-exam-container">
            <h1 className="create-exam-title">시험 생성</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="exam-form">
                <div className="form-group">
                    <label>시험 제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="시험 제목을 입력하세요"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>시험 설명:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="시험 설명을 입력하세요"
                    />
                </div>
                <div>
                    <h3>퀴즈</h3>
                    {quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex} className="quiz-card">
                            <label>질문 {quizIndex + 1}:</label>
                            <input
                                type="text"
                                value={quiz.question}
                                onChange={(e) => handleQuizChange(quizIndex, "question", e.target.value)}
                                placeholder="질문을 입력하세요"
                                required
                            />
                            <div>
                                <strong>보기:</strong>
                                {quiz.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex} className="choice-container">
                                        <input
                                            type="text"
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(quizIndex, choiceIndex, e.target.value)}
                                            placeholder={`보기 ${choiceIndex + 1}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCorrectAnswer(quizIndex, choiceIndex)}
                                            className={quiz.correctAnswer === choiceIndex ? "correct-button" : "set-correct-button"}
                                            disabled={choice.trim() === ""}
                                        >
                                            {quiz.correctAnswer === choiceIndex ? "정답" : "정답 설정"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label>설명:</label>
                            <textarea
                                value={quiz.explanation}
                                onChange={(e) => handleQuizChange(quizIndex, "explanation", e.target.value)}
                                placeholder="설명을 입력하세요 (선택 사항)"
                            />
                            <button type="button" onClick={() => removeQuiz(quizIndex)} className="remove-quiz-button">
                                퀴즈 삭제
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addQuiz} className="add-quiz-button">
                        퀴즈 추가
                    </button>
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? "생성 중..." : "시험 생성"}
                </button>
            </form>
        </div>
    );
};

export default CreateExam;
