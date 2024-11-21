import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const CreateExam = () => {
    const {courseId, examId} = useParams();
    const [examData, setExamData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}`);
                setExamData(response.data);
            } catch (error) {
                console.error("시험 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchExam();
    }, [courseId, examId]);

    const handleChange = (e, quizIndex = null, choiceIndex = null) => {
        if (quizIndex === null) {
            // 시험 제목, 설명, 상태 변경
            setExamData({...examData, [e.target.name]: e.target.value});
        } else if (choiceIndex === null) {
            // 특정 퀴즈의 질문 변경
            const quizzes = [...examData.quizzes];
            quizzes[quizIndex] = {
                ...quizzes[quizIndex],
                [e.target.name]: e.target.value,
            };
            setExamData({...examData, quizzes});
        } else {
            // 특정 퀴즈의 선택지 변경
            const quizzes = [...examData.quizzes];
            const choices = [...quizzes[quizIndex].choices];
            choices[choiceIndex] = e.target.value;
            quizzes[quizIndex] = {...quizzes[quizIndex], choices};
            setExamData({...examData, quizzes});
        }
    };

    const handleCorrectAnswer = (quizIndex, choiceIndex) => {
        // 특정 퀴즈의 정답 선택
        const quizzes = [...examData.quizzes];
        quizzes[quizIndex] = {...quizzes[quizIndex], correctAnswer: choiceIndex};
        setExamData({...examData, quizzes});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://api.ahimmoyak.click/exam/v1/${courseId}/${examId}`, examData);
            alert("시험이 수정되었습니다.");
            navigate(`/mypage/${courseId}/exam`);
        } catch (error) {
            console.error("시험 수정 중 오류 발생:", error);
        }
    };

    return (
        <div>
            <h2>시험 수정</h2>
            {examData ? (
                <form onSubmit={handleSubmit}>
                    {/* 시험 제목 및 설명 */}
                    <input
                        type="text"
                        name="title"
                        placeholder="시험 제목"
                        value={examData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="시험 설명"
                        value={examData.description}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="status"
                        value={examData.status}
                        onChange={handleChange}
                    >
                        <option value="NOT_STARTED">미시작</option>
                        <option value="IN_PROGRESS">진행 중</option>
                        <option value="COMPLETED">완료</option>
                    </select>

                    {/* 퀴즈 수정 */}
                    {examData.quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex} style={{marginBottom: '20px'}}>
                            <h3>문제 {quizIndex + 1}</h3>
                            <input
                                type="text"
                                name="question"
                                placeholder="질문"
                                value={quiz.question}
                                onChange={(e) => handleChange(e, quizIndex)}
                                required
                            />
                            {quiz.choices.map((choice, choiceIndex) => (
                                <input
                                    key={choiceIndex}
                                    type="text"
                                    placeholder={`선택지 ${choiceIndex + 1}`}
                                    value={choice}
                                    onChange={(e) => handleChange(e, quizIndex, choiceIndex)}
                                    required
                                />
                            ))}
                            <div>
                                <p>정답 선택:</p>
                                {quiz.choices.map((_, choiceIndex) => (
                                    <button
                                        key={choiceIndex}
                                        type="button"
                                        onClick={() => handleCorrectAnswer(quizIndex, choiceIndex)}
                                        style={{
                                            backgroundColor: quiz.correctAnswer === choiceIndex ? 'lightblue' : 'white',
                                        }}
                                    >
                                        {`선택지 ${choiceIndex + 1}`}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                name="explanation"
                                placeholder="정답 해설"
                                value={quiz.explanation}
                                onChange={(e) => handleChange(e, quizIndex)}
                            />
                        </div>
                    ))}
                    <button type="submit">시험 수정</button>
                </form>
            ) : (
                <p>시험 데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default CreateExam;
