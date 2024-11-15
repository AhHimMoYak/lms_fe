import { FaPlus } from "react-icons/fa6";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("파일을 선택해 주세요.");
    return;
  }

  const progressBar = document.getElementById("uploadProgress");
  progressBar.style.display = "block";

  try {
    const encodedFileName = btoa(unescape(encodeURIComponent(file.name)));
    const requestBody = {
      fileName: encodedFileName,
      contentType: file.type,
    };

    const urlResponse = await fetch(
      "https://l7usz5nnr9.execute-api.ap-south-1.amazonaws.com/dev/api/files/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const urlData = await urlResponse.json();

    if (!urlResponse.ok) {
      throw new Error(urlData.error || "Pre-signed URL 생성 실패");
    }

    const uploadResponse = await fetch(urlData.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("파일 업로드 실패");
    }

    document.getElementById("uploadResult").innerText = "업로드 완료!";
  } catch (error) {
    document.getElementById(
      "uploadResult"
    ).innerText = `업로드 실패: ${error.message}`;
  } finally {
    progressBar.style.display = "none";
  }
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
          <div
            id="uploadProgress"
            className="progress-bar"
            style={{ display: "none" }}
          >
            <div className="progress">업로드 중...</div>
          </div>
          <div id="uploadResult" className="result"></div>
        </div>
      )}
    </div>
  );
}

export default AddContents;
