import { NavLink, Outlet } from "react-router-dom";
import "../../styles/Mypage/CourseFrame.css";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor";

function CourseFrame() {
    const checkIsActive = (path) => {
        return location.pathname.includes(path);
    };

    const checkIsContent = (path) => {
        if (decodeTokenTutor()) {
            const regex = new RegExp(`^/education/course/\\d+(/${path})?$`);
            return regex.test(location.pathname);
        }
        const regex = new RegExp(`^/mypage/course/\\d+(/${path})?$`);
        return regex.test(location.pathname);
    };

    return (
        <div className="course-frame">
            <div className="course-tab-frame">
                <div className="course-frame-title">{decodeTokenTutor() ? "강의 정보" : "나의 코스"}</div>
                <div className="course-tabs">
                    <NavLink to="contents" className={() => (checkIsContent("contents") ? "course_tab_active" : "")}>
                        강의
                    </NavLink>
                    <NavLink to="live" className={() => (checkIsActive("live") ? "course_tab_active" : "")}>
                        라이브
                    </NavLink>
                    <NavLink to="board/Notice" className={() => (checkIsActive("board/Notice") ? "course_tab_active" : "")}>
                        Notice
                    </NavLink>
                    <NavLink to="board/QnA" className={() => (checkIsActive("board/QnA") ? "course_tab_active" : "")}>
                        QnA
                    </NavLink>
                    <NavLink to="exam" className={() => (checkIsActive("exam") ? "course_tab_active" : "")}>
                        Exam
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
