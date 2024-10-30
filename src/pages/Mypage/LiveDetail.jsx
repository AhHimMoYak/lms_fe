import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/LiveDetail.css";

const LiveDetail = () => {
    const [liveCourses, setLiveCourses] = useState({ on: [], canStart: [], end: [] });
    const { data, error, fetchData } = useAxios();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    useEffect(() => {
        fetchData(`/live?courseProvideId=${courseId}`, "GET");
    }, []);

    useEffect(() => {
        if (data) {
            const onCourses = data.filter((course) => course.state === "ON");
            const canStartCourses = data.filter((course) => course.state === "CAN_START" || course.state === "CREATED");
            const endCourses = data.filter((course) => course.state === "END");

            setLiveCourses({ on: onCourses, canStart: canStartCourses, end: endCourses });
        }
        console.log(data);
    }, [data]);

    if (error) {
        console.error("Error fetching live courses:", error);
    }

    const handleCourseClick = (key) => {
        navigate(`/live/${key}`);
    };

    return (
        <div className="live-detail-container">
            <div className="live-detail-content">
                <section className="liveSection">
                    <h2 className="sectionTitle">현재 라이브중인 강의</h2>
                    <ul className="listContainer">
                        {liveCourses.on.map((course) => (
                            <li key={course.key} className="listItem" onClick={() => handleCourseClick(course.key)}>
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">
                                    강의 시간: {formatDateTime(course.startTime)} - {formatDateTime(course.endTime)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="liveSection">
                    <h2 className="sectionTitle">라이브 강의 예정</h2>
                    <ul className="listContainer">
                        {liveCourses.canStart.map((course) => (
                            <li key={course.key} className="listItem">
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">예정된 날짜: {formatDateTime(course.startTime)}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="liveSection">
                    <h2 className="sectionTitle">종료된 라이브</h2>
                    <ul className="listContainer">
                        {liveCourses.end.map((course) => (
                            <li key={course.key} className="listItem">
                                <h3 className="listItemTitle">{course.title}</h3>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">종료 날짜: {formatDateTime(course.endTime)}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default LiveDetail;
