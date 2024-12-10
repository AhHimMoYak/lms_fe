import {useState, useEffect} from "react";
import {User, ChevronDown} from 'lucide-react'
import logo from '../assets/logo.png'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "./authentication/AuthProvider.jsx";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, checkAuthStatus } = useAuth(); // 실제로는 인증 상태 관리 필요
  const API_URL = import.meta.env.VITE_SEVER_API_URL
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus(); // 페이지 진입 시 인증 상태 확인
  }, []);


  const handleSignOut = async () => {
    const response = await axios.get(`${API_URL}/auth/v1/signout`, {withCredentials: true});
    console.log(response);
    setIsLoggedIn(false);
    navigate("/");
    console.log("signout");
  }

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            className="flex-shrink-0 flex align-middle items-center space-x-1"
            to={`/`}>
            <img src={logo} alt="logo" className="w-10"/>
            <h1 className="text-2xl font-bold ">아힘모약</h1>
          </Link>

          {/*/!* Navigation *!/*/}
          {/*<div className="hidden md:flex items-center space-x-4 item">*/}
          {/*  <a href="#features" className="text-gray-600 hover:text-blue-600">특징</a>*/}
          {/*  <a href="#services" className="text-gray-600 hover:text-blue-600">서비스</a>*/}
          {/*</div>*/}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Portal Button */}
            <Link
              to={`/services`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              서비스 포털
            </Link>

            {/* User Menu */}
            <div className="relative">

              {isLoggedIn ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5"/>
                  </div>
                  <ChevronDown className="w-4 h-4"/>
                </button>
              ) : (
                <Link
                  to={`/signin`}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  로그인
                </Link>
              )
              }


              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to={"/mypage"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        마이페이지
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsUserMenuOpen(false);
                          handleSignOut();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      로그인
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {/*{isLoginModalOpen && (*/}
      {/*  <LoginModal*/}
      {/*    onClose={() => setIsLoginModalOpen(false)}*/}
      {/*    onLogin={() => {*/}
      {/*      setIsLoggedIn(true);*/}
      {/*      setIsLoginModalOpen(false);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </header>
  );
};


export default Header;