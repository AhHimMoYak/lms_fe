import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/main/Navigation.jsx";
import Header from "./components/main/Header.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import CourseList from "./pages/main/CourseList.jsx";
import QnA from "./pages/main/QnA.jsx";
import Course from "./pages/course/Course.jsx";


function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Navigation/>
        <div className="ml-64 pt-16 p-8">
          <Routes>
            <Route>
              <Route path="/" element={<Dashboard />} />
              <Route path="/course" element={<CourseList />} />
              <Route path="/qna" element={<QnA />} />
            </Route>
            <Route path="/course/:courseId/*" element={<Course />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
