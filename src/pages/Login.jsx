import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Temp from '../components/Temp'
import AuthManger from '../hooks/api/AuthManger'

function Login(){
    const { Register, LogIn }= AuthManger();
	const navigate = useNavigate();

	const registerFetch = async () => {
		try{
			if(!localStorage.getItem("access")){
				//console.log("start regiester");
				//await Register();
				console.log("start login");
				await LogIn();
			}
			
		} catch(error){
			console.log(error);
		}

		navigate("/");
	}

	useEffect(() =>{
		registerFetch();
	},[]);

    function handleLogout(){
        console.log("logout");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }


    return(
        <>
            <h1>Login</h1>
            <Temp/>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Login;