import { useState } from "react";
import "../../styles/Main/Register.css";
import { useNavigate } from "react-router-dom";
import AuthManager from "../../hooks/api/AuthManger.jsx";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const { Register } = AuthManager();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = "아이디를 입력하세요.";
        if (!password) newErrors.password = "비밀번호를 입력하세요.";
        if (!name) newErrors.name = "이름을 입력하세요.";
        if (!gender) newErrors.gender = "성별을 선택하세요.";
        if (!birth) newErrors.birth = "생년월일을 입력하세요.";
        if (!email) newErrors.email = "이메일을 입력하세요.";

        return newErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            await Register(username, password, name, gender, birth, email);
            navigate("/signin");
        } catch (error) {
            console.log("Caught error:", error);
            setErrors(error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2 className="register-title">회원가입</h2>
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="register-field">
                        <input
                            type="text"
                            placeholder="아이디"
                            className={`register-input ${
                                errors.username ? "error" : ""
                            }`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="register-error-container">
                            {errors.username && (
                                <p className="register-error">
                                    {errors.username}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="register-field">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className={`register-input ${
                                errors.password ? "error" : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="register-error-container">
                            {errors.password && (
                                <p className="register-error">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="register-field">
                        <input
                            type="text"
                            placeholder="이름"
                            className={`register-input ${
                                errors.name ? "error" : ""
                            }`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="register-error-container">
                            {errors.name && (
                                <p className="register-error">{errors.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="register-field">
                        <select
                            className={`register-select ${
                                errors.gender ? "error" : ""
                            }`}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="" selected>
                                성별
                            </option>
                            <option value="MALE">남성</option>
                            <option value="FEMALE">여성</option>
                        </select>
                        <div className="register-error-container">
                            {errors.gender && (
                                <p className="register-error">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="register-field">
                        <input
                            type="date"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                            className={`register-input ${
                                errors.birth ? "error" : ""
                            }`}
                            placeholder="생년월일을 선택하세요"
                        />
                        <div className="register-error-container">
                            {errors.birth && (
                                <p className="register-error">{errors.birth}</p>
                            )}
                        </div>
                    </div>

                    <div className="register-field">
                        <input
                            type="text"
                            placeholder="이메일"
                            className={`register-input ${
                                errors.email ? "error" : ""
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="register-error-container">
                            {errors.email && (
                                <p className="register-error">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="register-button">
                        회원가입
                    </button>
                </form>
                {errors.general && (
                    <p className="register-general-error">{errors.general}</p>
                )}
            </div>
        </div>
    );
}

export default Register;
