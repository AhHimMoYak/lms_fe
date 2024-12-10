import {useState} from "react";
import InputField from "../../components/user/InputField.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import google_icon from "../../assets/google_login.svg"
import {useAuth} from "../../components/authentication/AuthProvider.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    remember: false
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useAuth();
  const API_URL = import.meta.env.VITE_SEVER_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 로그인 로직 구현
    try {
      const response = await axios.post(
        `${API_URL}/auth/v1/signin`,
        {
          username: formData.id,
          password : formData.password,
        },
        {
          withCredentials: true, // 추가된 옵션
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert(error.response.data.error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/v1/google?mode=signin`, {
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        console.log("get url ok");
        setIsLoggedIn(true);
        if (response.data.requiredUrl) {
          window.location.href = response.data.requiredUrl;
        }
      }
    } catch (error) {
      console.error("Error during Google login redirect:", error);
      alert("Failed to initiate Google login. Please try again.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="아이디"
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                error={errors.id}
                required
              />

              <InputField
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    로그인 상태 유지
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    비밀번호 찾기
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                로그인
              </button>
              <Link to={`/signup`} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                회원가입
              </Link>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    또는 다음으로 계속
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button onClick={handleGoogleSignUp} className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <img src={google_icon} className="h-5 w-5" alt="Google Icon" />
                  <span>Google로 계속</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;