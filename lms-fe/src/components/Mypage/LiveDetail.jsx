import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/LiveDetail.css";
import {decodeTokenTutor} from "../../authentication/decodeTokenTutor.jsx";

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
        decodeTokenTutor()
            ? fetchData(`/live/instructor`, "GET")
            : fetchData(`/live?courseProvideId=${courseId}`, "GET");
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

    const handleCreateLiveClick = () => {
        navigate(`/education/course/${courseId}/live/create`);
    }

    const handleCourseClick = (key) => {
        navigate(`/live/${key}`);
    };

    const handleCreateClick = (key) => {
        navigate(`/education/course/${courseId}/live/${key}/quiz`);
    }

    const handleStartClick = (streamKey) => {
        try {
            navigator.clipboard.writeText(streamKey);
            alert("스트림키가 클립보드에 복사되었습니다.\nOBS Studio 와 같은 방송프로그램에 붙여넣어 시작해주세요.");
        } catch (error){
            alert("스트림키 복사 실패")
        }
    };

    return (
        <div className="live-detail-container">
            {decodeTokenTutor() && <button className="go-create-live" onClick={handleCreateLiveClick}>라이브 생성</button>}
            <div className="live-detail-content">
                <section className="liveSection">
                    <div className="sectionTitle">현재 라이브중인 강의</div>
                    <ul className="listContainer">
                        {liveCourses.canStart.map((course) => (
                            <li key={course.key} className="listItem" onClick={() => handleCourseClick(course.key)}>
                                <div className="listItemHeader">
                                    <h3 className="listItemTitle">{course.title}</h3>
                                    {decodeTokenTutor() && <button className="navigateButton" onClick={(event) => {
                                                event.stopPropagation(); // 이벤트 버블링 방지
                                                handleCreateClick(course.key);
                                            }}>
                                        라이브 퀴즈 생성
                                    </button>}
                                </div>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">예정된 날짜: {formatDateTime(course.startTime)}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="liveSection">
                    <div className="sectionTitle">라이브 강의 예정</div>
                    <ul className="listContainer">
                        {liveCourses.canStart.map((course) => (
                            <li key={course.key} className="listItem" onClick={() => handleCourseClick(course.key)}>
                                <div className="listItemHeader">
                                    <h3 className="listItemTitle">{course.title}</h3>
                                    {decodeTokenTutor() && <button className="navigateButton" onClick={(event) => {
                                                event.stopPropagation(); // 이벤트 버블링 방지
                                                handleCreateClick(course.key);
                                            }}>
                                        라이브 퀴즈 생성
                                    </button>}
                                </div>
                                <p className="listItemDetail">강사: {course.instructor}</p>
                                <p className="listItemDetail">예정된 날짜: {formatDateTime(course.startTime)}</p>
                                {decodeTokenTutor() && <button onClick={() => handleStartClick(course.streamKey)}>시작하기</button>}
                            </li>
                        ))}
                    </ul>

                </section>
                <section className="liveSection">
                    <div className="sectionTitle">종료된 라이브</div>
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
