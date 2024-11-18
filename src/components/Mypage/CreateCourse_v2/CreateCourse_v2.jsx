import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";
import UploadContents from "./UploadContents";
import GetContents from "./GetContents";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function CreateCourse_v2() {
  const { curriculumId, courseId } = useParams();
  const institutionId = 1; // 나중에 받아오는 방법 수정 필요
  const [contents, setContents] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false); // Upload visibility

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(
          BASE_URL + `/courses/${courseId}/curriculums/${curriculumId}/contents`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contents");
        }
        const data = await response.json();
        setContents(data.result || []);
        console.log(data.result);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, [curriculumId, courseId]);

  // 콘텐츠를 추가하는 함수
  const handleAddContent = () => {
    setContents((prevContents) => [
      ...prevContents,
      { id: prevContents.length, idx: prevContents.length + 1 },
    ]);
  };

  // idx를 할당하는 함수
  const handleAssignIdx = (id) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
              ...content,
              idx: prevContents.filter((c) => c.idx !== null).length + 1,
            }
          : content
      )
    );
  };

  // + 버튼을 눌렀을 때 UploadContents를 표시
  const handleShowUpload = () => {
    setIsUploadVisible(true);
  };

  const handleUploadComplete = () => {
    console.log("업로드가 완료되었습니다.");
  };

  return (
    <>
      <h1>CreateCourse_v2</h1>

      {/* 콘텐츠 항목을 렌더링 */}
      {contents.map((content) => (
        <div key={content.id}>
          <GetContents
            idx={content.idx}
            curriculumId={curriculumId}
            courseId={courseId}
            institutionId={institutionId}
            originalFileName={content.originalFileName}
            uploadedAt={content.createdAt}
            content={content}
            onAdd={() => {
              handleAssignIdx(content.id);
              handleAddContent();
            }}
          />
        </div>
      ))}

      {/* UploadContents와 AddContents를 동시에 표시 */}
      {isUploadVisible && (
        <UploadContents
          idx={contents.length + 1} // 배열 길이 + 1로 idx 동적 설정
          curriculumId={curriculumId}
          courseId={courseId}
          institutionId={institutionId}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {/* 항상 AddContents 버튼 표시 */}
      <AddContents
        idx={null}
        curriculumId={curriculumId}
        courseId={courseId}
        institutionId={institutionId}
        onAdd={handleShowUpload} // + 버튼을 눌렀을 때 handleShowUpload 호출
      />
    </>
  );
}

export default CreateCourse_v2;
