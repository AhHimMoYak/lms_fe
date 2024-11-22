import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

function GetContents({ idx, originalFileName, uploadedAt, content, onDelete }) {
  console.log(content.contentId);

  const handleDeleteClick = () => {
    if (window.confirm(`${originalFileName}을 삭제하시겠습니까?`)) {
      onDelete(content.contentId, idx);
      console.log(content.contentId);
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
          <div className="contentTitleContainer">
            {content.contentTitle}
          </div>{" "}
          {/* contentTitle 추가 */}
          <div className="contentTypeContainer">{content.contentType}</div>{" "}
          {/* contentType 추가 */}
          <div className="s3UrlContainer">
            <a href={content.s3Url} target="_blank" rel="noopener noreferrer">
              {content.s3Url}
            </a>
          </div>{" "}
          {/* s3Url 추가, 링크로 클릭 가능하게 */}
          <div className="dateContainer">{uploadedAt}</div>
        </div>
      </div>
    </div>
  );
}

export default GetContents;
