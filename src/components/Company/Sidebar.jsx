import { NavLink, useLocation } from "react-router-dom";
import { decodeToken } from "../../authentication/decodeToken.jsx";

import "../../styles/Company/Sidebar.css";
import userIcon from "../../assets/userImg.png";

const Sidebar = () => {
    const location = useLocation();
    const checkIsActive = (path) => {
        return location.pathname.startsWith(path);
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
                        <NavLink to="/company/employees" className={() => (checkIsActive("/company/employees") ? "sidebar_active" : "")}>
                            사원 목록
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/company/courseProvide/list" className={() => (checkIsActive("/company/courseProvide/list") ? "sidebar_active" : "")}>
                            수강신청 목록
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/company/info" className={() => (checkIsActive("/comapny/info") ? "sidebar_active" : "")}>
                            회사 정보
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/company/user/reconfirm" className={() => (checkIsActive("/company/user") ? "sidebar_active" : "")}>
                            회원정보
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
