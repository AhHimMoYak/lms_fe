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

            console.log("Register Request Data:", userData);

            const response = await axios.post(`${API_BASE_URL}/join`, userData, {
                headers: {'Content-Type': 'application/json'}
            });

            console.log("Register Response Data:", response.data);

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Register Error Response Data:", error.response.data);
                throw error.response.data;
            } else {
                console.error("Register Error:", error);
                throw {general: "회원가입에 실패했습니다. 다시 시도해주세요."};
            }
        }
    };

    const LogIn = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            }, {
                headers: {'Content-Type': 'application/json'},
            });

            const accessToken = response.headers['authorization'].split(' ')[1];
            const refreshToken = response.headers['refresh'].split(' ')[1];

            localStorage.setItem("access", accessToken);
            localStorage.setItem("refresh", refreshToken);

            console.log("Login successful");
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Login Error Response Data:", error.response.data);
                throw error.response.data;
            } else {
                console.error("Login Error:", error);
                throw {general: "로그인에 실패했습니다. 다시 시도해주세요."};
            }
        }
    };

    return {
        Register,
        LogIn,
    };
}

export default AuthManager;
