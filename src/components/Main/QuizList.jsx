import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";

import '/src/styles/Main/QuizList.css'
import {useParams} from "react-router-dom";

const QuizList = ({}) => {

    const {liveId} = useParams();
    const {data, error, fetchData} = useAxios();
    const [expandedQuizId, setExpandedQuizId] = useState(null);

    useEffect(() => {
        fetchData(`/live/${liveId}/quiz`, "GET")
    }, []);

    const toggleQuizDetails = (id) => {
        setExpandedQuizId(expandedQuizId === id ? null : id);
    };

    const handleButtonClick = () => {
        console.log("전달");
    }

    return (
        <div className="quiz-list">
            <div className="quiz-container">
                {data?.map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <div className="quiz-header">
                            <h3 onClick={() => toggleQuizDetails(quiz.id)} style={{cursor: "pointer"}}>
                                {`${quiz.id}. ${quiz.question}`}</h3>
                            <button onClick={handleButtonClick} className="send-button">전송</button>
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