import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

function GetContents({ idx, originalFileName, uploadedAt }) {
  // function GetContents() {
  // const idx = 1;
  // const originalFileName = "하하하";
  // const uploadedAt = "2022-05-03";

  return (
    <div className="create-course-card">
      <div className="x-icon">
        <MdOutlineClose />
      </div>
      <div className="getContentsContainer">
        <div className="idxContainer">{idx}</div>
        <div className="fileInfoContainer">
          <div className="fileNameContainer">{originalFileName}</div>
          <div className="dateContainer">{uploadedAt}</div>
        </div>
      </div>
    </div>
  );
}

export default GetContents;
