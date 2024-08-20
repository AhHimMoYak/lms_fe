import { useState, useEffect } from "react";

function Auth() {
  const [authorization, setAuthorization] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access");
    setAuthorization(token);
  }, []);

  return authorization ? (
    <>
      <h1>토큰이 있습니다.</h1>
    </>
  ) : (
    <h1>토큰이 없습니다.</h1>
  );
}

export default Auth;
