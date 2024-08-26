import axios from "axios";
import {API_BASE_URL} from "../../api-config";

export const AuthManager = () => {
    const Register = async (username, password, name, gender, birth, email) => {
        try {
            const userData = {
                username,
                password,
                name,
                gender,
                birth,
                email
            };


            const response = await axios.post(`${API_BASE_URL}/join`, userData, {
                headers: {'Content-Type': 'application/json'}
            });


            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.error("Register Error Response Data:", error.response.data);
                throw error.response.data;
            } else {
                console.error("Register Error:", error);
                throw {general: "회원가입에 실패했습니다. 다시 시도해주세요."};
            }
        }
    };

    const LogIn = async ({ username, password }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username, 
                password
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const rawAccessToken = response.headers['authorization'].split(']');
            const rawRefreshToken = response.headers['refresh'].split(']');
            //console.log(rawAccessToken[1]);
            //console.log(rawRefreshToken[1]);

            localStorage.setItem("access", JSON.stringify(rawAccessToken[1]));
            localStorage.setItem("refresh", JSON.stringify(rawRefreshToken[1]));

            return { success: true };
        } catch (error) {
            console.log("Login error:", error);
            return { success: false, message: error.response?.data?.message || "로그인에 실패했습니다." }; 
        }
    };

    return {
        Register,
        LogIn,
    };
}

export default AuthManager;

