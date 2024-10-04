import { Routes, Route } from "react-router-dom";
import { AuthChecker } from "./authentication/AuthChecker";
import Mypage from "./pages/Mypage";
import PrivateRoleRoute from "./authentication";

function Render() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/coporate/registration" element={<CoporateRegistration/>} />
      <Route path="/institution/registration" element={<InstitutionRegistration/>} />
      <Route path="/instructor/registration" element={<InstructorRegistration/>} />

      <Route path="/courses/*" element={<Course/>} >
        <Route path="/video" element={< Video/>} /> type(default total, categoryname) page
        <Route path="/live" element={<Live/>} /> type(default total, categoryname) page
        <Route path="/introduction/*" element={<Introduction/>} >
          <Route path="/video/:course_uuid" element={<VideoDetail/>} />
          <Route path="/live/:course_uuid" element={<LiveDetail/>} />
        </Route>
      </Route>
      

      <Route element={<AuthChecker/>} >
        <Route path="/mypage/*" element={<Mypage/>}>
        <Route path="/setting/*" element={<Setting/>} >
          <Route index element={<Vertified/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/password" element={<PasswordChange/>} />
        </Route>
        <Route element={<PrivateRoleRoute roles={['EMPLOYEE']}/>} >
          <Route path="/users/*" element={<UserMypage/>} >
            <Route path="/courses/applied" element={<MyCourseList/>} />  

            <Route path="/courses/:uuid/*" element={<1/>} >
              <Route index element={<ContentList/>} />
              <Route path="qna" element={<QnAList/>} /> page ,own(default false, true)
              <Route path="qna/:board_uuid" element={<QnADetail/>} />
              <Route path="qna/:board_uuid/edit" element={<QnAEditor/>} />
              <Route path="qna/post" element={<UploadQnA/>} />

              <Route path="notice" element={<NoticeList/>} /> page
              <Route path="notice/:board_uuid" element={<NoticeDetail/>} />
              <Route path="notice/:board_uuid/edit" element={<NoticeEditor/>} />
              <Route path="notice/post" element={<UploadNotice/>} />

              <Route path="live/applied" element={<MyLiveList/>} />
              <Route path="live/:id" element={<LiveDetail/>} />  
              <Route path="live/:id/start" element={<LiveStream/>} /> key      
            </Route>
            
            <Route path="/courses/:uuid/lecture" element={<Contents/>} /> src

            <Route path="qna/own" element={<MyQnAList/>} />
            <Route path="qna/:courseid" element={<QnADetail/>} />
            <Route path="qna/:courseid/post" element={<QnAEditor/>} />  
            

          </Route>
          
        </Route>
        <Route element={<PrivateRoleRoute roles={['SUPERVISOR']}/>} >


        </Route>
        <Route element={<PrivateRoleRoute roles={['MANAGER']}/>} >


        </Route>
        <Route element={<PrivateRoleRoute roles={['INSTRUCTOR']}/>} >


        </Route>
        
        </Route>

        
      
        <Route path="/" element={<Main/>} />
      </Route>
    </Routes>
  );
}

export default Render;
