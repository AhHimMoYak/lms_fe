import useAxios from "../hooks/api/useAxios.jsx";
import { useState } from "react";
import "../styles/QuizPost.css";
import {useParams} from "react-router-dom";

function QuizPost() {
    const { data, fetchData } = useAxios();
    const {liveId} = useParams();
    const [quizForm, setQuizForm] = useState({
        question: '',
        answer: '',
        solution: '',
        options: Array.from({ length: 4 }, (_, idx) => ({ text: '', idx: idx + 1 }))
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizForm({
            ...quizForm,
            [name]: value
        });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = quizForm.options.map((option, idx) =>
            idx === index ? { ...option, text: value } : option
        );
        setQuizForm({
            ...quizForm,
            options: updatedOptions,
        });
    };

    const setAnswer = (index) => {
        setQuizForm({
            ...quizForm,
            answer: index + 1
        });
    };

    const addOption = () => {
        setQuizForm({
            ...quizForm,
            options: [
                ...quizForm.options,
                { text: '', idx: quizForm.options.length + 1 }
            ]
        });
    };

    const deleteOption = (index) => {
        const updatedOptions = quizForm.options.filter((_, idx) => idx !== index);
        const updatedAnswer = quizForm.answer === index + 1 || quizForm.answer > quizForm.options.length ? '' : quizForm.answer;
        setQuizForm({
            ...quizForm,
            options: updatedOptions,
            answer: updatedAnswer
        });
    };

    const handleSubmit =  () => {
        fetchData(`/live/${liveId}/quiz`,"POST",
            {
                question: quizForm.question,
                answer: quizForm.answer,
                solution: quizForm.solution,
                options: quizForm.options
            });
    };

    return (
        <div className="quiz-post">
            <form className="quiz-form" onSubmit={handleSubmit}>
                <div className="form-group-inline">
                    <label className="form-label-inline">질문 :</label>
                    <input
                        className="form-input-inline"
                        type="text"
                        name="question"
                        value={quizForm.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group-inline">
                    <label className="form-label-inline">정답 :</label>
                    <input
                        className="form-input-inline"
                        type="text"
                        name="answer"
                        value={quizForm.answer}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="form-group-inline">
                    <label className="form-label-inline">해설 :</label>
                    <textarea
                        className="form-textarea-inline"
                        name="solution"
                        value={quizForm.solution}
                        onChange={handleChange}
                    />
                </div>
                {quizForm.options.map((option, index) => (
                    <div className="form-group option-group" key={index}>
                        <label className="form-label">Option {index + 1}:</label>
                        <div className="option-container-inline">
                            <input
                                className="form-input option-input"
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <button
                                className="set-answer-button"
                                type="button"
                                onClick={() => setAnswer(index)}
                            >
                                정답
                            </button>
                            {quizForm.options.length > 4 && (
                                <button
                                    className="delete-option-button"
                                    type="button"
                                    onClick={() => deleteOption(index)}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button className="add-option-button" type="button" onClick={addOption}>Add Option</button>
                <button className="submit-button" type="submit">Submit Quiz</button>
            </form>
        </div>
    );
}

export default QuizPost;
