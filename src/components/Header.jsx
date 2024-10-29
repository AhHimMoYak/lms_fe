// Header.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import AuthManager from "../hooks/api/AuthManger.jsx";
import { decodeToken } from "../authentication/decodeToken.jsx";
import UserMenu from "./UserMenu";
import NoneUserMenu from "./NoneUserMenu";
import logoIcon from "../assets/logo.png";

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
