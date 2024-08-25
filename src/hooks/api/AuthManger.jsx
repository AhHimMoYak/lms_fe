import axios from "axios";
import { API_BASE_URL } from "../../api-config";

export const AuthManger = () => {
    const Register = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/join`, {
                "username" : "mirumiru",
                "password" : "password12#",
                "name" : "장미루",
                "gender" : "MALE",
                "birth" : "2000-04-15",
                "email" : "alfn051@gmail.com"
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                console.log("Register success");
            }

        } catch (error) {
            console.log("Registration error:", error);
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

                const rawAccessToken = response.headers['authorization'].split('_');
                const rawRefreshToken = response.headers['refresh'].split('_');

                localStorage.setItem("access", JSON.stringify(rawAccessToken[1]));
                localStorage.setItem("refresh", JSON.stringify(rawRefreshToken[1]));

                console.log("Login success");
                return { success: true };


        } catch (error) {
            console.log("Login error:", error);
            return { success: false, message: error.response?.data?.message || "로그인에 실패했습니다." };
        }
    };

    return {
        LogIn,
        Register
    };
}

export default AuthManger;
