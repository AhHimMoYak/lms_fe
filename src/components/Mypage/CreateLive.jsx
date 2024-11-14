import React, {useEffect, useState, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios';
import "../../styles/Education/CreateLive.css"

function CreateLive() {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {data, fetchData} = useAxios();

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const requestData = {
            title,
            startTime: `${startTime}:00`, // 초를 추가하여 Java LocalDateTime과 일치시킴
        };
        fetchData(`/live?courseId=${courseId}`, "POST", requestData).then(() => {
            navigate(`/education/course/${courseId}/list`);
        }).catch((error) => {
            console.error('라이브 생성 실패:', error);
        });
    }, [title, startTime, courseId, fetchData, navigate]);

    return (
        <form className = "create-live-form" onSubmit={handleSubmit}>
            <div className ="create-live-quiz-content">
                <label className ="create-live-label" htmlFor="title">라이브 제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className ="create-live-inform-content">
                <label className ="create-live-label" htmlFor="startTime">시작 시간</label>
                <input
                    type="datetime-local"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            <button className ="create-live-quiz-buttion"type="submit">라이브 생성</button>
        </form>
    );
}

export default CreateLive;
