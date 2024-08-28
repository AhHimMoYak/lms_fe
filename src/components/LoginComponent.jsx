import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthManger from "../hooks/api/AuthManger";
import "../styles/LoginComponent.css"

function LoginComponent() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const navigate = useNavigate(); 
  const { LogIn } = AuthManger(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    const result = await LogIn({ username, password });
    
    if (result.success) {
      navigate("/"); 
    } else {
      setError(result.message || "로그인에 실패했습니다. 다시 시도해주세요."); 
      console.log("로그인 실패:", result.message);
    }
  };

  const handleRegister = ()=> {
    navigate("/join");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">야힘모약 로그인</h2>
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
        {error && <p className="login-error">{error}</p>} {/* 에러 메시지 표시 */}
        <div className="login-links">
          <div className="left-links">
            <a onClick={handleRegister} className="login-link">회원가입</a>
          </div>
          <div className="right-links">
            <a href="#" className="login-link">계정 찾기</a>
            <a href="#" className="login-link">비밀번호 찾기</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
