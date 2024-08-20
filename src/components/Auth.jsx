import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [authorization, setAuthorization] = useState(null);
  const naviagte = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setAuthorization(token);
  }, []);

  const handleLogin = () => {
    naviagte("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
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

export default Auth;
