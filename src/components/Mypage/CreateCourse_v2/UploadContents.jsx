import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function UploadContents({ idx, curriculumId, courseId, institutionId }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const uploadFile = async () => {
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
    xhr.open("POST", BASE_URL + "/api/files/upload", true); // URL을 API로 수정

    // 업로드 상태 변경
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        progressBar.style.width = `${percent}%`;
        progressText.innerText = `업로드 중... ${Math.round(percent)}%`;
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        setUploadedFileName(file.name);
        document.getElementById(
          `uploadResult-${idx}`
        ).innerText = `${file.name}\n업로드 완료!`;
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

    // API 호출 등의 추가 로직 필요
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
      const urlResponse = await fetch(BASE_URL + "/api/files/upload", {
        // URL을 실제 API로 수정
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

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
  };

  return (
    <div className="create-course-card">
      <div className="x-icon">
        <MdOutlineClose />
      </div>
      <div className="AddContentsContainer">
        <div className="upload-area">
          {!isUploaded && (
            <>
              <input type="file" id={`fileInput-${idx}`} />
              <button
                onClick={uploadFile} // uploadFile 함수 호출
                id="uploadButton"
              >
                업로드
              </button>
            </>
          )}
          {isUploaded && (
            <div className="upload-complete">
              <p>{uploadedFileName}</p>
              <p>업로드 완료!</p>
            </div>
          )}
          <div className="progress-bar-container">
            <div
              id={`uploadProgress-${idx}`}
              className="progress-bar"
              style={{ width: "0%" }}
            ></div>
            <div id={`uploadProgressText-${idx}`} className="progress-text">
              업로드 중...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadContents;
