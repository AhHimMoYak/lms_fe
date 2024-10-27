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
import LiveExplaine from "./pages/Main/VideoExplaine copy";
import Login from "./pages/Login";
import EmployeeRouter from "./EmployeeRender";
import SupervisorRoutes from "./SupervisorRoutes";
import LiveStream from "./pages/Employee/LiveStream.jsx";
import VideoExplain from "./pages/Main/VideoExplain";
import Register from "./pages/Register.jsx";
import UpdateUser from "./pages/UpdateUser";
import PasswordPrompt from "./pages/PasswordPrompt";
import MypageFrame from "./components/Employee/MypageFrame";
import Dashboard from "./pages/Employee/Dashboard.jsx";
import CourseList from "./pages/Employee/CourseList";
import CourseDetailed from "./pages/Employee/CourseDetailed.jsx";
import LiveDetail from "./pages/Employee/LiveDetail.jsx";
import QnAList from "./pages/Employee/QnAList.jsx";
import QnATotalList from "./pages/Employee/QnATotalList.jsx";


function Render() {
    return (
        <Routes>
            <Route element={<BasicFrame />}>
                <Route path="/" element={<Main />} />
                <Route path="course" element={<Video />} />
                <Route path="/course/:courseId" element={<VideoExplain />} />
                <Route path="/live/:streamKey" element={<LiveStream/>}/>
                {/* <Route element={<AuthChecker />}> */}
                <Route path="mypage/*" element={<MypageFrame />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses" element={<CourseList />} />
                    <Route path="course/:courseId" element={<CourseFrame />}>
                        <Route path="" element={<CourseDetailed/>}/>
                        <Route path="contents" element={<CourseDetailed/>}/>
                        <Route path="live" element={<LiveDetail/>}/>
                        <Route path="qna" element={<QnAList/>}/>
                    </Route>
                    <Route path="qna" element={<QnATotalList/>}/>    
                </Route>
                {/* </Route> */}
            </Route>
        </Routes>
    );
}



// function Render() {
//     return (
//         <Routes>
//             {/* 기존 메인 페이지 */}
//             <Route element={<BasicFrame/>}>
//                 <Route path="/" element={<Main/>}/>
//                 <Route path="/course/*" element={<CourseFrame/>}>
//                     <Route path="video" element={<Video/>}/>
//                     <Route path="live" element={<Live/>}/>
//                 </Route>
//                 <Route path="/introduction/*" element={<IntrodcutionFrame/>}>
//                     <Route path="video/:courseId" element={<VideoExplaine/>}/>
//                     <Route path="live/:courseId" element={<LiveExplaine/>}/>
//                 </Route>
//                 <Route path="/live/:streamKey" element={<LiveStream/>}>
//                 </Route>
//             </Route>
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/register" element={<Register/>}/>
//             <Route path="/passwordPrompt" element={<PasswordPrompt/>}/>
//             <Route path="/updateUser" element={<UpdateUser/>}/>

//             {/* 로그인 사용자 구분 */}
//             <Route element={<AuthChecker/>}>
//                 {/* 마이페이지 공통 사용 부분 */}
//                 <Route path="mypage/*" element={<Mypage/>}>
//                     <Route path="*" element={<EmployeeRouter/>}/>
//                     <Route path="*" element={<SupervisorRoutes/>}/>
//                     {/* 역할에 따른 페이지 구성 분리 및 접근 제한 */}
//                     <Route element={PrivateRoleRoute("COMPANY")}></Route>
//                     <Route element={PrivateRoleRoute("SUPERVISOR")}></Route>

//                     <Route element={PrivateRoleRoute("MANAGER")}></Route>

//                     <Route element={PrivateRoleRoute("INSTRUCTOR")}></Route>
//                 </Route>
//             </Route>
//         </Routes>
//     );
// }

export default Render;
