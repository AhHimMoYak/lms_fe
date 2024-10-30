import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const UserChecker = () => {
    const location = useLocation(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("access");
        const isTutor = jwtDecode(token).tutor;


        if (!isTutor) {
            navigate("/", { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Outlet />
        </>
    );
};
