import { NavLink, Outlet } from "react-router-dom";
import "../../styles/Mypage/CourseFrame.css";

function BoardTotalFrame() {
    const checkIsActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <div className="course-frame">
            <div className="course-tab-frame">
                <div className="course-frame-title">총 게시판</div>
                <div className="course-tabs">
                    <NavLink to="/education/board/Notice" className={() => (checkIsActive("Notice") ? "course_tab_active" : "")}>
                        Notice
                    </NavLink>
                    <NavLink to="/education/board/QnA" className={() => (checkIsActive("QnA") ? "course_tab_active" : "")}>
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

export default BoardTotalFrame;
