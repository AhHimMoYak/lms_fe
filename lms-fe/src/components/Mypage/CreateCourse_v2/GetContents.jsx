import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};

function GetContents({ idx, originalFileName, fileSize, uploadedAt, content, onDelete }) {
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
          <div className="fileSizeContainer">파일 사이즈 : {formatFileSize(fileSize)}</div>
          <div>영상 길이 : {content.videoDuration}</div>
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
