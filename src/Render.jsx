import { Routes, Route } from "react-router-dom"
import { AuthChecker } from "./authentication/AuthChecker"
import Body from "./pages/Body"
import App from "./App"

function Render() {

  return (
    <>
      <Routes>
        <Route path="/" element={<App/>}/>
          <Route element={<AuthChecker/>}>
            
            <Route path="/test" element={<Body/>}/>
          </Route>
          
        
      </Routes>
    </>
  )
}
  
  export default Render
  