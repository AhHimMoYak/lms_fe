import { Routes, Route } from "react-router-dom";
import { AuthChecker } from "./authentication/AuthChecker";
import BasicFrame from "./components/BasicFrame.jsx";

import CourseFrame from "./components/Mypage/CourseFrame.jsx";
import Main from "./pages/Main/Main";
import Video from "./pages/Main/Video";
import Login from "./pages/Main/Login.jsx";
import LiveStream from "./pages/Material/LiveStream.jsx";
import VideoExplain from "./pages/Main/VideoExplain";
import Register from "./pages/Main/Register";
import UpdateUser from "./pages/Mypage/UpdateUser.jsx";
import PasswordPrompt from "./pages/Mypage/PasswordPrompt.jsx";
import MypageFrame from "./components/Mypage/MypageFrame.jsx";
import Dashboard from "./pages/Mypage/Dashboard.jsx";
import CourseList from "./pages/Mypage/CourseList.jsx";
import CourseDetailed from "./pages/Mypage/CourseDetailed.jsx";
import LiveDetail from "./pages/Mypage/LiveDetail.jsx";
import QnAList from "./pages/Mypage/QnAList.jsx";
import QnATotalList from "./pages/Mypage/QnATotalList.jsx";
import UserInformFrame from "./components/Mypage/UserInformFrame.jsx";

function Render() {
    return (
        <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route element={<BasicFrame />}>
                <Route path="/" element={<Main />} />
                <Route path="course" element={<Video />} />
                <Route path="/course/:courseId" element={<VideoExplain />} />
                <Route path="/live/:streamKey" element={<LiveStream />} />

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

                    <Route path="user/*" element={<UserInformFrame />}>
                        <Route path="" element={<PasswordPrompt />} />
                        <Route path="reconfirm" element={<PasswordPrompt />} />
                        <Route path="update" element={<UpdateUser />} />
                    </Route>
                </Route>
                {/* </Route> */}
            </Route>
        </Routes>
    );
}

export default Render;
