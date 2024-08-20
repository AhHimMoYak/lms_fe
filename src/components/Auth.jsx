import { useState, useEffect } from "react";

function Auth() {
  const [authorization, setAuthorization] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access");
    setAuthorization(token);
  }, []);

  return authorization ? (
    <>
      <button>로그아웃</button>
    </>
  ) : (
    <>
      <button>로그인</button>
    </>
  );
}

export default Auth;
