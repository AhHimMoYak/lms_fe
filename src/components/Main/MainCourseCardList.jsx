import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Main/MainCourseList.css"
import {useNavigate} from "react-router-dom";

function shuffleArray(array) {
    // Fisher-Yates 알고리즘으로 배열 섞기
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function MainCourseCardList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchData, data } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/all`, "get");
    }, []);

    useEffect(() => {
        if (data) {
            const shuffledCourses = shuffleArray([...data]); // 데이터를 무작위로 섞기
            setCourses(shuffledCourses);
            setLoading(false);
        }
    }, [data]);
    useEffect(() => {
        if (data) {
            const shuffledCourses = shuffleArray([...data]).slice(0, 9); // Shuffle and select 9 courses
            setCourses(shuffledCourses);
            setLoading(false);
        }
    }, [data]);
    const clickDetailCourse = (courseId)=>{
        navigate(`/course/${courseId}`);
    }
    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className="course-list">
            {loading ? (
                <div>
                    <p className="loadingText">Loading courses...</p>
                </div>
            ) : courses.length > 0 ? (
                courses.map((course) => (
                    <div
                        key={course.id}
                        className="course-main-card"
                        onClick={() => clickDetailCourse(course.id)}
                    >
                        <div
                            className="course-main-card-header"
                            style={{ backgroundColor: getRandomColor() }}
                        ></div>
                        <div className="course-main-card-content">
                            <h3 className="course-main-card-title">{course.title}</h3>
                            <h4 className="course-main-card-tutor">{course.tutor}</h4>
                        </div>
                    </div>
                ))
            ) : (
                <p className="NoCoursesText">No courses available in this category.</p>
            )}
        </div>
    );
};

// 색상을 랜덤으로 선택하기 위한 함수
function getRandomColor() {
    const colors = [
        "#3f51b5",
        "#009688",
        "#f44336",
        "#4caf50",
        "#ff9800",
        "#9c27b0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default MainCourseCardList;
