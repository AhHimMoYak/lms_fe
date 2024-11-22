import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

function GetContents({ idx, originalFileName, uploadedAt, content, onDelete }) {
  const handleDeleteClick = () => {
    if (window.confirm(`${originalFileName}을 삭제하시겠습니까?`)) {
      onDelete(content.contentId, idx);
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
          <div className="contentTitleContainer">{content.contentTitle}</div>
          <div className="fileNameContainer">파일명 : {originalFileName}</div>
          <div className="contentTypeContainer">
            <a href={content.s3Url} target="_blank" rel="noopener noreferrer">
              {content.contentType}
            </a>
          </div>
          <div className="dateContainer">{uploadedAt}</div>
        </div>
      </div>
    </div>
  );
}

export default GetContents;