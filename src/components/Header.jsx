import "../styles/Header.css";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthButton from "../components/AuthButton";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  
  const handleRedirecToHome = () => {
    navigate("/");
  }
  
  return (
    <div className="Header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div><button onClick={handleRedirecToHome}>아힘모약</button></div>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <AuthButton />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
