import {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthManager from "../../hooks/api/AuthManger.jsx";
import "../../styles/Main/LoginComponent.css";

function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {LogIn} = AuthManager();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const result = await LogIn({username, password});

        if (result.success) {
            navigate("/");
        } else {
            setError(
                result.message || "로그인에 실패했습니다. 다시 시도해주세요."
            );
            console.log("로그인 실패:", result.message);
        }
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo-container">
                    <div id="logo">
                        <a href="/">
                            <img src="../../../src/assets/logo.png"/>
                        </a>
                    </div>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="사용자 이름을 입력해주세요."
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>
                {error && <p className="login-error">{error}</p>}{" "}
                {/* 에러 메시지 표시 */}
                <div className="login-links">
                    <div className="left-links">
                        <a onClick={handleRegister} className="login-link">
                            회원가입
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
