import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Temp from './components/Temp'
import AuthManger from './hooks/api/AuthManger'

function App() {
	const { Register, LogIn }= AuthManger();

	const registerFetch = async () => {
		try{
			if(!localStorage.getItem("access")){
				console.log("start regiester");
				await Register();
				console.log("start login");
				await LogIn();
			}
			
		} catch(error){
			console.log(error);
		}
	}

	useEffect(() =>{
		registerFetch();
	},[]);


	return (
		<>
		<h1>main</h1>
		<Temp/>
		</>
	)
}

export default App
