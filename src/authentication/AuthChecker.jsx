import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

export const AuthChecker = () => {
    const location = useLocation(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            navigate("/", { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Outlet />
        </>
    );
};
