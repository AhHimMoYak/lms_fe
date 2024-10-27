import React, { useEffect, useState } from 'react';
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate } from 'react-router-dom';
import '../../styles/LiveDetail.css';

const LiveDetail = () => {
    const [liveCourses, setLiveCourses] = useState({ on: [], canStart: [], end: [] });
    const { data, error, fetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData('live?courseId=1', 'get'); // 나중에 courseId 받아와서 사용해야할 듯
    }, []);

    useEffect(() => {
        if (data) {
            const onCourses = data.filter(course => course.state === 'ON');
            const canStartCourses = data.filter(course => course.state === 'CAN_START');
            const endCourses = data.filter(course => course.state === 'END');

            setLiveCourses({ on: onCourses, canStart: canStartCourses, end: endCourses });
        }
    }, [data]);

    if (error) {
        console.error('Error fetching live courses:', error);
    }

    const handleCourseClick = (key) => {
        navigate(`/live/${key}`);
    };

    return (
        <div className="container">
            <div className="content">
                <section className="liveSection">
                    <h2 className="sectionTitle">현재 라이브중인 강의</h2>
                    <ul className="listContainer">
                        {liveCourses.on.map(course => (
                            <li key={course.key} className="listItem" onClick={() => handleCourseClick(course.key)}>
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">강의 시간: {course.startTime} - {course.endTime}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="liveSection">
                    <h2 className="sectionTitle">라이브 강의 예정</h2>
                    <ul className="listContainer">
                        {liveCourses.canStart.map(course => (
                            <li key={course.key} className="listItem">
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">예정된 날짜: {course.startTime}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="liveSection">
                    <h2 className="sectionTitle">종료된 라이브</h2>
                    <ul className="listContainer">
                        {liveCourses.end.map(course => (
                            <li key={course.key} className="listItem">
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">종료 날짜: {course.endTime}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default LiveDetail;
