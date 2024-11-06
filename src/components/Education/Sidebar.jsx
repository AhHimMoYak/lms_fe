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
        return location.pathname === "/education/dashboard" || location.pathname === "/education";
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
                        <NavLink to="/education/dashboard" className={() => (checkisDashboard() ? "sidebar_active" : "")}>
                            대시보드
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/education/course" className={() => (checkIsActive("/education/course") ? "sidebar_active" : "")}>
                            강좌 관리
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/education/qna" className={() => (checkIsActive("/education/qna") ? "sidebar_active" : "")}>
                            QnA
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/education/user/reconfirm" className={() => (checkIsActive("/education/user") ? "sidebar_active" : "")}>
                            회원정보
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
