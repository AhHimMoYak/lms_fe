import React, { useState, useEffect } from "react";
import { BookOpen, Users, Building2, Bell } from "lucide-react";
import axios from "axios";

const Card = ({ children }) => (
    <div className="bg-white rounded-lg shadow p-6">{children}</div>
);

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 호출
    axios
        .get("http://localhost:8080/v1/institutions/dashboard?userId=3")
        .then((response) => {
          const {
            totalCourse,
            totalCourseProvide,
            totalEnrollment,
            totalProgressCourseProvide,
            progressCourseProvideList,
          } = response.data;

          // 통계 데이터 설정
          setStats([
            { title: "총 코스", value: totalCourse, icon: BookOpen },
            { title: "코스제공 수", value: totalCourseProvide, icon: Building2 },
            { title: "총 수강생", value: totalEnrollment, icon: Users },
            { title: "진행 중 코스", value: totalProgressCourseProvide, icon: Bell },
          ]);

          // 코스 현황 데이터 설정
          setCourses(
              progressCourseProvideList.map((course) => ({
                name: course.courseTitle,
                duration: `${course.period}일`,
                providingCount: course.companyProvided,
              }))
          );

          setLoading(false);
        })
        .catch((error) => {
          console.error("대시보드 데이터 로드 실패:", error);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">로딩 중...</div>;
  }

  return (
      <div>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">대시보드</h2>
          </div>
        </header>
        <main className="p-8 max-w-7xl mx-auto">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                  <Card key={stat.title}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <Icon className="h-8 w-8 text-gray-400" />
                    </div>
                  </Card>
              );
            })}
          </div>

          {/* 코스 현황 */}
          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-bold">코스 현황</h2>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                  <div key={course.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-gray-500">기간: {course.duration}</p>
                    </div>
                    <span className="text-sm text-blue-600">
                  {course.providingCount}개사 제공중
                </span>
                  </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
  );
};

export default Dashboard;
