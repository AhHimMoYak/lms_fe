import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [authorization, setAuthorization] = useState(null);
  const naviagte = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setAuthorization(token);
  }, []);

  const onClickButton = () => {
    naviagte("/login");
  };

  return authorization ? (
    <>
      <button>로그아웃</button>
    </>
  ) : (
    <>
      <button onClick={onClickButton}>로그인</button>
    </>
  );
}

export default Auth;
