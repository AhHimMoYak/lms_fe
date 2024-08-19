import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthChecker = ({ children }) => {
    const location = useLocation(); // 현재 경로에 대한 정보 가져오기

    useEffect(() => {
        const token = localStorage.getItem("access");

        if(!token){
            window.location.href = "/";
        }

    }, [location.pathname]);

    return (
        <>
            {children}
        </>
    );
}