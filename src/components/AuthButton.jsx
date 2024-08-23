import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthButton() {
  const [authorization, setAuthorization] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setAuthorization(token);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthorization(null);
  };

  return authorization ? (
    <>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  ) : (
    <>
      <button onClick={handleLogin}>로그인</button>
    </>
  );
}

export default AuthButton;
