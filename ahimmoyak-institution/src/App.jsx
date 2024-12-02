import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/main/Layout.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import {CourseList} from "./pages/course/CourseList.jsx";
import CourseDetail from "./pages/course/CourseDetail.jsx";
import Provide from "./pages/provide/Provide.jsx";
import ProvideDetail from "./pages/provide/ProvideDetail.jsx";
import NoticeDetail from "./pages/course/NoticeDetail.jsx";




function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="">
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/courses" element={<CourseList/>}/>
              <Route path="/courses/:courseId" element={<CourseDetail/>}/>
              <Route path="/courses/:courseId/notice/:noticeId" element={<NoticeDetail/>}/>

              <Route path="/provide" element={<Provide/>}/>
              <Route path="/provide/:provideId" element={<ProvideDetail/>}/>


            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
