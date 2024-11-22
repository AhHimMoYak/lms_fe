import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddContents from "./AddContents";
import UploadContents from "./UploadContents";
import GetContents from "./GetContents";

const BASE_URL = "https://api.ahimmoyak.click/builder";

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
          `${BASE_URL}/v1/courses/${courseId}/curriculums/${curriculumId}/contents`
        );
        if (!response.ok) {
          throw new Error("콘텐츠를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        console.log("Fetched contents:", data);
        setContents(data.result || []);
        setCurIdx(data.nextIdx || 1);
      } catch (error) {
        console.error("콘텐츠를 가져오는 중 오류 발생:", error);
      }
    };

    fetchContents();
  }, [curriculumId, courseId]);

  const handleShowUpload = () => {
    setIsUploadVisible(true);
  };

  const handleUploadComplete = async () => {
    setIsUploadVisible(false);

    try {
      const response = await fetch(
        `${BASE_URL}/v1/courses/${courseId}/curriculums/${curriculumId}/contents`
      );
      if (!response.ok) {
        throw new Error("콘텐츠를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setContents(data.result || []);
      setCurIdx(data.nextIdx || 1);
    } catch (error) {
      console.error("업로드 후 콘텐츠 가져오는 중 오류 발생:", error);
    }
  };

  const handleDragStart = (idx) => {
    setDraggedIdx(idx);
  };

  const handleDrop = async (targetIdx) => {
    if (draggedIdx === null || draggedIdx === targetIdx) return;

    try {
      const draggedContent = contents[draggedIdx];
      const droppedContent = contents[targetIdx];

      const response = await fetch(
        `${BASE_URL}/v1/courses/${courseId}/curriculums/${curriculumId}/contents/swap`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            draggedIdx: draggedContent.idx,
            droppedIdx: droppedContent.idx,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("순서 업데이트 요청 실패");
      }

      const updatedContents = contents.map((content) => {
        if (content.idx === draggedContent.idx) {
          return { ...content, idx: droppedContent.idx };
        }
        if (content.idx === droppedContent.idx) {
          return { ...content, idx: draggedContent.idx };
        }
        return content;
      });

      updatedContents.sort((a, b) => a.idx - b.idx);
      setContents(updatedContents);
      setDraggedIdx(null);
    } catch (error) {
      console.error("순서 교환 중 오류:", error);
    }
  };

  const handleDeleteContent = async (contentId, contentType) => {
    try {
      const response = await fetch(
        `${BASE_URL}/v1/courses/${courseId}/curriculums/${curriculumId}/contents/${contentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType }),
        }
      );

      if (!response.ok) {
        throw new Error("콘텐츠를 삭제하는 데 실패했습니다.");
      }

      const responseAfterDelete = await fetch(
        `${BASE_URL}/v1/courses/${courseId}/curriculums/${curriculumId}/contents`
      );
      if (!responseAfterDelete.ok) {
        throw new Error("삭제 후 콘텐츠를 가져오는 데 실패했습니다.");
      }
      const data = await responseAfterDelete.json();
      setContents(data.result || []);
    } catch (error) {
      console.error("콘텐츠 삭제 중 오류 발생:", error);
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
            contentId={content.contentId}
            originalFileName={content.originalFileName}
            uploadedAt={content.createdAt}
            content={content}
            onDelete={() =>
              handleDeleteContent(content.contentId, content.contentType)
            }
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
          onClose={() => setIsUploadVisible(false)}
        />
      )}
      <AddContents
        curriculumId={curriculumId}
        courseId={courseId}
        institutionId={institutionId}
        onAdd={handleShowUpload}
      />
    </>
  );
}

export default CreateCourse_v2;