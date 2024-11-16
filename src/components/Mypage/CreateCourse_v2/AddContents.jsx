import { FaPlus } from "react-icons/fa6";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

async function uploadFile( curriculumId, courseId, institutionId, idx ) {
  const fileInput = document.getElementById(`fileInput-${idx}`);
  const file = fileInput?.files[0];

  if (!file) {
    alert("파일을 선택해 주세요.");
    return;
  }

  const progressBar = document.getElementById(`uploadProgress-${idx}`);
  progressBar.style.display = "block";

  try {
    const encodedFileName = btoa(unescape(encodeURIComponent(file.name)));
    const requestBody = {
      curriculumId,
      courseId,
      institutionId,
      idx,
      fileName: encodedFileName,
      contentType: file.type,
    };

    const urlResponse = await fetch(
      "https://38r524s3r0.execute-api.ap-south-1.amazonaws.com/dev/api/files/upload",
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

    document.getElementById(`uploadResult-${idx}`).innerText = "업로드 완료!";
  } catch (error) {
    document.getElementById(
      `uploadResult-${idx}`
    ).innerText = `업로드 실패: ${error.message}`;
  } finally {
    progressBar.style.display = "none";
  }
}

function AddContents({ idx, curriculumId, courseId, institutionId, onAdd }) {
  return (
    <div className="create-course-card">
      {idx === null ? (
        <FaPlus className="plus-icon" onClick={onAdd} />
      ) : (
        <div className="AddContentsContainer">
          <div className="upload-area">
            <input type="file" id={`fileInput-${idx}`} /> {/* id에 idx 포함 */}
            <button
              onClick={() => uploadFile(curriculumId, courseId, institutionId, idx)} // 콜백 함수로 수정
              id="uploadButton"
            >
              업로드
            </button>
          </div>
          <div
            id={`uploadProgress-${idx}`} // id에 idx 포함
            className="progress-bar"
            style={{ display: "none" }}
          >
            <div className="progress">업로드 중...</div>
          </div>
          <div id={`uploadResult-${idx}`} className="result"></div>{" "}
          {/* id에 idx 포함 */}
        </div>
      )}
    </div>
  );
}

export default AddContents;
