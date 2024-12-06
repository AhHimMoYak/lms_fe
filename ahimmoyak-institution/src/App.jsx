import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/main/Layout.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import {CourseList} from "./pages/course/CourseList.jsx";
import CourseDetail from "./pages/course/CourseDetail.jsx";
import Provide from "./pages/provide/Provide.jsx";
import ProvideDetail from "./pages/provide/ProvideDetail.jsx";
import NoticeDetail from "./pages/course/NoticeDetail.jsx";
import NoticeCreate from "./pages/course/NoticeCreate.jsx";
import ContractManagement from "./pages/contract/ContractManagement.jsx";
import ContractDetail from "./pages/contract/ContractDetail.jsx";
import InstitutionManagement from "./pages/institution/InstitutionManagement.jsx";
import BroadcastPage from "./pages/live/BroadcastPage.jsx";




function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="">
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/courses" element={<CourseList/>}/>
              <Route path="/courses/:courseId/*" element={<CourseDetail/>}/>

              <Route path="/provide" element={<Provide/>}/>
              <Route path="/provide/:provideId" element={<ProvideDetail/>}/>

              <Route path="/contracts" element={<ContractManagement/>}/>
              <Route path="/contracts/:contractId" element={<ContractDetail/>}/>

              <Route path="/institution" element={<InstitutionManagement/>}/>

              <Route path="/live" element={<BroadcastPage/>}/>

            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
