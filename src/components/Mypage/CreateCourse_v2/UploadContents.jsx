import { MdOutlineClose } from "react-icons/md";
import { useState, useRef } from "react";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

const BASE_URL =
  "https://ybgtg9e2mj.execute-api.ap-south-1.amazonaws.com/dev/api";

function UploadContents({
  idx,
  curriculumId,
  courseId,
  institutionId,
  onUploadComplete,
}) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  const uploadFile = async () => {
    const fileInput = document.getElementById(`fileInput-${idx}`);
    const file = fileInput?.files[0];

    if (!file) {
      alert("파일을 선택해 주세요.");
      return;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    if (progressTextRef.current) {
      progressTextRef.current.innerText = "업로드 중... 0%";
    }

    try {
      // Step 1: 서버에서 presigned URL과 contentId 받아오기
      const encodedFileName = btoa(unescape(encodeURIComponent(file.name)));
      const requestBody = {
        curriculumId,
        courseId,
        institutionId,
        idx,
        fileName: encodedFileName,
        contentType: file.type,
      };

      const urlResponse = await fetch(BASE_URL + "/v1/files/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!urlResponse.ok) {
        const errorData = await urlResponse.json();
        throw new Error(errorData.error || "Pre-signed URL 생성 실패");
      }

      const { uploadUrl, contentId } = await urlResponse.json();

      // Step 2: 파일 업로드 진행
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
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
            const date = new Date();
            const formattedDate = date.toISOString().split("T")[0];

            // contentId와 함께 newContent 생성
            const newContent = {
              id: Date.now(),
              idx: idx,
              contentId,
              originalFileName: file.name,
              createdAt: formattedDate,
            };

            onUploadComplete(newContent);
          }
        } else {
          alert(`업로드 실패: ${xhr.responseText}`);
        }
      };

      xhr.onerror = function () {
        alert("업로드 실패: 네트워크 오류");
      };

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
