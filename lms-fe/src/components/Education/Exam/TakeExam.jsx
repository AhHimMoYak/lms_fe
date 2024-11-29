import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const TakeExam = () => {
    const {courseId, examId, courseProvideId} = useParams(); // courseProvideId 추가
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [username, setUsername] = useState(null);

    const BASE_URL = "https://api.ahimmoyak.click/exam";

    // 시험 데이터를 가져오는 함수
    const fetchExamDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/v1/${courseId}/${examId}/detail`);
            const examData = response.data;

            if (!examData) {
                setError("시험 데이터를 찾을 수 없습니다.");
                return;
            }

            setExam(examData);
            setStatus(examData.status);
            setAnswers(new Array(examData.quizzes?.length || 0).fill(null));
        } catch (err) {
            setError(err.response?.data?.message || "시험 데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserInfoAndExam = async () => {
            try {
                const token = localStorage.getItem("access");
                if (!token) {
                    setError("사용자 인증 정보를 찾을 수 없습니다.");
                    return;
                }

                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.username);

                await fetchExamDetail();
            } catch (err) {
                setError(err.response?.data?.message || "데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchUserInfoAndExam();
    }, [courseId, examId]);

    const handleAnswerChange = (quizIndex, choiceIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[quizIndex] = choiceIndex;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        if (answers.some((answer) => answer === null)) {
            alert("모든 질문에 답변해주세요.");
            return;
        }

        try {
            setSubmitting(true);
            const payload = {
                courseId,
                examId,
                username,
                courseProvideId, // URL에서 가져온 courseProvideId 추가
                answers,
            };

            console.log("payload : \n" + "answers : " + payload.answers + "\n username : " + payload.username + "\n courseId : " + payload.courseId + payload.examId + payload.courseProvideId);

            const response = await axios.post(`${BASE_URL}/v1/${courseId}/submit`, payload); // URL에 courseProvideId 반영
            setExam(response.data);
            setSubmitted(true);
            setStatus("COMPLETE");
        } catch (err) {
            setError("시험 제출에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>시험 데이터를 불러오는 중...</div>;
    if (error) return <div>오류 발생: {error}</div>;

    if (status === "COMPLETE") {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <h1 style={{color: "#27ae60"}}>시험 완료</h1>
                <p>이미 이 시험을 완료했습니다. 다시 접근할 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div style={{padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif"}}>
            {exam && (
                <>
                    <h1 style={{textAlign: "center", color: "#2c3e50"}}>{exam.title || "시험 제목"}</h1>
                    <p style={{textAlign: "center", color: "#7f8c8d", marginBottom: "30px"}}>
                        {exam.description || "아래 질문에 신중히 답변해주세요."}
                    </p>
                    {submitted ? (
                        <div>
                            <h2 style={{color: "#27ae60", textAlign: "center"}}>시험이 제출되었습니다!</h2>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {exam.quizzes.map((quiz, index) => (
                                <div key={quiz.id} style={{marginBottom: "20px"}}>
                                    <p>
                                        <strong>{index + 1}.</strong> {quiz.question}
                                    </p>
                                    {quiz.choices.map((choice, choiceIndex) => (
                                        <div key={choiceIndex}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={choiceIndex}
                                                    checked={answers[index] === choiceIndex}
                                                    onChange={() => handleAnswerChange(index, choiceIndex)}
                                                />
                                                {choice}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button type="submit" disabled={submitting}>
                                {submitting ? "제출 중..." : "시험 제출"}
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default TakeExam;
