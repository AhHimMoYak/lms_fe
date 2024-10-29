import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Mypage/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { data, fetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course`, "GET");
    }, []);


    const clickDetailCourse = (courseId) => {
        navigate(`/mypage/course/${courseId}`);
    };

    const clickListCourse = () => {
        navigate("/mypage/courses");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">대시보드</h2>
                <button className="more-button" onClick={clickListCourse}>
                    더보기
                </button>
            </div>
            <div className="course-cards-container">
                {data?.map((course) => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => clickDetailCourse(course.id)}
                    >
                        <div
                            className="course-card-header"
                            style={{ backgroundColor: getRandomColor() }}
                        ></div>
                        <div className="course-card-body">
                            <h3 className="course-title">{course.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

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

export default Dashboard;
