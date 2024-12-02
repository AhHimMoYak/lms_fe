import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import "../../styles/Mypage/MypageFrame.css";

function EducationFrame() {
    return (
        <div className="mypage-container">
            <Sidebar />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    );
}

export default EducationFrame;
