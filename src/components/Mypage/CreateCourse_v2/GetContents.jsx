import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

function GetContents({ idx, originalFileName, uploadedAt, content, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`${originalFileName}을 삭제하시겠습니까?`)) {
      onDelete(content.idx, idx);
    }
  };

  return (
    <div className="create-course-card">
      <div className="x-icon" onClick={handleDeleteClick}>
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
