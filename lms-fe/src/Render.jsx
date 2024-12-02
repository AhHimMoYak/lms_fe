import { Routes, Route } from "react-router-dom";
import { AuthChecker } from "./authentication/AuthChecker";
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
import CreateCourse from "./pages/Mypage/CreateCourse.jsx";
import CreateCurriculum from "./pages/Mypage/CreateCurriculum.jsx";
import UserInformFrame from "./components/Mypage/UserInformFrame.jsx";
import CreateLive from "./pages/Mypage/CreateLive.jsx";
import ModifyCourse from "./pages/Mypage/ModifyCourse.jsx";
import EducationFrame from "./components/Education/EducationFrame.jsx";
import ManageFrame from "./components/Education/ManageFrame.jsx";
import QuizPost from "./pages/QuizPost.jsx";
import CompanyFrame from "./components/Company/CompanyFrame.jsx";
import EmployeeList from "./pages/Company/EmployeeList.jsx";
import CourseProvideList from "./pages/Company/CourseProvideList.jsx";
import CompanyDetailed from "./components/Company/CompanyDetailed.jsx";
import VideoPlayer from "./pages/Mypage/VideoPlayer.jsx";
import BoardList from "./pages/Mypage/BoardList.jsx";
import BoardPost from "./pages/Mypage/BoardPost.jsx";
import BoardDetailed from "./pages/Mypage/BoardDetailed.jsx";
import BoardEdit from "./pages/Mypage/BoardEdit.jsx";
import BoardTotalList from "./pages/Mypage/BoardTotalList.jsx";
import BoardTotalFrame from "./components/Education/BoardTotalFrame.jsx";
import BoardListTotal from "./pages/Mypage/BoardListTotal.jsx";
import ManagementPage from "./pages/Mypage/ManagementPage.jsx";
import InstitutionPage from "./pages/Mypage/InstitutionPage.jsx";
import AnswerQuiz from "./pages/Quiz/AnswerQuiz.jsx";
import EmployeeDetailed from "./pages/Company/EmployeeDetailed.jsx";
import CreateExam from "./pages/Quiz/CreateExam.jsx";
import ExamDetail from "./pages/Quiz/ExamDetail.jsx";
import UpdateExam from "./pages/Quiz/UpdateExam.jsx";
import ExamList from "./pages/Quiz/ExamList.jsx";
import CreateCompany from "./pages/Mypage/CreateCompany.jsx";
import SubmitEmployeeList from "./pages/Company/SubmitEmployeeList.jsx";
import CompanyEdit from "./pages/Company/CompanyEdit.jsx";
import EmployeeAffiliation from "./pages/Company/EmployeeAffiliation.jsx";
import QuizFormFrame from "./pages/Quiz/QuizFormFrame.jsx";
import CreateCourse_v2 from "./components/Mypage/CreateCourse_v2/CreateCourse_v2.jsx";

function Render() {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/stream/videos" element={<VideoPlayer />} />

      <Route element={<BasicFrame />}>
        <Route path="/" element={<Main />} />
        <Route
          path="/courses/:courseId/curriculums/:curriculumId/contents"
          element={<CreateCourse_v2 />}
        />
        <Route path="courses" element={<Video />} />
        <Route path="/courses/:courseId" element={<VideoExplain />} />
        <Route path="/lives/:streamkey" element={<LiveStream />} />

        <Route element={<AuthChecker />}>
          <Route path="mypage/*" element={<MypageFrame />}>
            <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="institutions" element={<InstitutionPage />} />

            <Route path="courses/:courseId" element={<CourseFrame />}>
              <Route path="" element={<CourseDetailed />} />
              <Route path="contents" element={<CourseDetailed />} />
              <Route path="lives" element={<LiveDetail />} />

              <Route path="boards/:type" element={<BoardList />} />
              <Route path="boards/:type/post" element={<BoardPost />} />
              <Route path="boards/:type/:boardId" element={<BoardDetailed />} />
              <Route path="boards/:boardId/edit" element={<BoardEdit />} />
            </Route>
            <Route path="qna" element={<BoardTotalList />} />

            <Route path="users/*" element={<UserInformFrame />}>
              <Route path="" element={<PasswordPrompt />} />
              <Route path="reconfirm" element={<PasswordPrompt />} />
              <Route path="update" element={<UpdateUser />} />
            </Route>

            <Route path=":courseId/exams" element={<QuizFormFrame />}>
              <Route path="" element={<ExamList />} />
              <Route path="create" element={<CreateExam />} />
              <Route path=":examId" element={<ExamDetail />} />
              <Route path=":examId/update" element={<UpdateExam />} />
              <Route path=":examId/answer" element={<AnswerQuiz />} />
            </Route>
          </Route>

          {/* -----------------------------------------교육기관 페이지 라우팅 ------------------------------------- */}

          <Route path="educations/*" element={<EducationFrame />}>
            <Route path="" element={<Dashboard />} />
            <Route path="dashboards" element={<Dashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="managements" element={<ManagementPage />} />
            <Route path="manage/*" element={<ManageFrame />}>
              <Route path="courses/create" element={<CreateCourse />} />
              <Route
                path=":courseId/curriculums/create"
                element={<CreateCurriculum />}
              />        <Route
                path="courses/:courseId/curriculums/:curriculumId/contents"
                element={<CreateCourse_v2 />}
            />
            </Route>

            <Route path="courses/:courseId" element={<CourseFrame />}>
              <Route path="" element={<CourseDetailed />} />
              <Route path="contents" element={<CourseDetailed />} />
              <Route path="modify" element={<ModifyCourse />} />

              <Route path="lives" element={<LiveDetail />} />
              <Route path="lives/create" element={<CreateLive />} />
              <Route path="lives/:liveId/quiz" element={<QuizPost />} />

              <Route path="boards/:type" element={<BoardList />} />
              <Route path="boards/:type/post" element={<BoardPost />} />
              <Route path="boards/:type/:boardId" element={<BoardDetailed />} />
              <Route path="boards/:boardId/edit" element={<BoardEdit />} />
            </Route>
            <Route path="boards/*" element={<BoardTotalFrame />}>
              <Route path=":type" element={<BoardListTotal />} />
            </Route>

            <Route path="users/*" element={<UserInformFrame />}>
              <Route path="" element={<PasswordPrompt />} />
              <Route path="reconfirm" element={<PasswordPrompt />} />
              <Route path="update" element={<UpdateUser />} />
            </Route>
          </Route>

          {/* -----------------------------------------회사 페이지 라우팅 ------------------------------------- */}

          <Route path="companys/*" element={<CompanyFrame />}>
            <Route path="" element={<CompanyDetailed />} />
            <Route path="create" element={<CreateCompany />} />
            <Route path="employees/*" element={<EmployeeList />} />
            <Route path="employees/info" element={<EmployeeDetailed />} />
            <Route
              path="employees/affiliations"
              element={<EmployeeAffiliation />}
            />
            <Route path="course-provides/list" element={<CourseProvideList />} />
            <Route
              path="course-provides/submit"
              element={<SubmitEmployeeList />}
            />
            <Route path="info" element={<CompanyDetailed />} />
            <Route path="edit" element={<CompanyEdit />} />
            <Route path="users/*" element={<UserInformFrame />}>
              <Route path="" element={<PasswordPrompt />} />
              <Route path="reconfirm" element={<PasswordPrompt />} />
              <Route path="update" element={<UpdateUser />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Render;
