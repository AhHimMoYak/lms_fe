import { NavLink, Outlet } from "react-router-dom";
import "../../styles/Mypage/CourseFrame.css";

function CourseFrame() {
    const containerStyle = {
        display: "flex",
        height: "100vh",
    };

    return (
        <div style={containerStyle}>
            <h2>나의 코스</h2>
            <div className="tabs">
                <NavLink
                    to="contents"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    강의
                </NavLink>
                <NavLink
                    to="live"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    라이브
                </NavLink>
                <NavLink
                    to="qna"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    QnA
                </NavLink>
            </div>

            {/* 중첩된 경로의 컴포넌트를 렌더링할 Outlet */}
            <div className="tab-content">
                <Outlet />
            </div>
        </div>
    );
}

export default CourseFrame;
