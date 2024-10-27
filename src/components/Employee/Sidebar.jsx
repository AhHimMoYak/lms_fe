import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <div
            style={{
                width: "30%",
                height: "100vh",
                backgroundColor: "skyblue",
            }}
        >
            <nav>
                <ul>
                    <li>
                        <NavLink to="/mypage/dashboard" className="sidebar_active">
                            대시보드
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/courses" className="sidebar_active">
                            나의 코스
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;