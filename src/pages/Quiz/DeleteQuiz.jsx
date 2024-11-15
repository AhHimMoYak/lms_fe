import React, { useState } from 'react';
import useAxios from '/src/hooks/api/useAxios.jsx';

const DeleteQuiz = () => {
    const [quizId, setQuizId] = useState('');
    const [feedback, setFeedback] = useState('');
    const axiosInstance = useAxios();

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/quiz/${quizId}`);
            setFeedback('퀴즈가 성공적으로 삭제되었습니다.');
        } catch (error) {
            setFeedback('퀴즈 삭제에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>퀴즈 삭제</h2>
            <input
                type="text"
                placeholder="퀴즈 ID"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                required
            />
            <button onClick={handleDelete}>퀴즈 삭제</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default DeleteQuiz;
