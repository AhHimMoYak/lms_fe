import { MdOutlineClose } from "react-icons/md";
import { useState, useRef } from "react";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function UploadContents({
  idx,
  curriculumId,
  courseId,
  institutionId,
  onUploadComplete,
}) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const progressBarRef = useRef(null); // useRef로 참조
  const progressTextRef = useRef(null); // 진행 상태 텍스트를 관리할 ref

  const uploadFile = async () => {
    const fileInput = document.getElementById(`fileInput-${idx}`);
    const file = fileInput?.files[0];

    if (!file) {
      alert("파일을 선택해 주세요.");
      return;
    }

    // 진행 상태 초기화
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    if (progressTextRef.current) {
      progressTextRef.current.innerText = "업로드 중... 0%";
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL + "/api/files/upload", true);

    // 업로드 진행 상태 업데이트
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        // ref를 사용하여 DOM 업데이트
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percent}%`;
        }
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `업로드 중... ${Math.round(
            percent
          )}%`;
        }
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        setUploadedFileName(file.name);
        setIsUploaded(true);

        if (onUploadComplete) {
          onUploadComplete();
        }
      } else {
        alert(`업로드 실패: ${xhr.responseText}`);
      }
    };

    xhr.onerror = function () {
      alert("업로드 실패: 네트워크 오류");
    };

    // API 호출을 위한 요청 데이터
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
      alert(`업로드 실패: ${error.message}`);
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
              <button onClick={uploadFile}>업로드</button>
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
              ref={progressBarRef}
              className="progress-bar"
              style={{ width: "0%" }}
            ></div>
            <div ref={progressTextRef} className="progress-text">
              업로드 중... 0%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadContents;
