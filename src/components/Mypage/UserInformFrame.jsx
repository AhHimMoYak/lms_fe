import { Outlet } from "react-router-dom";

function UserInformFrame() {
    return (
        <div className="user-container">
            <Outlet />
        </div>
    );
}

export default UserInformFrame;
