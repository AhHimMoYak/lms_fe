import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import IntroductionPage from "./pages/IntroductionPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import LoginPage from "./pages/user/LoginPage.jsx";
import RegisterPage from "./pages/user/RegisterPage.jsx";
import EmailVerificationPage from "./pages/user/EmailVerificationPage.jsx";
import AdditionalInfoPage from "./pages/user/AdditionalInfoPage.jsx";
import RoleSelectionPage from "./pages/role/RoleSelectionPage.jsx";
import EmployeeRegistrationPage from "./pages/role/EmployeeRegistrationPage.jsx";
import InstitutionRegistrationPage from "./pages/role/InstitutionRegistrationPage.jsx";
import CompanyRegistrationPage from "./pages/role/CompanyRegistrationPage.jsx";
import UserInfoPage from "./pages/user/UserInfoPage.jsx";
import {useState} from "react";
import {useKonamiCode} from "./utils/EasterEgg.jsx";

function App() {

  const [easterEgg, setEasterEgg] = useState(false);
  useKonamiCode(() => {
    setEasterEgg(true);
    setTimeout(() => setEasterEgg(false), 5000); // 10초 후 원상복구
  });

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gray-100 ${easterEgg? "flying" : ""}`}>
        <Header/>
        <div className="">
          <Routes>
            <Route>
              <Route path="/" element={<IntroductionPage />} />
              <Route path='/services' element={<ServicesPage />} />

              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/email" element={<EmailVerificationPage />} />
              <Route path="/more_info" element={<AdditionalInfoPage />} />
              <Route path="/mypage" element={<UserInfoPage/>}/>

              <Route path="/register" element={<RoleSelectionPage />} />
              <Route path="/register/employee" element={<EmployeeRegistrationPage/>}/>
              <Route path="/register/company" element={<CompanyRegistrationPage/>}/>
              <Route path="/register/institution" element={<InstitutionRegistrationPage/>}/>
            </Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App
