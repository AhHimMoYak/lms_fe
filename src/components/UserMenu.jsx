import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/userImg.png";
import { jwtDecode } from "jwt-decode";

function UserMenu({ onLogout }) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleCoursesClick = () => navigate("/course");

    const handleMypageClick = () => {
        const token = localStorage.getItem("access");
        if(jwtDecode(token).tutor){
            navigate("/education");
        }
        else{
            navigate("/mypage");
        }
        
        setDropdownVisible(false); // 드롭다운 닫기
    };

    const toggleDropdown = () => {
        setDropdownVisible((prevVisible) => !prevVisible);
    };

    // 클릭된 위치가 드롭다운 외부일 경우 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        // 마우스 클릭 이벤트 리스너 추가
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isMain = location.pathname === "/"  || location.pathname === "";
    return (
        <div className="user-menu" ref={dropdownRef}>
            {!isMain ? (<div/>) :  (<button className="go-course" onClick={handleCoursesClick}>강의</button>)}
            <img
                src={userIcon}
                alt="User Icon"
                className="user-icon"
                onClick={toggleDropdown}
            />
            {isDropdownVisible && (
                <div className="user-dropdown">
                    <button onClick={handleMypageClick}>마이페이지</button>
                    <button onClick={onLogout}>로그아웃</button>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
