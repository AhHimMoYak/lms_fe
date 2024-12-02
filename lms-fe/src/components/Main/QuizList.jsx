import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";

import '/src/styles/Main/QuizList.css'
import {useParams} from "react-router-dom";

const QuizList = ({liveId, quizData, stompClient}) => {

    const [expandedQuizId, setExpandedQuizId] = useState(null);

    const toggleQuizDetails = (id) => {
        setExpandedQuizId(expandedQuizId === id ? null : id);
    };

    const handleButtonClick = (quizId) => {
        if(stompClient){
            stompClient.publish({
                destination: `/pub/quiz/${liveId}`, // 서버에서 구독하는 경로로 변경
                body: JSON.stringify({"quizId": quizId}),
            });
        }
    }

    return (
        <div className="quiz-list">
            <div className="quiz-container">
                {quizData?.map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <div className="quiz-header">
                            <h3 onClick={() => toggleQuizDetails(quiz.id)} style={{cursor: "pointer"}}>
                                {`${quiz.question}`}</h3>
                            <button onClick={() => handleButtonClick(quiz.id)} className="send-button">전송</button>
                        </div>
                        {expandedQuizId === quiz.id && (
                            <div className="quiz-details">
                                <ul>
                                    {quiz.options?.map((option) => (
                                        <li key={option.idx}>
                                            {`${option.idx}. ${option.text}`}
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Answer:</strong> {quiz.answer}</p>
                                <p><strong>Solution:</strong> {quiz.solution}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizList;