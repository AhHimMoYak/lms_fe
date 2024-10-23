import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Employee/Dashboard";
import MypageFrame from "./components/Employee/MypageFrame";

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
import LiveDetailedFrame from "./components/Employee/Courses/CourseListFrame";
import LiveDetaild from "./pages/Employee/LiveDetaild";
import VideoStream from "./pages/Employee/VideoStream";
import LiveStream from "./pages/Employee/LiveStream";
import QnATotalList from "./pages/Employee/QnATotalList";
import InquiryFrame from "./components/Employee/Inquiry/InquiryFrame";
import ReceiveInquiry from "./pages/Employee/ReceiveInquiry";
import InquiryDetailed from "./pages/Employee/InquiryDetailed";
import InquiryEdit from "./pages/Employee/InquiryEdit";
import InquiryPost from "./pages/Employee/InquiryPost";
import QnAListFrame from "./components/Employee/Courses/QnAListFrame";

const EmployeeRouter = () => (
  <Routes>
    <Route element={<MypageFrame />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="applied/*" element={<CourseListFrame />}>
        <Route path="" element={<CourseList />} />
        <Route path="live" element={<LiveList />} />
      </Route>
      <Route path="completed/*" element={<CourseListFrame />}>
        <Route path="" element={<CourseList />} />
        <Route path="live" element={<LiveList />} />
      </Route>

      <Route path="course/:courseId/*" element={<CourseDetailedFrame />}>
        <Route path="" element={<CourseDetailed />} />
        <Route path="detail" element={<CourseDetailed />} />
        {/* qna?page = {number}&own=true */}
        <Route path="qna" element={<QnAListFrame />}>
            <Route path="questions" element={<QnAList />}/>
            <Route path=":courseBoardId" element={<QnADetailed />}/>
            <Route path="edit" element={<QnAEdit />} />
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
  </Routes>
);

export default EmployeeRouter;
