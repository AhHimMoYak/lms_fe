import {Routes, Route} from "react-router-dom";
import {AuthChecker} from "./authentication/AuthChecker";
import Mypage from "./pages/Mypage";
import {PrivateRoleRoute} from "./authentication/PrivateRoleRoute";
import BasicFrame from "./components/Main/BasicFrame";

import CourseFrame from "./components/Main/CourseFrame";
import Main from "./pages/Main/Main";
import Video from "./pages/Main/Video";
import Live from "./pages/Main/Live";
import IntrodcutionFrame from "./components/Main/IntroductionFrame";
import VideoExplain from "./pages/Main/VideoExplain.jsx";
import LiveExplaine from "./pages/Main/VideoExplaine copy";
import Login from "./pages/Login";
import EmployeeRouter from "./EmployeeRender";
import SupervisorRoutes from "./SupervisorRoutes";
import LiveStream from "./pages/Employee/LiveStream.jsx";

function Render() {
  return (
    <Routes>
      {/* 기존 메인 페이지 */}
      <Route element={<BasicFrame />}>
        <Route path="/" element={<Main />} />
        <Route path="/course/*" element={<CourseFrame />}>
          <Route path="video" element={<Video />} />
          <Route path="live" element={<Live />} />
        </Route>
        <Route path="/introduction/*" element={<IntrodcutionFrame />}>
          <Route path="video/:courseId" element={<VideoExplaine />} />
          <Route path="live/:courseId" element={<LiveExplaine />} />
        </Route>
        <Route path="/live/:streamKey" element={<LiveStream />}>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />

      {/* 로그인 사용자 구분 */}
      <Route element={<AuthChecker />}>
        {/* 마이페이지 공통 사용 부분 */}
        <Route path="mypage/*" element={<Mypage />}>
          <Route path="*" element={<EmployeeRouter />} />
          <Route path="*" element={<SupervisorRoutes />} />
          {/* 역할에 따른 페이지 구성 분리 및 접근 제한 */}
          <Route element={PrivateRoleRoute("COMPANY")}></Route>
          <Route element={PrivateRoleRoute("SUPERVISOR")}></Route>

          <Route element={PrivateRoleRoute("MANAGER")}></Route>

          <Route element={PrivateRoleRoute("INSTRUCTOR")}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Render;
