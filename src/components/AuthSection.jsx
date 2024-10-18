import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function decodeToken(token) {
  try {
    const claims = jwtDecode(token);
    return claims;
  } catch (err) {
    console.error("토큰 디코딩 실패:", err.message);
    return null;
  }
}

function AuthSection() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      const claims = decodeToken(token);
      if (claims) {
        const extractedName = claims.sub;
        setUsername(extractedName);
      }
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUsername("");
  };

  const handleMyPage = () => {
    navigate("/myPage");
  };

  return (
    <div className="AuthSection">
      {username ? (
        <ul>
          <li>{` ${username} 님 반갑습니다.`}</li>
          <li>
            <a onClick={handleMyPage}>마이 페이지</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <a onClick={handleLogin}>Login</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AuthSection;
