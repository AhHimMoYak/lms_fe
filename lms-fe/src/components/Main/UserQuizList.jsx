import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";

import '/src/styles/Main/QuizList.css'
import {useParams} from "react-router-dom";

const UserQuizList = ({quizData}) => {

    const [expandedQuizId, setExpandedQuizId] = useState(null);

    const toggleQuizDetails = (id) => {
        setExpandedQuizId(expandedQuizId === id ? null : id);
    };


    return (
        <div className="quiz-list">
            <div className="quiz-container">
                {quizData?.map((quiz) => (
                    <div key={quiz.quiz.id} className="quiz-item">
                        <div className="quiz-header">
                            <h3 onClick={() => toggleQuizDetails(quiz.quiz.id)} style={{cursor: "pointer"}}>
                                {`${quiz.quiz.question}`}</h3>
                        </div>
                        {expandedQuizId === quiz.quiz.id && (
                          <div className="quiz-details">
                              <ul>
                                  {quiz.quiz.options?.map((option) => (
                                    <li key={option.idx}>
                                        {`${option.idx}. ${option.text}`}
                                    </li>
                                  ))}
                              </ul>
                              <p><strong>정답:</strong> {quiz.quiz.answer}</p>
                              <p><strong>내답:</strong> {quiz.option}</p>
                              <p><strong>Solution:</strong> {quiz.quiz.solution}</p>
                          </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserQuizList;