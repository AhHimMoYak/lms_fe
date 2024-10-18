import { Routes, Route } from "react-router-dom";
import { AuthChecker } from "./authentication/AuthChecker";
import Mypage from "./pages/Mypage";
import { PrivateRoleRoute } from "./authentication/PrivateRoleRoute";
import BasicFrame from "./components/Main/BasicFrame";
import Main from "./pages/Main";
import CourseFrame from "./components/Main/CourseFrame";
import Video from "./pages/Main/Video";
import Live from "./pages/Main/Live";
import IntrodcutionFrame from "./components/Main/IntroductionFrame";
import VideoExplaine from "./pages/Main/VideoExplaine";
import LiveExplaine from "./pages/Main/VideoExplaine copy";
import MypageFrame from "./components/Employee/MypageFrame";
import Dashbaord from "./pages/Employee/Dashboard";
import CourseListFrame from "./components/Employee/Courses/CourseListFrame";
import CourseList from "./pages/Employee/CourseList";
import LiveList from "./pages/Employee/LiveList";
import CourseDetailedFrame from "./components/Employee/Courses/CourseDetailedFrame";
import CourseDetailed from "./pages/Employee/CourseDetailed";
import QnAList from "./pages/Employee/QnAList";
import QnADetailed from "./pages/Employee/QnADetailed";
import QnAEdit from "./pages/Employee/QnAEdit";
import QnAPost from "./pages/Employee/QnAPost";
import NoticeList from "./pages/Employee/NoticeList";
import NoticeDetailed from "./pages/Employee/NoticeDetailed";
import LiveDetailedFrame from "./components/Employee/Courses/LiveDetailedFrame copy";
import LiveDetaild from "./pages/Employee/LiveDetaild";
import VideoStream from "./pages/Employee/VideoStream";
import LiveStream from "./pages/Employee/LiveStream";
import QnATotalList from "./pages/Employee/QnATotalList";
import InquiryFrame from "./components/Employee/Inquiry/InquiryFrame";
import ReceiveInquiry from "./pages/Employee/ReceiveInquiry";
import InquiryDetailed from "./pages/Employee/InquiryDetailed";
import InquiryEdit from "./pages/Employee/InquiryEdit";
import InquiryPost from "./pages/Employee/InquiryPost";
import SuperDashboard from "./pages/Supervisor/SuperDashboard";
import ManageFrame from "./components/Supervisor/MypageFrame";
import EmployeeList from "./pages/Supervisor/EmployeeList";
import EmployeeDetailed from "./pages/Supervisor/EmployeeDetailed";
import EnrollmentFrame from "./components/Supervisor/Courses/EnrollmentFrame";
import EnrollmentList from "./pages/Supervisor/EnrollmentList";
import EnrollmentDetailed from "./pages/Supervisor/EnrollmentDetailed";
import CompanyDetailed from "./pages/Supervisor/CompanyDetailed";
import CompanyEdit from "./pages/Supervisor/CompanyEdit";
import DepartmentList from "./pages/Supervisor/DepartmentList";
import DepartmentEdit from "./pages/Supervisor/DepartmentEdit";
import DepartmentPost from "./pages/Supervisor/DepartmentPost";
import ReceiveNotice from "./pages/Supervisor/ReceiveNotice";
import NoticeEdit from "./pages/Supervisor/NoticeEdit";
import NoticePost from "./pages/Supervisor/NoticePost";
import CompanyFrame from "./components/Supervisor/Company/CompanyFrame";

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
      </Route>

      {/* 로그인 사용자 구분 */}
      <Route element={<AuthChecker />}>
        {/* 마이페이지 공통 사용 부분 */}
        <Route path="/mypage/*" element={<Mypage />}>
          {/* 역할에 따른 페이지 구성 분리 및 접근 제한 */}
          <Route element={PrivateRoleRoute("EMPLOYEE")}>
            <Route element={<MypageFrame />}>
              <Route path="dashbard" element={<Dashbaord />} />
              <Route path="applied/*" element={<CourseListFrame />}>
                <Route path="" element={<CourseList />} />
                <Route path="live" element={<LiveList />} />
              </Route>
              <Route path="completed/*" element={<CourseListFrame />}>
                <Route path="" element={<CourseList />} />
                <Route path="live" element={<LiveList />} />
              </Route>

              <Route
                path="course/:courseId/*"
                element={<CourseDetailedFrame />}
              >
                <Route path="" element={<CourseDetailed />} />
                <Route path="detail" element={<CourseDetailed />} />
                {/* qna?page = {number}&own=true */}
                <Route path="qna" element={<QnAList />}>
                  <Route path=":courseId" element={<QnADetailed />}>
                    <Route path="edit" element={<QnAEdit />} />
                  </Route>
                  <Route path="post" element={<QnAPost />} />
                </Route>

                {/* notice?page={number} */}
                <Route path="notice" element={<NoticeList />}>
                  <Route path=":id" element={<NoticeDetailed />} />
                </Route>
              </Route>

              <Route path="live/:courseId/*" element={<LiveDetailedFrame />}>
                <Route path="" element={<LiveDetaild />} />
                <Route path="detail" element={<LiveDetaild />} />
                {/* qna?page = {number}&own=true */}
                <Route path="qna" element={<QnAList />}>
                  <Route path=":courseId" element={<QnADetailed />}>
                    <Route path="edit" element={<QnAEdit />} />
                  </Route>
                  <Route path="post" element={<QnAPost />} />
                </Route>
                {/* notice?page={number} */}
                <Route path="notice" element={<NoticeList />}>
                  <Route path=":id" element={<NoticeDetailed />} />
                </Route>
              </Route>

              {/* lecture?content="" */}
              <Route path="lecture" element={<VideoStream />} />
              <Route path="live" element={<LiveStream />} />

              {/* qna?own=false&page={number} */}
              <Route path="qna" element={<QnATotalList />}>
                <Route path=":courseId" element={<QnADetailed />}>
                  <Route path="edit" element={<QnAEdit />} />
                </Route>
                <Route path="post" element={<QnAPost />} />
              </Route>

              {/* notice?page={number}&type=total(courseId) */}
              <Route path="notice" element={<NoticeList />}>
                {/* notice/:courseId?board={boradId} */}
                <Route path=":courseId" element={<NoticeDetailed />} />
              </Route>

              <Route path="inquiry/*" element={<InquiryFrame />}>
                <Route path="" element={<ReceiveInquiry />} />
                <Route path=":id" element={<InquiryDetailed />}>
                  <Route path="edit" element={<InquiryEdit />} />
                  <Route path="post" element={<InquiryPost />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={PrivateRoleRoute("SUPERVISOR")}>
            <Route element={<MypageFrame />}>
              <Route path="dashboard" element={<SuperDashboard />} />
              <Route path="managed/*" element={<ManageFrame />}>
                <Route path="" element={<EmployeeList />} />
                <Route path=":id" element={<EmployeeDetailed />} />
              </Route>

              {/* courses?type=lecture(live) */}
              <Route path="courses/*" element={<EnrollmentFrame />}>
                <Route path="" element={<EnrollmentList />} />
                <Route path=":id" element={<EnrollmentDetailed />} />
              </Route>

              <Route path="company/*" element={<CompanyFrame />}>
                <Route path=":companyId" element={<CompanyDetailed />}>
                  <Route path="edit" element={<CompanyEdit />} />
                  <Route path="department" element={<DepartmentList />}>
                    <Route path="edit" element={<DepartmentEdit />} />
                    <Route path="post" element={<DepartmentPost />} />
                  </Route>
                </Route>
              </Route>

              {/* notice?page={number}&type=total(courseId) */}
              <Route path="notice/*" element={<noticeFrame />}>
                <Route path="" element={<ReceiveNotice />} />
                <Route path=":id" element={<NoticeDetailed />}>
                  <Route path="edit" element={<NoticeEdit />} />
                  <Route path="post" element={<NoticePost />} />
                </Route>
              </Route>

              <Route path="inquiry/*" element={<InquiryFrame />}>
                <Route path="" element={<ReceiveInquiry />} />
                <Route path=":id" element={<InquiryDetailed />}>
                  <Route path="edit" element={<InquiryEdit />} />
                  <Route path="post" element={<InquiryPost />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={PrivateRoleRoute("MANAGER")}></Route>

          <Route element={PrivateRoleRoute("INSTRUCTOR")}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Render;
