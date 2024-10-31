// HeaderButtons.jsx
import { useNavigate } from "react-router-dom";

function NoneUserMenu() {
    const navigate = useNavigate();

    const handleCoursesClick = () => navigate("/course");
    const handleSignInClick = () => navigate("/signin");
    const handleSignUpClick = () => navigate("/signup");

    return (
        <div className="header-buttons">
            <button className="go-course" onClick={handleCoursesClick}>강의</button>
            <div className="auth-buttons">
                <button onClick={handleSignInClick}>Sign In</button>
                <button onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
    );
}

export default NoneUserMenu;
