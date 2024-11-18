import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function CreateCourse_v2() {
  const { curriculumId, courseId } = useParams();
  const institutionId = 1; // 나중에 받아오는 방법 수정 필요
  const [contents, setContents] = useState([]);

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

  return (
    <>
      <h1>CreateCourse_v2</h1>

      {/* 콘텐츠 항목을 렌더링 */}
      {contents.map((content, index) => (
        <div key={content.id}>
          <AddContents
            idx={content.idx}
            curriculumId={curriculumId}
            courseId={courseId}
            institutionId={institutionId}
            content={content}
            onAdd={() => {
              handleAssignIdx(content.id);
              handleAddContent();
            }}
          />

          {/* 마지막 콘텐츠 항목에 + 버튼 추가 */}
          {index === contents.length - 1 && content.idx !== null && (
            <AddContents
              key="add-button"
              idx={null}
              curriculumId={curriculumId}
              courseId={courseId}
              institutionId={institutionId}
              content={content}
              onAdd={handleAddContent}
            />
          )}
        </div>
      ))}

      {/* 콘텐츠가 없으면 AddContents를 추가 */}
      {contents.length === 0 && (
        <AddContents
          key="add-button"
          idx={null}
          curriculumId={curriculumId}
          courseId={courseId}
          institutionId={institutionId}
          onAdd={handleAddContent}
        />
      )}
    </>
  );
}

export default CreateCourse_v2;
