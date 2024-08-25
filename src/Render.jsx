import { Routes, Route } from "react-router-dom"
import { AuthChecker } from "./authentication/AuthChecker"
import Body from "./pages/Body"
import App from "./App"
import Main from "./pages/Main"
import Mypage from "./pages/Mypage"
import Login from "./pages/Login"
import Register from "./pages/Register";
import RegistrationCompletion from "./pages/RegistrationCompletion.jsx";

function Render() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/join" element={<Register/>}/>
        <Route path="/join/complete" element={<RegistrationCompletion/>}/>
          <Route element={<AuthChecker/>}>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/test" element={<Body/>}/>
          </Route>
      </Routes>
    </>
  )
}

  export default Render
