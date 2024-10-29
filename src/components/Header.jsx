// Header.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import AuthManager from "../hooks/api/AuthManger.jsx";
import { jwtDecode } from "jwt-decode";
import UserMenu from "./UserMenu";
import NoneUserMenu from "./NoneUserMenu";
import logoIcon from "../assets/logo.png";

function decodeToken() {
    try {
        const token = localStorage.getItem("access");
        const claims = jwtDecode(token);
        return claims.sub;
    } catch (err) {
        console.error("토큰 디코딩 실패:", err.message);
        return null;
    }
}

function Header() {
    const { LogOut } = AuthManager();
    const navigate = useNavigate();

    const handleLogoClick = () => navigate("/");
    const handleLogoutClick = () => {
        LogOut();
    };

    return (
        <header className="header">
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
