import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";
import UploadContents from "./UploadContents";
import GetContents from "./GetContents";

const BASE_URL = "https://i0j27qlso0.execute-api.ap-south-1.amazonaws.com/dev";

function CreateCourse_v2() {
  const { curriculumId, courseId } = useParams();
  const institutionId = 1;
  const [contents, setContents] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false);

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

  const handleAddContent = (newContent) => {
    setContents((prevContents) => [...prevContents, newContent]);
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

  const handleShowUpload = () => {
    setIsUploadVisible(true);
  };

  const handleUploadComplete = (newContent) => {
    console.log("업로드가 완료되었습니다.");
    handleAddContent(newContent);
    setIsUploadVisible(false);
  };

  return (
    <>
      <h1>CreateCourse_v2</h1>
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
      {isUploadVisible && (
        <UploadContents
          idx={contents.length + 1}
          curriculumId={curriculumId}
          courseId={courseId}
          institutionId={institutionId}
          onUploadComplete={handleUploadComplete}
        />
      )}
      <AddContents
        idx={null}
        curriculumId={curriculumId}
        courseId={courseId}
        institutionId={institutionId}
        onAdd={handleShowUpload}
      />
    </>
  );
}

export default CreateCourse_v2;
