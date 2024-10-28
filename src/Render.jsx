import { Routes, Route } from "react-router-dom";
import { AuthChecker } from "./authentication/AuthChecker";
import BasicFrame from "./components/Main/BasicFrame";

import CourseFrame from "./components/Main/CourseFrame";
import Main from "./pages/Main/Main";
import Video from "./pages/Main/Video";
import Login from "./pages/Login";
import LiveStream from "./pages/Employee/LiveStream";
import VideoExplain from "./pages/Main/VideoExplain";
import Register from "./pages/Register.jsx";
import UpdateUser from "./pages/UpdateUser";
import PasswordPrompt from "./pages/PasswordPrompt";
import MypageFrame from "./components/Employee/MypageFrame";
import Dashboard from "./pages/Employee/Dashboard";
import CourseList from "./pages/Employee/CourseList";
import CourseDetailed from "./pages/Employee/CourseDetailed";
import LiveDetail from "./pages/Employee/LiveDetail";
import QnAList from "./pages/Employee/QnAList";
import QnATotalList from "./pages/Employee/QnATotalList";

function Render() {
    return (
        <Routes>
            <Route element={<BasicFrame />}>
                <Route path="/" element={<Main />} />
                <Route path="course" element={<Video />} />
                <Route path="/course/:courseId" element={<VideoExplain />} />
                <Route path="/live/:streamKey" element={<LiveStream />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route element={<AuthChecker />}> */}
                <Route path="mypage/*" element={<MypageFrame />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses" element={<CourseList />} />
                    <Route path="course/:courseId" element={<CourseFrame />}>
                        <Route path="" element={<CourseDetailed />} />
                        <Route path="contents" element={<CourseDetailed />} />
                        <Route path="live" element={<LiveDetail />} />
                        <Route path="qna" element={<QnAList />} />
                    </Route>
                    <Route path="qna" element={<QnATotalList />} />

                    <Route path="passwordPrompt" element={<PasswordPrompt />} />
                    <Route path="updateUser" element={<UpdateUser />} />
                </Route>
                {/* </Route> */}
            </Route>
        </Routes>
    );
}

export default Render;
