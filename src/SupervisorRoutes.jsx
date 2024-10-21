import { Route, Routes } from "react-router-dom";

import MypageFrame from "./components/Employee/MypageFrame";
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
import NoticeDetailed from "./pages/Employee/NoticeDetailed";
import InquiryFrame from "./components/Employee/Inquiry/InquiryFrame";
import ReceiveInquiry from "./pages/Employee/ReceiveInquiry";
import InquiryDetailed from "./pages/Employee/InquiryDetailed";
import InquiryEdit from "./pages/Employee/InquiryEdit";
import InquiryPost from "./pages/Employee/InquiryPost";

const SupervisorRoutes = () => (
  <Routes>
    <Route element={<MypageFrame />}>
      <Route path="status" element={<SuperDashboard />} />
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
  </Routes>
);

export default SupervisorRoutes;
