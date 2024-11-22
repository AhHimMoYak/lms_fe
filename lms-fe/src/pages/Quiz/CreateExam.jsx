import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ExamCreate = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        title: '',
        description: '',
        examStatus: 'NOT_STARTED',
        courseId: courseId,
        quizzes: [],
    });

    const handleExamChange = (e) => {
        setExamData({ ...examData, [e.target.name]: e.target.value });
    };

    const handleQuizChange = (e, quizIndex, choiceIndex = null) => {
        const updatedQuizzes = [...examData.quizzes];
        if (choiceIndex === null) {
            // Update question or explanation
            updatedQuizzes[quizIndex][e.target.name] = e.target.value;
        } else {
            // Update specific choice
            updatedQuizzes[quizIndex].choices[choiceIndex] = e.target.value;
        }
        setExamData({ ...examData, quizzes: updatedQuizzes });
    };

    const addQuiz = () => {
        setExamData({
            ...examData,
            quizzes: [
                ...examData.quizzes,
                {
                    question: '',
                    choices: ['', '', '', ''],
                    correctAnswer: 0,
                    explanation: '',
                },
            ],
        });
    };

    const removeQuiz = (quizIndex) => {
        const updatedQuizzes = examData.quizzes.filter((_, index) => index !== quizIndex);
        setExamData({ ...examData, quizzes: updatedQuizzes });
    };

    const handleCorrectAnswer = (quizIndex, choiceIndex) => {
        const updatedQuizzes = [...examData.quizzes];
        updatedQuizzes[quizIndex].correctAnswer = choiceIndex;
        setExamData({ ...examData, quizzes: updatedQuizzes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://api.ahimmoyak.click/exam/v1/create`, examData);
            alert('시험이 성공적으로 생성되었습니다!');
            navigate(`/mypage/${courseId}/exam`);
        } catch (error) {
            console.error('시험 생성 중 오류 발생:', error);
            alert('시험 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>시험 생성</h2>
            <form onSubmit={handleSubmit}>
                {/* Exam Title and Description */}
                <div>
                    <label>시험 제목:</label>
                    <input
                        type="text"
                        name="title"
                        value={examData.title}
                        onChange={handleExamChange}
                        required
                    />
                </div>
                <div>
                    <label>시험 설명:</label>
                    <textarea
                        name="description"
                        value={examData.description}
                        onChange={handleExamChange}
                        required
                    />
                </div>
                <div>
                    <label>시험 상태:</label>
                    <select
                        name="examStatus"
                        value={examData.examStatus}
                        onChange={handleExamChange}
                        required
                    >
                        <option value="NOT_STARTED">미시작</option>
                        <option value="IN_PROGRESS">진행 중</option>
                        <option value="COMPLETED">완료</option>
                    </select>
                </div>

                {/* Quizzes Section */}
                <h3>문제 목록</h3>
                {examData.quizzes.map((quiz, quizIndex) => (
                    <div key={quizIndex} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <label>질문:</label>
                        <input
                            type="text"
                            name="question"
                            value={quiz.question}
                            onChange={(e) => handleQuizChange(e, quizIndex)}
                            required
                        />
                        <div>
                            {quiz.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex}>
                                    <label>선택지 {choiceIndex + 1}:</label>
                                    <input
                                        type="text"
                                        value={choice}
                                        onChange={(e) => handleQuizChange(e, quizIndex, choiceIndex)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p>정답 선택:</p>
                            {quiz.choices.map((_, choiceIndex) => (
                                <button
                                    type="button"
                                    key={choiceIndex}
                                    onClick={() => handleCorrectAnswer(quizIndex, choiceIndex)}
                                    style={{
                                        backgroundColor:
                                            quiz.correctAnswer === choiceIndex ? 'lightblue' : 'white',
                                    }}
                                >
                                    선택지 {choiceIndex + 1}
                                </button>
                            ))}
                        </div>
                        <label>정답 해설:</label>
                        <textarea
                            name="explanation"
                            value={quiz.explanation}
                            onChange={(e) => handleQuizChange(e, quizIndex)}
                        />
                        <button type="button" onClick={() => removeQuiz(quizIndex)}>
                            문제 삭제
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addQuiz}>
                    문제 추가
                </button>
                <button type="submit">시험 생성</button>
            </form>
        </div>
    );
};

export default ExamCreate;

