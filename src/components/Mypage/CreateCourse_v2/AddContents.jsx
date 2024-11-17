import { FaPlus } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";
import { useState } from "react";

const BASE_URL = "https://6tg2ehnjv9.execute-api.ap-south-1.amazonaws.com/dev/api/files/upload"

async function uploadFile(curriculumId, courseId, institutionId, idx, setIsUploaded, setUploadedFileName) {
  const fileInput = document.getElementById(`fileInput-${idx}`);
  const file = fileInput?.files[0];

  if (!file) {
    alert("파일을 선택해 주세요.");
    return;
  }

  const progressBar = document.getElementById(`uploadProgress-${idx}`);
  const progressText = document.getElementById(`uploadProgressText-${idx}`);
  progressBar.style.display = "block";

  const xhr = new XMLHttpRequest();
  xhr.open("POST", BASE_URL, true);

  // 업로드 상태 변경
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      const percent = (event.loaded / event.total) * 100;
      progressBar.style.width = `${percent}%`;
      progressText.innerText = `업로드 중... ${Math.round(percent)}%`;
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      setUploadedFileName(file.name);
      document.getElementById(`uploadResult-${idx}`).innerText = `${file.name}\n업로드 완료!`;
      setIsUploaded(true);
    } else {
      document.getElementById(
        `uploadResult-${idx}`
      ).innerText = `업로드 실패: ${xhr.responseText}`;
    }
    progressBar.style.display = "none";
  };

  xhr.onerror = function () {
    document.getElementById(
      `uploadResult-${idx}`
    ).innerText = `업로드 실패: 네트워크 오류`;
    progressBar.style.display = "none";
  };

  const encodedFileName = btoa(unescape(encodeURIComponent(file.name)));
  const requestBody = {
    curriculumId,
    courseId,
    institutionId,
    idx,
    fileName: encodedFileName,
    contentType: file.type,
  };

  try {
    const urlResponse = await fetch(
      BASE_URL,
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

    xhr.open("PUT", urlData.uploadUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  } catch (error) {
    document.getElementById(
      `uploadResult-${idx}`
    ).innerText = `업로드 실패: ${error.message}`;
    progressBar.style.display = "none";
  }
}

function AddContents({ idx, curriculumId, courseId, institutionId, onAdd }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  return (
    <div className="create-course-card">
      <div className="x-icon">
        <MdOutlineClose />
      </div>
      {idx === null ? (
        <FaPlus className="plus-icon" onClick={onAdd} />
      ) : (
        <div className="AddContentsContainer">
          <div className="upload-area">
            {!isUploaded && (
              <>
                <input type="file" id={`fileInput-${idx}`} />
                <button
                  onClick={() => uploadFile(curriculumId, courseId, institutionId, idx, setIsUploaded, setUploadedFileName)}
                  id="uploadButton"
                >
                  업로드
                </button>
              </>
            )}
            <div className="progress-bar-container">
              <div
                id={`uploadProgress-${idx}`}
                className="progress-bar"
                style={{ width: "0%" }}
              ></div>
              <div id={`uploadProgressText-${idx}`} className="progress-text">업로드 중...</div>
            </div>
          </div>
          <div
            id={`uploadProgress-${idx}`}
            className="progress-bar"
            style={{ width: "0%", display: "none" }}
          >
            <div id={`uploadProgressText-${idx}`} className="progress-text">업로드 중...</div>
          </div>
          <div id={`uploadResult-${idx}`} className="result">
            {uploadedFileName && !isUploaded ? (
              `업로드 진행 중: ${uploadedFileName}`
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddContents;
