import { NavLink, useLocation } from "react-router-dom";
import { decodeToken } from "../../authentication/decodeToken.jsx";

import "../../styles/Mypage/Sidebar.css";
import userIcon from "../../assets/userImg.png";

const Sidebar = () => {
    const location = useLocation();
    const checkIsActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const checkisDashboard = () => {
        return location.pathname === "/mypage/dashboard" || location.pathname === "/mypage";
    };

    return (
        <div className="sidebar">
            <div className="user-info">
                <img src={userIcon} alt="User Profile" />
                <div className="user-name">{decodeToken()}님</div>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/mypage/dashboard" className={() => (checkisDashboard() ? "sidebar_active" : "")}>
                            대시보드
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/course" className={() => (checkIsActive("/mypage/course") ? "sidebar_active" : "")}>
                            나의 코스
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/qna" className={() => (checkIsActive("/mypage/qna") ? "sidebar_active" : "")}>
                            QnA
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/user/reconfirm" className={() => (checkIsActive("/mypage/user") ? "sidebar_active" : "")}>
                            회원정보
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
