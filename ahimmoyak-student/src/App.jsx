import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/main/Navigation.jsx";
import Header from "./components/main/Header.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import CourseList from "./pages/main/CourseList.jsx";
import QnA from "./pages/main/QnA.jsx";
import Course from "./pages/course/Course.jsx";
import IVSPlayer from "./components/live/IVSPlayer.jsx";
import LivePage from "./pages/live/LivePage.jsx";


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

            <Route path="/live" element={<IVSPlayer streamUrl={"https://24312cd67dc1.ap-northeast-2.playback.live-video.net/api/video/v1/ap-northeast-2.503561434552.channel.BHyH8cwOvWOf.m3u8"}/>}/>
            <Route path="/live/:liveId" element={<LivePage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
