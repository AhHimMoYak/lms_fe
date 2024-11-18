import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function CreateCourse_v2() {
  const { curriculumId, courseId } = useParams();
  const institutionId = 1; // 나중에 받아오는 방법 수정 필요
  const [contents, setContents] = useState([{ id: 0, idx: null }]);

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, [curriculumId, courseId]);

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
