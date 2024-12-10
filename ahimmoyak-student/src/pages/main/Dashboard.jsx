import CourseCard from "../../components/main/CourseCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const userId =11;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const questions = [
    {
      id: 1,
      title: "React Hook의 생명주기에 대해 질문있습니다",
      createdAt: "2024-03-20",
      isAnswered: true,
    },
    {
      id: 2,
      title: "setState가 비동기로 동작하는 이유가 궁금합니다",
      createdAt: "2024-03-19",
      isAnswered: false,
    },
  ];

  useEffect(() => {
    // API 호출
    axios
      .get(`http://localhost:8080/v1/students/courses/courseList`, {
        params: { userId },
      })
      .then((response) => {
        const courseList = response.data.map((course) => {
          const progress =
            course.totalContentCount > 0
              ? Math.floor(
                (course.completedContentCount / course.totalContentCount) *
                100
              )
              : 0;
          return {
            id: course.id,
            title: course.title,
            introduction: course.introduction,
            instructor: course.instructor,
            progress, // 계산된 진행률
            state: course.state,
            category: course.category,
          };
        });
        setCourses(courseList); // 변환된 데이터 설정
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setError("수강 중인 코스를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">대시보드</h2>

      <section>
        <h3 className="text-xl font-semibold mb-4">수강 중인 코스</h3>
        <div className="flex flex-wrap gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">최근 Q&A</h3>
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow p-4"
            >
              <h4 className="font-semibold text-lg">{question.title}</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">{question.createdAt}</span>
                <span
                  className={`px-3 py-1 rounded ${
                    question.isAnswered
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {question.isAnswered ? "답변 완료" : "답변 대기중"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
