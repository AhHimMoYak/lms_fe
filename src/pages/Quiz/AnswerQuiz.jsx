import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const AnswerExam = () => {
    const {courseId, examId} = useParams();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}`);
                setExam(response.data);
                setAnswers(new Array(response.data.quizzes.length).fill(null)); // 초기 답안 배열 설정
            } catch (error) {
                console.error("시험 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchExam();
    }, [courseId, examId]);

    const handleAnswerChange = (quizIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[quizIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };

    const handleSubmitExam = async () => {
        try {
            // 시험 답안 제출
            const response = await axios.post(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/submit`, {
                answers,
            });

            // 성공 메시지와 해설 표시
            setFeedback(response.data.message);

            // 시험 상태를 '완료됨'으로 업데이트
            await axios.patch(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}/complete`);

            alert("시험이 제출되었습니다. 상태가 업데이트되었습니다.");
            navigate(`/mypage/${courseId}/exam`);
        } catch (error) {
            setFeedback('시험 제출 중 오류가 발생했습니다.');
            console.error("시험 제출 오류:", error);
        }
    };

    return (
        <div>
            {exam ? (
                <>
                    <h2>{exam.title}</h2>
                    <p>{exam.description}</p>
                    <p><strong>현재 상태:</strong> {exam.status}</p>

                    {exam.status === "NOT_TAKEN" && (
                        <>
                            {/* 퀴즈 목록 */}
                            {exam.quizzes.map((quiz, quizIndex) => (
                                <div key={quizIndex} style={{marginBottom: '20px'}}>
                                    <h3>문제 {quizIndex + 1}: {quiz.question}</h3>
                                    <ul>
                                        {quiz.choices.map((choice, choiceIndex) => (
                                            <li key={choiceIndex}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`answer-${quizIndex}`}
                                                        value={choiceIndex}
                                                        onChange={() => handleAnswerChange(quizIndex, choiceIndex)}
                                                        checked={answers[quizIndex] === choiceIndex}
                                                    />
                                                    {choice}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <button onClick={handleSubmitExam}>시험 제출</button>
                        </>
                    )}

                    {feedback && <p>{feedback}</p>}
                </>
            ) : (
                <p>시험 데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default AnswerExam;
