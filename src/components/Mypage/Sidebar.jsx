import { NavLink } from "react-router-dom";
import { decodeToken } from "../../authentication/decodeToken.jsx";

import "../../styles/Mypage/Sidebar.css";
import userIcon from "../../assets/userImg.png";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="user-info">
                <img src={userIcon} alt="User Profile" />
                <div className="user-name">{decodeToken()}</div>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/mypage/dashboard"
                            className={({ isActive }) =>
                                isActive ? "sidebar_active" : ""
                            }
                        >
                            대시보드
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mypage/courses"
                            className={({ isActive }) =>
                                isActive ? "sidebar_active" : ""
                            }
                        >
                            나의 코스
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mypage/qna"
                            className={({ isActive }) =>
                                isActive ? "sidebar_active" : ""
                            }
                        >
                            QnA
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mypage/qna"
                            className={({ isActive }) =>
                                isActive ? "sidebar_active" : ""
                            }
                        >
                            회원정보
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
