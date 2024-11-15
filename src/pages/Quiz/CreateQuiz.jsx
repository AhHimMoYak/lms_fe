import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const CreateQuizPage = () => {
    const { courseId } = useParams();
    const [quizData, setQuizData] = useState({
        courseId: courseId,
        question: '',
        choices: ['', '', '', ''],
        correctAnswer: null,
        explanation: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://api.ahimmoyak.click/quiz/v1/create`, quizData);
            navigate(`/mypage/${courseId}/quiz`);
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

    const handleCorrectAnswer = (index) => {
        setQuizData({ ...quizData, correctAnswer: index });
    };

    return (
        <div>
            <h2>퀴즈 생성</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="question" placeholder="질문" value={quizData.question} onChange={handleChange} required />
                {quizData.choices.map((choice, index) => (
                    <input key={index} type="text" placeholder={`선택지 ${index + 1}`} value={choice} onChange={(e) => handleChange(e, index)} required />
                ))}
                <div>
                    <p>정답 선택:</p>
                    {quizData.choices.map((_, index) => (
                        <button key={index} type="button" onClick={() => handleCorrectAnswer(index)} style={{ backgroundColor: quizData.correctAnswer === index ? 'lightblue' : 'white' }}>{`선택지 ${index + 1}`}</button>
                    ))}
                </div>
                <textarea name="explanation" placeholder="정답 해설" value={quizData.explanation} onChange={handleChange} />
                <button type="submit">퀴즈 생성</button>
            </form>
        </div>
    );
};

export default CreateQuizPage;