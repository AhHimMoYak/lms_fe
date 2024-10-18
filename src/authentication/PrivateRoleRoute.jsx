import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const PrivateRoleRoute = (roles) => {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  return roles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};
