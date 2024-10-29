// Header.jsx
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import AuthManager from "../hooks/api/AuthManger.jsx";
import { decodeToken } from "../authentication/decodeToken.jsx";
import UserMenu from "./UserMenu";
import NoneUserMenu from "./NoneUserMenu";
import logoIcon from "../assets/logo_white_background.png";

function Header() {
    const { LogOut } = AuthManager();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => navigate("/");
    const handleLogoutClick = () => {
        LogOut();
    };

    const isMypage = location.pathname.startsWith("/mypage");

    return (
        <header className={`header ${isMypage ? "header-mypage" : ""}`}>
            <img
                src={logoIcon}
                alt="User Icon"
                className="logo"
                onClick={handleLogoClick}
            />

            {decodeToken() ? (
                <UserMenu onLogout={handleLogoutClick} />
            ) : (
                <NoneUserMenu />
            )}
        </header>
    );
}

export default Header;
