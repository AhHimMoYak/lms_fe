import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/main/Layout.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import EmployeeManagement from "./pages/main/EmployManagement.jsx";
import Courses from "./pages/course/Courses.jsx";
import CourseDetail from "./pages/course/CourseDetail.jsx";
import CourseSearch from "./pages/course/CourseSearch.jsx";
import CourseSearchDetail from "./pages/course/CourseSearchDetail.jsx";
import ContractManagement from "./pages/contract/ContractManagement.jsx";
import CompanyManagement from "./pages/company/CompanyManagement.jsx";



function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="">
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/employees" element={<EmployeeManagement/>}/>

              <Route path="/courses" element={<Courses/>}/>
              <Route path="/courses/:courseId" element={<CourseDetail/>}/>

              <Route path="/search" element={<CourseSearch/>}/>
              <Route path="/search/:courseId" element={<CourseSearchDetail/>}/>

              <Route path="/contracts" element={<ContractManagement/>}/>

              <Route path="/company" element={<CompanyManagement/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
