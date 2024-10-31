import React, {useEffect, useState} from "react";
import "/src/styles/Mypage/PasswordPrompt.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function PasswordPrompt({onSuccess}) {
    const accessToken = JSON.parse(localStorage.getItem("access"));
    const API_BASE_URL = "http://localhost:8080/api/v1"
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const login = async (password) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/user/verification`,
                {
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `[Bearer]${accessToken}`,
                    },
                }
            );

            return {success: true};
        } catch (error) {
            return {
                success: false,
                message: error.response?.message || "비밀번호가 일치하지 않습니다",
            };
        }
    }

    useEffect(() => {
        if (submitAttempted) {
            const verifyPassword = async () => {
                setSubmitAttempted(false);
                const result = await login(password);

                if (result.success) {
                    navigate("/mypage/user/update");
                } else {
                    alert(result.message);
                }
            };

            verifyPassword();
        }
    }, [submitAttempted]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
    };

    return (
        <div className="password-prompt-page">
            <div className="password-prompt-container">
                <h2 className="password-prompt-title">비밀번호 입력</h2>
                <form onSubmit={handlePasswordSubmit} className="password-prompt-form">
                    <div className="password-prompt-field">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                            className="password-prompt-input"
                        />
                    </div>
                    <button type="submit" className="password-prompt-button">
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordPrompt;
