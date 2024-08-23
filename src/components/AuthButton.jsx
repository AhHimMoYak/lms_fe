import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

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
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button color="inherit" onClick={handleLogin}>
      Login
    </Button>
  );
}

export default AuthButton;
