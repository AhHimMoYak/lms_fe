import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const ExamDetail = () => {
    const {courseId, quizId} = useParams();
    const [exam, setExam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/${quizId}`);
                setExam(response.data);
            } catch (error) {
                console.error("시험 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchExam();
    }, [courseId, quizId]);

    return (
        <div>
            {exam ? (
                <>
                    <h2>{exam.title}</h2>
                    <p>{exam.description}</p>
                    <p><strong>시험 상태:</strong> {exam.status}</p>

                    <h3>문제 목록:</h3>
                    {exam.quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex}>
                            <h4>문제 {quizIndex + 1}: {quiz.question}</h4>
                            <ul>
                                {quiz.choices.map((choice, choiceIndex) => (
                                    <li key={choiceIndex}>{choice}</li>
                                ))}
                            </ul>
                            <p>정답 해설: {quiz.explanation}</p>
                        </div>
                    ))}

                    <button onClick={() => navigate(`/mypage/${courseId}/exam`)}>확인</button>
                </>
            ) : (
                <p>시험 데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default ExamDetail;
