import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";
import UploadContents from "./UploadContents";
import GetContents from "./GetContents";

const BASE_URL =
  "https://82go6sdgrc.execute-api.ap-south-1.amazonaws.com/dev/api";

function CreateCourse_v2() {
  const { curriculumId, courseId } = useParams();
  const institutionId = 1;
  const [contents, setContents] = useState([]);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [curIdx, setCurIdx] = useState(1);
  const [draggedIdx, setDraggedIdx] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(
          BASE_URL +
            `/v1/courses/${courseId}/curriculums/${curriculumId}/contents`
        );
        if (!response.ok) {
          throw new Error("콘텐츠를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setContents(data.result || []);
        setCurIdx(data.nextIdx || 1);
        console.log(data.result);
      } catch (error) {
        console.error("콘텐츠를 가져오는 중 오류 발생:", error);
      }
    };

    fetchContents();
  }, [curriculumId, courseId]);

  const handleAddContent = (newContent) => {
    const newIdx = contents.length + 1;
    setContents((prevContents) => [
      ...prevContents,
      { ...newContent, idx: newIdx },
    ]);
    setCurIdx(curIdx + 1);
  };

  const handleShowUpload = () => {
    setIsUploadVisible(true);
  };

  const handleUploadComplete = (newContent) => {
    console.log("업로드가 완료되었습니다.");
    handleAddContent(newContent);
    setIsUploadVisible(false);
  };

  const handleDragStart = (idx) => {
    console.log("handleDragStart Idex : ", idx);
    setDraggedIdx(idx);
  };

  const handleDrop = async (targetIdx) => {
    if (draggedIdx === null || draggedIdx === targetIdx) return;

    try {
      const draggedContent = contents[draggedIdx].idx;
      const droppedContent = contents[targetIdx].idx;

      const response = await fetch(
        BASE_URL +
          `/v1/courses/${courseId}/curriculums/${curriculumId}/contents/swap`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            draggedIdx: draggedContent,
            droppedIdx: droppedContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("순서 업데이트 요청 실패");
      }

      // idx 기반으로 로컬 상태 업데이트
      const updatedContents = contents.map((content) => {
        if (content.idx === draggedContent) {
          return { ...content, idx: droppedContent };
        }
        if (content.idx === droppedContent) {
          return { ...content, idx: draggedContent };
        }
        return content;
      });

      // idx로 정렬하여 로컬 상태 반영
      updatedContents.sort((a, b) => a.idx - b.idx);
      setContents(updatedContents);
      setDraggedIdx(null);

      console.log("순서가 성공적으로 교환되었습니다.");
    } catch (error) {
      console.error("순서 교환 중 오류:", error);
    }
  };

  return (
    <>
      <h1>CreateCourse_v2</h1>
      {contents.map((content, idx) => (
        <div
          key={content.id}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(idx)}
        >
          <GetContents
            idx={idx + 1}
            curriculumId={curriculumId}
            courseId={courseId}
            institutionId={institutionId}
            originalFileName={content.originalFileName}
            uploadedAt={content.createdAt}
            content={content}
            onAdd={() => {
              handleAddContent();
            }}
          />
        </div>
      ))}
      {isUploadVisible && (
        <UploadContents
          idx={curIdx}
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
