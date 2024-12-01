import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅

const GetExam = () => {
    const {courseId} = useParams(); // 코스 ID를 URL 파라미터에서 가져옴
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const [exams, setExams] = useState([]); // 시험 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태

    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true); // 로딩 시작
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/${courseId}/get`); // 시험 데이터 가져오기
                console.log("시험 데이터 가져오기 성공:", response.data);
                setExams(response.data); // 가져온 데이터를 상태에 저장
                setError(null); // 오류 초기화
            } catch (err) {
                console.error("시험 목록 조회 실패:", err);
                setError(err.response?.data?.message || "시험 목록을 가져오는 중 오류가 발생했습니다."); // 오류 메시지 설정
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchExams(); // 컴포넌트가 마운트될 때 시험 목록을 가져옴
    }, [courseId]); // courseId가 변경될 때마다 시험 목록을 새로 가져옴

    const handleCreateExam = () => {
        navigate(`/education/course/${courseId}/exam/create`); // 시험 생성 페이지로 이동
    };

    // 시험 조회 함수
    const handleViewExamDetail = (examId) => {
        navigate(`/education/course/${courseId}/exam/detail/${examId}`);
    };


    // 시험 삭제 함수
    const handleDeleteExam = async (examId) => {
        try {
            await axios.delete(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/delete`);
            // 삭제 후 상태에서 해당 시험을 필터링하여 제거
            setExams(exams.filter((exam) => exam.examId !== examId));
            alert("시험이 성공적으로 삭제되었습니다.");
        } catch (err) {
            console.error("시험 삭제 실패:", err);
            alert("시험 삭제에 실패했습니다.");
        }
    };

    // 시험 수정 함수
    const handleEditExam = (examId) => {
        navigate(`/education/course/${courseId}/exam/edit/${examId}`); // 시험 수정 페이지로 이동
    };

    // 시험 응시자 조회 함수
    const handleCheckExam = (examId) => {
        navigate(`/education/course/${courseId}/exam/check/${examId}`); // 응시자 조회 페이지로 이동
    };

    if (loading) {
        return (
            <div className="loading-container">
                <h2>시험 목록을 로딩 중...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>오류</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="exam-container">
            <h1 className="exam-title">시험 목록</h1>
            <button className="create-exam-button" onClick={handleCreateExam}>
                시험 생성
            </button>
            {exams.length === 0 ? (
                <p className="no-exams">이 코스에 대한 시험이 없습니다.</p>
            ) : (
                <div className="exam-grid">
                    {exams.map((exam, examIndex) => (
                        <div key={exam.examId} className="exam-card">
                            <h3 className="exam-name">{examIndex + 1}. {exam.title}</h3>
                            <p className="exam-description">
                                <strong>설명:</strong> {exam.description || "설명 없음"}
                            </p>
                            <h4 className="quiz-title">퀴즈</h4>
                            {exam.quizzes.map((quiz, quizIndex) => (
                                <div key={quiz.id} className="quiz-card">
                                    <p className="quiz-question">
                                        {quizIndex + 1}. {quiz.question}
                                    </p>
                                    <ol className="quiz-choices">
                                        {quiz.choices.map((choice, choiceIndex) => (
                                            <li
                                                key={choiceIndex}
                                                className={
                                                    quiz.correctAnswer === choiceIndex
                                                        ? "quiz-choice-correct"
                                                        : "quiz-choice"
                                                }
                                            >
                                                {choice || "선택 없음"}
                                            </li>
                                        ))}
                                    </ol>
                                    {quiz.explanation && (
                                        <p className="quiz-explanation">
                                            <strong>설명:</strong> {quiz.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <div className="exam-buttons">
                                {/* 시험 응시자 조회 버튼 추가 */}
                                <button className="check-exam-button" onClick={() => handleCheckExam(exam.examId)}>
                                    응시자 조회
                                </button>
                                {/* 조회 버튼 추가 */}
                                <button className="get-exam-button" onClick={() => handleViewExamDetail(exam.examId)}>
                                    시험 조회
                                </button>
                                {/* 수정 버튼 추가 */}
                                <button className="edit-exam-button" onClick={() => handleEditExam(exam.examId)}>
                                    시험 수정
                                </button>
                                {/* 삭제 버튼 추가 */}
                                <button className="delete-exam-button" onClick={() => handleDeleteExam(exam.examId)}>
                                    시험 삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetExam;
