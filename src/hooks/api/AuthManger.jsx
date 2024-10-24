import axios from "axios";
import { API_BASE_URL } from "../../api-config";
import { useNavigate } from "react-router-dom";

export const AuthManager = () => {
  const navigate = useNavigate();
  const Register = async (username, password, name, gender, birth, email) => {
    try {
      const userData = {
        username,
        password,
        name,
        gender,
        birth,
        email,
      };

      const response = await axios.post(`${API_BASE_URL}/join`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      if (error.response.data) {
        throw error.response.data;
      } else {
        throw { general: "회원가입에 실패했습니다. 다시 시도해주세요." };
      }
    }
  };

  const LogIn = async ({ username, password }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const rawAccessToken = response.headers["authorization"].split("]");
      const rawRefreshToken = response.headers["refresh"].split("]");

      localStorage.setItem("access", JSON.stringify(rawAccessToken[1]));
      localStorage.setItem("refresh", JSON.stringify(rawRefreshToken[1]));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "로그인에 실패했습니다.",
      };
    }
  };

  const LogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return {
    Register,
    LogIn,
    LogOut,
  };
};

export default AuthManager;
