// HeaderButtons.jsx
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";

function NoneUserMenu() {
    const navigate = useNavigate();

    const handleCoursesClick = () => navigate("/course");
    const handleSignInClick = () => navigate("/signin");
    const handleSignUpClick = () => navigate("/signup");

    return (
        <div className="header-buttons">
            <button className="go-course" onClick={handleCoursesClick}>
                강의
            </button>
            <div className="auth-buttons">
                {/* <button onClick={handleSignInClick}>Sign In</button> */}
                <button className="main-login-button" onClick={handleSignInClick}>
                    <CiLogin /> 로그인
                </button>
                <button className="join-button" onClick={handleSignUpClick}>
                    <AiOutlineUserAdd /> 회원가입
                </button>
            </div>
        </div>
    );
}

export default NoneUserMenu;