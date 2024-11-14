import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx"

import "../../styles/Mypage/MypageFrame.css"

function CompanyFrame(){
    return (
        <div className="mypage-container">
            <Sidebar />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}

export default CompanyFrame;