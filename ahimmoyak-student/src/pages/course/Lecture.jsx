import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileText,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Lecture = () => {
  const { courseId } = useParams();
  const [openSections, setOpenSections] = useState([0]);
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    axios
      .get(`http://localhost:8080/v1/students/courses/${courseId}/detail?userId=11`)
      .then((response) => {
        const courseData = response.data;
        if (courseData && courseData.curriculumList) {
          const processedCurriculum = courseData.curriculumList.map((section) => {
            const contentList = section.contentList.map((content) => ({
              id: content.id,
              idx: content.id,
              title: content.title,
              type: content.type ? content.type.toLowerCase() : "unknown",
              duration: content.videoDurations || null,
              completed: content.state === "COMPLETED",
            }));

            return {
              id: section.id,
              title: section.title,
              contents: contentList,
              completed: contentList.every((content) => content.completed),
            };
          });

          setCurriculum(processedCurriculum);
        } else {
          setCurriculum([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setError("강좌 정보를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">강좌 목록</h1>
      {curriculum.map((section, index) => (
        <div
          key={section.id}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <button
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            onClick={() =>
              setOpenSections((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              )
            }
          >
            <div className="flex items-center space-x-3">
              {section.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <span className="font-medium">{section.title}</span>
            </div>
            {openSections.includes(index) ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
          {openSections.includes(index) && (
            <div className="divide-y">
              {section.contents.map((content) => (
                <NavLink
                  to={`/course/${courseId}/curriculum/${section.id}/content/${content.id}`}
                  key={content.idx}
                  className="px-4 py-3 flex items-center hover:bg-gray-50"
                >
                  <div className="w-5 h-5 ml-8 mr-3">
                    {content.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center flex-1">
                    {content.type === "video" ? (
                      <PlayCircle className="w-5 h-5 mr-3 text-gray-400" />
                    ) : (
                      <FileText className="w-5 h-5 mr-3 text-gray-400" />
                    )}
                    <span className="flex-1">{content.title}</span>
                    {content.duration && (
                      <span className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {content.duration}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Lecture;
