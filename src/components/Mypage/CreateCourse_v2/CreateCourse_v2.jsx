import { useState } from "react";
import AddContents from "./AddContents";

function CreateCourse_v2() {
  const curriculumId = 1; // 임의로 설정한 값
  const courseId = 1; // 임의로 설정한 값

  const [contents, setContents] = useState([{ id: 0, idx: null }]);

  const handleAddContent = () => {
    // 새 컴포넌트를 추가 (기본값 idx는 null)
    setContents((prevContents) => [
      ...prevContents,
      { id: prevContents.length, idx: null }, // 새로운 id 생성
    ]);
  };

  const handleAssignIdx = (id) => {
    // 클릭된 콘텐츠에 idx를 할당
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
              ...content,
              idx: prevContents.filter((c) => c.idx !== null).length + 1, // 이미 할당된 idx의 개수 사용
            }
          : content
      )
    );
  };

  return (
    <>
      <h1>CreateCourse_v2</h1>
      {contents.map((content) => (
        <AddContents
          key={content.id}
          idx={content.idx}
          curriculumId={curriculumId} // curriculumId 전달
          courseId={courseId} // courseId 전달
          onAdd={() => {
            handleAssignIdx(content.id); // 클릭한 아이템의 idx 부여
            handleAddContent(); // 새로운 컴포넌트 추가
          }}
        />
      ))}
    </>
  );
}

export default CreateCourse_v2;
