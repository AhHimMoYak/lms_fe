import { NavLink, Outlet } from "react-router-dom";
import "../../styles/Mypage/CourseFrame.css";

function CourseFrame() {
    const checkIsActive = (path) => {
        return location.pathname.includes(path);
    };

    const checkIsContent = (path) => {
        const regex = new RegExp(`^/mypage/course/\\d+(/${path})?$`);
        return regex.test(location.pathname);
    };

    return (
        <div className="course-frame">
            <div className="course-tab-frame">
                <div className="course-frame-title">나의 코스</div>
                <div className="course-tabs">
                    <NavLink to="contents" className={() => (checkIsContent("contents") ? "course_tab_active" : "")}>
                        강의
                    </NavLink>
                    <NavLink to="live" className={() => (checkIsActive("live") ? "course_tab_active" : "")}>
                        라이브
                    </NavLink>
                    <NavLink to="qna" className={() => (checkIsActive("qna") ? "course_tab_active" : "")}>
                        QnA
                    </NavLink>
                </div>

                <div className="course-tab-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default CourseFrame;
