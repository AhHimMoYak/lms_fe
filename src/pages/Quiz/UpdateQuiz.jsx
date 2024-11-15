import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios.jsx';

const EditQuizPage = () => {
    const { courseId, quizId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axiosInstance.get(`/quiz/${quizId}`);
                setQuizData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuiz();
    }, [quizId, axiosInstance]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/quiz/${quizId}`, quizData);
            navigate(`/course/${courseId}/quizzes`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e, index = null) => {
        if (index === null) {
            setQuizData({ ...quizData, [e.target.name]: e.target.value });
        } else {
            const choices = [...quizData.choices];
            choices[index] = e.target.value;
            setQuizData({ ...quizData, choices });
        }
    };

    return (
        <div>
            <h2>퀴즈 수정</h2>
            {quizData && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="question" placeholder="질문" value={quizData.question} onChange={handleChange} required />
                    {quizData.choices.map((choice, index) => (
                        <input key={index} type="text" placeholder={`선택지 ${index + 1}`} value={choice} onChange={(e) => handleChange(e, index)} required />
                    ))}
                    <div>
                        <p>정답 선택:</p>
                        {quizData.choices.map((_, index) => (
                            <button key={index} type="button" onClick={() => setQuizData({ ...quizData, correctAnswer: index })} style={{ backgroundColor: quizData.correctAnswer === index ? 'lightblue' : 'white' }}>{`선택지 ${index + 1}`}</button>
                        ))}
                    </div>
                    <textarea name="explanation" placeholder="정답 해설" value={quizData.explanation} onChange={handleChange} />
                    <button type="submit">수정 완료</button>
                </form>
            )}
        </div>
    );
};

export default EditQuizPage;
