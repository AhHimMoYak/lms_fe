import {Route, Routes} from "react-router-dom";
import CourseNavigation from "../../components/course/CourseNavigation.jsx";
import Lecture from "./Lecture.jsx";
import LiveList from "./LiveList.jsx";
import NoticeBoard from "./NoticeBoard.jsx";
import QnABoard from "./QnABoard.jsx";
import NoticeDetail from "./NoticeDetail.jsx";
import QnADetail from "./QnADetail.jsx";
import ContentViewer from "./ContentViewer.jsx";
import ExamList from "./ExamList.jsx";
import ExamTaking from "./ExamTaking.jsx";
import ExamReview from "./ExamReview.jsx";
import QnAForm from "./QnAForm.jsx";

const Course = () => {


  return (
    <>
      <CourseNavigation />
      <div className="ml-40 mt-10">
        <Routes>
          <Route path="curriculum" element={<Lecture/>}/>
          <Route path="curriculum/:curriculumId/content/:contentId" element={<ContentViewer/>}/>

          <Route path="live" element={<LiveList/>}/>

          <Route path="notice" element={<NoticeBoard/>}/>
          <Route path="notice/:noticeId" element={<NoticeDetail/>}/>

          <Route path="qna" element={<QnABoard/>}/>
          <Route path="qna/:qnaId" element={<QnADetail/>}/>
          <Route path="qna/write" element={<QnAForm/>}/>

          <Route path="exam" element={<ExamList/>}/>
          <Route path="exam/:examId" element={<ExamTaking/>}/>
          <Route path="exam/:examId/review" element={<ExamReview/>}/>
        </Routes>
      </div>
    </>
  )
};

export default Course;