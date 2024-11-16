import { useState } from "react";
import AddContents from "./AddContents";

function CreateCourse_v2() {
  const curriculumId = 1;
  const courseId = 1;
  const institutionId = 1;
  const [contents, setContents] = useState([{ id: 0, idx: null }]);

  const handleAddContent = () => {
    setContents((prevContents) => [
      ...prevContents,
      { id: prevContents.length, idx: null }, 
    ]);
  };

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
      {contents.map((content) => (
        <AddContents
          key={content.id}
          idx={content.idx}
          curriculumId={curriculumId}
          courseId={courseId}
          institutionId={institutionId}
          onAdd={() => {
            handleAssignIdx(content.id);
            handleAddContent();
          }}
        />
      ))}
    </>
  );
}

export default CreateCourse_v2;
