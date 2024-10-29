import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MypageFrame() {
    const containerStyle = {
        display: "flex",
        height: "100vh",
    };

    const mainContainerSytle = {
        flex: 1,
        width: "70%",
        height: "100vh",
        backgroundColor: "purple",
    };

    return (
        <div style={containerStyle}>
            <Sidebar />
            <div style={mainContainerSytle}>
                <Outlet />
            </div>
        </div>
    );
}

export default MypageFrame;
