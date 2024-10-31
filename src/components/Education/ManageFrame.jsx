import { Outlet } from "react-router-dom";

import "../../styles/Mypage/MypageFrame.css";

function ManageFrame() {
    return (
        <div className="manage-container">
            <Outlet />
        </div>
    );
}

export default ManageFrame;
