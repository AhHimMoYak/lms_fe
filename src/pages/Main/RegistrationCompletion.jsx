import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationCompletion() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/');
        }, 5000);
    
        return () => clearTimeout(timer);
      }, [navigate]);
    

    return (
        <div>
            <h1>회원 가입 완료</h1>
            <h3>메인으로 돌아갑니다</h3>
        </div>
    );
};

export default RegistrationCompletion;