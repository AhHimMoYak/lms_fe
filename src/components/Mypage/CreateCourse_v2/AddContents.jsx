import { FaPlus } from "react-icons/fa6";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

async function uploadFile() {
  alert("업로드 버튼 클릭");
}

function AddContents({ idx, onAdd }) {
  return (
    <div className="create-course-card">
      {idx === null ? (
        <FaPlus className="plus-icon" onClick={onAdd} />
      ) : (
        <div className="AddContentsContainer">
          <div className="upload-area">
            <input type="file" id="fileInput" />
            <button onClick={uploadFile} id="uploadButton">
              업로드
            </button>
          </div>
          <div id="uploadProgress" className="progress-bar">
            <div className="progress">ddd</div>
          </div>
          <div id="uploadResult" className="result"></div>
        </div>
      )}
    </div>
  );
}

export default AddContents;
