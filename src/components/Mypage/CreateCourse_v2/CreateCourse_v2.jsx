import { useState } from "react";
import AddContents from "./AddContents";

function CreateCourse_v2() {
  const [contents, setContents] = useState([{ id: 0, idx: null }]);

  const handleAddContent = () => {
    // 새 컴포넌트 추가 (idx는 null로 설정)
    setContents((prevContents) => [
      ...prevContents,
      { id: prevContents.length, idx: null },
    ]);
  };

  const handleAssignIdx = (id) => {
    // 클릭한 id에 대해 idx를 부여
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
              ...content,
              idx: prevContents.filter((c) => c.idx !== null).length, // 기존에 할당된 idx를 제외한 개수만큼 idx 부여
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
          onAdd={() => {
            handleAssignIdx(content.id); // 클릭한 아이템에 idx 부여
            handleAddContent(); // 새로운 컴포넌트 추가
          }}
        />
      ))}
    </>
  );
}

export default CreateCourse_v2;
