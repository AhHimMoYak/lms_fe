import axios from "axios";
import { API_BASE_URL } from "../../api-config";

export const AuthManger = () => {
    const Register = async () => {
        try {
            const response = await axios.post( `${API_BASE_URL}/join` , {
                "username" : "mirumiru",
                "password" : "password12#",
                "name" : "장미루",
                "gender" : "MALE",
                "birth" : "2000-04-15",
                "email" : "alfn051@gmail.com"
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if(response.status === 200){
                console.log("regiester success");
            }
            
        } catch (error) { 
            console.log(error);
        }
    };

    const LogIn = async () => {
        let response;
        try {
            response = await axios.post(`${API_BASE_URL}/login`, {
                "username" : "mirumiru",
                "password" : "password12#"
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            const rawAccessToken = response.headers['authorization'].split(']');
            const rawRefreshToken = response.headers['refresh'].split(']');
            //console.log(rawAccessToken[1]);
            //console.log(rawRefreshToken[1]);

            localStorage.setItem("access", JSON.stringify(rawAccessToken[1]));
            localStorage.setItem("refresh", JSON.stringify(rawRefreshToken[1]));

            console.log("login success");
            
        } catch (error) {
           console.log(error);
        }

    };

    return {
        LogIn,
        //EmailCheck,
        Register,
        //LogOut,
        //UserInfo
    };
}

export default AuthManger;