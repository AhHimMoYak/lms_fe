import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthSection from "./AuthSection";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  
  const handleRedirecToHome = () => {
    navigate("/");
  }
  
  return (
    <header className="main-header">
        <div className="logo">
            <a onClick={handleRedirecToHome}>아힘모약</a>
        </div>
        <nav className="main-nav">
        <AuthSection />
        </nav>
    </header>
  );
}

export default Header;
