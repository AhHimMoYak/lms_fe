import {Routes, Route} from "react-router-dom";
import {AuthChecker} from "./authentication/AuthChecker";
import BasicFrame from "./components/BasicFrame.jsx";

import CourseFrame from "./components/Mypage/CourseFrame.jsx";
import Main from "./pages/Main/Main";
import Video from "./pages/Main/Video.jsx";
import Login from "./pages/Main/Login.jsx";
import LiveStream from "./pages/Material/LiveStream.jsx";
import VideoExplain from "./pages/Main/VideoExplain.jsx";
import Register from "./pages/Main/Register.jsx";
import UpdateUser from "./pages/Mypage/UpdateUser.jsx";
import PasswordPrompt from "./pages/Mypage/PasswordPrompt.jsx";
import MypageFrame from "./components/Mypage/MypageFrame.jsx";
import Dashboard from "./pages/Mypage/Dashboard.jsx";
import CourseList from "./pages/Mypage/CourseList.jsx";
import CourseDetailed from "./pages/Mypage/CourseDetailed.jsx";
import LiveDetail from "./pages/Mypage/LiveDetail.jsx";
import QnAList from "./pages/Mypage/QnAList.jsx";
import QnATotalList from "./pages/Mypage/QnATotalList.jsx";
import CreateCourse from "./pages/Mypage/CreateCourse.jsx";
import CreateCurriculum from "./pages/Mypage/CreateCurriculum.jsx";
import UserInformFrame from "./components/Mypage/UserInformFrame.jsx";
import QnADetailed from "./pages/Mypage/QnADetailed.jsx";
import QnAEdit from "./pages/Mypage/QnAEdit.jsx";
import QnAPost from "./pages/Mypage/QnAPost.jsx";
import CreateLive from "./pages/Mypage/CreateLive.jsx";
import ModifyCourse from "./pages/Mypage/ModifyCourse.jsx";
import EducationFrame from "./components/Education/EducationFrame.jsx";
import ManageFrame from "./components/Education/ManageFrame.jsx";
import QuizPost from "./pages/QuizPost.jsx"
import CompanyFrame from "./components/Company/CompanyFrame.jsx"
import EmployeeList from "./components/Company/EmployeeList.jsx";
import CourseProvideList from "./components/Company/CourseProvideList.jsx";
import CompanyDetailed from "./components/Company/CompanyDetailed.jsx";
import VideoPlayer from "./pages/Mypage/VideoPlayer.jsx"

function Render() {
    return (
        <Routes>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/stream/video" element={<VideoPlayer/>}/>

            <Route element={<BasicFrame/>}>
                <Route path="/" element={<Main/>}/>
                <Route path="course" element={<Video/>}/>
                <Route path="/course/:courseId" element={<VideoExplain/>}/>
                <Route path="/live/:streamkey" element={<LiveStream/>}/>

                <Route element={<AuthChecker/>}>
                    <Route path="mypage/*" element={<MypageFrame/>}>
                        <Route path="" element={<Dashboard/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="course" element={<CourseList/>}/>

                        <Route path="course/:courseId" element={<CourseFrame/>}>
                            <Route path="" element={<CourseDetailed/>}/>
                            <Route path="contents" element={<CourseDetailed/>}/>
                            <Route path="live" element={<LiveDetail/>}/>

                            <Route path="qna" element={<QnAList/>}/>
                            <Route path="qna/post" element={<QnAPost/>}/>
                            <Route path="qna/:courseBoardId" element={<QnADetailed/>}/>
                            <Route path="qna/:courseBoardId/edit" element={<QnAEdit/>}/>
                        </Route>
                        <Route path="qna" element={<QnATotalList/>}/>

                        <Route path="user/*" element={<UserInformFrame/>}>
                            <Route path="" element={<PasswordPrompt/>}/>
                            <Route path="reconfirm" element={<PasswordPrompt/>}/>
                            <Route path="update" element={<UpdateUser/>}/>
                        </Route>
                    </Route>

                    {/* -----------------------------------------교육기관 페이지 라우팅 ------------------------------------- */}

                    <Route path="education/*" element={<EducationFrame/>}>
                        <Route path="" element={<Dashboard/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="course" element={<CourseList/>}/>
                        <Route path="manage/*" element={<ManageFrame/>}>
                            <Route path="course/create" element={<CreateCourse/>}/>
                            <Route path=":courseId/curriculum/create" element={<CreateCurriculum/>}/>
                        </Route>

                        <Route path="course/:courseId" element={<CourseFrame/>}>
                            <Route path="" element={<CourseDetailed/>}/>
                            <Route path="contents" element={<CourseDetailed/>}/>
                            <Route path="modify" element={<ModifyCourse/>}/>

                            <Route path="live" element={<LiveDetail/>}/>
                            <Route path="live/create" element={<CreateLive/>}/>
                            <Route path="live/:liveId/quiz" element={<QuizPost/>}/>

                            <Route path="qna" element={<QnAList/>}/>
                            <Route path="qna/:courseBoardId" element={<QnADetailed/>}/>
                            <Route path="qna/:courseBoardId/edit" element={<QnAEdit/>}/>
                        </Route>
                        <Route path="qna" element={<QnATotalList/>}/>

                        <Route path="user/*" element={<UserInformFrame/>}>
                            <Route path="" element={<PasswordPrompt/>}/>
                            <Route path="reconfirm" element={<PasswordPrompt/>}/>
                            <Route path="update" element={<UpdateUser/>}/>
                        </Route>
                    </Route>


                    {/* -----------------------------------------회사 페이지 라우팅 ------------------------------------- */}

                    <Route path="company/*" element={<CompanyFrame/>}>
                        <Route path="" element={<Dashboard/>}/>
                        <Route path="employees" element={<EmployeeList/>}/>
                        <Route path="courseProvide/list" element={<CourseProvideList/>}/>
                        <Route path="info" element={<CompanyDetailed/>}/>
                        <Route path="user/*" element={<UserInformFrame/>}>
                            <Route path="" element={<PasswordPrompt/>}/>
                            <Route path="reconfirm" element={<PasswordPrompt/>}/>
                            <Route path="update" element={<UpdateUser/>}/>
                        </Route>
                    </Route>
                </Route>


            </Route>
        </Routes>
    );
}

export default Render;
