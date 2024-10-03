import { Outlet, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as jose from "jose";

export const PrivateRoleRoute = ({ roles }) => {
  const token = localStorage.getItem('access'); 

  if (!token) {
    return <Redirect to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  return roles.includes(userRole) ? <Outlet /> : <Redirect to="/access-denied" />;
};