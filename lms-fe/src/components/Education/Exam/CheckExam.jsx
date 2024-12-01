import React, { useState } from "react";
import axios from "axios";

const CheckExam = () => {
    const [courseId, setCourseId] = useState("");
    const [examId, setExamId] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // 이전 에러 초기화
        setResults([]); // 이전 결과 초기화

        try {
            const response = await axios.get(
                `https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/check`
            );
            setResults(response.data.data); // 결과 설정
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error); // 서버 에러 메시지 표시
            } else {
                setError("오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div>
            <h1>시험 결과 확인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>과목 ID:</label>
                    <input
                        type="text"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        placeholder="과목 ID를 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label>시험 ID:</label>
                    <input
                        type="text"
                        value={examId}
                        onChange={(e) => setExamId(e.target.value)}
                        placeholder="시험 ID를 입력하세요"
                        required
                    />
                </div>
                <button type="submit">결과 확인</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {results.length > 0 && (
                <div>
                    <h2>결과</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <p>사용자명: {result.username}</p>
                                <p>상태: {result.status}</p>
                                <p>제출 일시: {result.submittedAt}</p>
                                <p>점수: {result.results?.score}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CheckExam;
