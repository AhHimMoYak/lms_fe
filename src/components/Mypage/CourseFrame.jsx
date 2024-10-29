import { NavLink, Outlet } from "react-router-dom";
import "../../styles/Mypage/CourseFrame.css";

function CourseFrame() {
    return (
        <div className="course-frame">
            <div className="course-tab-frame">
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

                <div className="tab-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default CourseFrame;
