import { MdOutlineClose } from "react-icons/md";
import { useState, useRef } from "react";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

const BASE_URL = "https://api.ahimmoyak.click/builder";

function UploadContents({
  idx,
  curriculumId,
  courseId,
  institutionId,
  onUploadComplete,
  onClose,
}) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  const uploadFile = async () => {
    const fileInput = document.getElementById(`fileInput-${idx}`);
    const file = fileInput?.files[0];

    if (!file) {
      alert("파일을 선택해 주세요.");
      return;
    }

    const fileSize = file.size;

    if (!contentTitle.trim()) {
      alert("콘텐츠 제목을 입력해 주세요.");
      return;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    if (progressTextRef.current) {
      progressTextRef.current.innerText = "업로드 중... 0%";
    }

    try {
      const encodedFileName = btoa(unescape(encodeURIComponent(file.name)));
      
      // 비디오 길이를 추출하고 포맷하기
      const videoDuration = file.type.startsWith("video/") ? await getVideoDuration(file) : null;
      const formattedVideoDuration = videoDuration ? formatDuration(videoDuration) : null;

      const requestBody = {
        curriculumId,
        courseId,
        institutionId,
        idx,
        fileName: encodedFileName,
        contentType: file.type,
        contentTitle,
        fileSize,
        videoDuration: formattedVideoDuration,
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

      const { uploadUrl, contentId, s3Url, contentType, videoDuration: serverVideoDuration } =
        await urlResponse.json(); // videoDuration을 serverVideoDuration으로 변경

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

            const newContent = {
              id: Date.now(),
              idx: idx,
              contentId,
              originalFileName: file.name,
              createdAt: formattedDate,
              contentTitle,
              fileSize,
              s3Url,
              contentType,
              videoDuration: formattedVideoDuration, // 포맷된 비디오 길이
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

  const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video");

      videoElement.onloadedmetadata = function () {
        resolve(videoElement.duration); // 초 단위로 비디오 길이 반환
      };

      videoElement.onerror = function () {
        reject("비디오 길이 추출 실패");
      };

      const objectURL = URL.createObjectURL(file);
      videoElement.src = objectURL;
    });
  };

  // 비디오 길이를 "분:초" 형식으로 포맷하는 함수
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="create-course-card">
      <div className="x-icon" onClick={onClose}>
        {" "}
        {/* 닫기 버튼 동작 */}
        <MdOutlineClose />
      </div>
      <div className="AddContentsContainer">
        <div className="upload-area">
          {!isUploaded && (
            <>
              <input
                type="text"
                id={`contentTitleInput-${idx}`}
                placeholder="콘텐츠 제목을 입력하세요"
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
              />
              <div className="file-upload-area">
                <input type="file" id={`fileInput-${idx}`} />
                <button onClick={uploadFile}>업로드</button>
              </div>
            </>
          )}
          {isUploaded && (
            <div className="upload-complete">
              <p>파일명: {uploadedFileName}</p>
              <p>제목: {contentTitle}</p>
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
