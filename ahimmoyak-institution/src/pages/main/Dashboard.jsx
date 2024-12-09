import React, { useRef } from 'react';
import { BookOpen, Users, Building2, Bell } from 'lucide-react';
import CompanyGrid from "../institution/CompanyGrid.jsx";
import CompanyAttendanceGrid from "../institution/CompanyAttendanceGrid.jsx";
import CourseAttendanceBarChart from "../institution/CourseAttendanceBarChart.jsx";
import CoursePopularityChart from "../institution/CoursePopularityChart.jsx";
import MonthlyCourseChart from "../institution/MonthlyCourseChart.jsx";
import QuarterPieChart from "../institution/QuarterPieChart.jsx";
import CourseProvideGrid from "../institution/CourseProvideGrid.jsx";
import CourseEvaluationGrid from "../institution/CourseEvaluationGrid.jsx";
import StorageCapacity from "../institution/StorageCapacity.jsx";

const Card = ({ children }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-8">{children}</div>
);

const Dashboard = () => {
  const stats = [
    { title: '총 코스', value: '15', icon: BookOpen },
    { title: '코스제공 수', value: '24', icon: Building2 },
    { title: '총 수강생', value: '1,234', icon: Users },
    { title: '새 계약신청', value: '12', icon: Bell },
  ];

  const courses = [
    { name: 'React 기초부터 실전까지', duration: '30일', providingCount: 3 },
    { name: 'Python 데이터 분석', duration: '45일', providingCount: 2 },
    { name: 'AWS 클라우드 마스터', duration: '60일', providingCount: 4 },
  ];

  const provides = [
    { course: 'React 기초부터 실전까지', company: 'A기업', period: '2024.01-2024.06', students: 234 },
    { course: 'Python 데이터 분석', company: 'B기업', period: '2024.03-2024.08', students: 189 },
    { course: 'AWS 클라우드 마스터', company: 'C기업', period: '2024.02-2024.07', students: 156 },
  ];

  // 참조를 위한 useRef 생성
  const courseDetailsRef = useRef(null);
  const evaluationTableRef = useRef(null);

  // 참조된 섹션으로 스크롤 이동
  const handleCourseClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
      <div>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">대시보드</h2>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto space-y-8">

          {/* 통계 카드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                  <Card key={stat.title}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <Icon className="h-8 w-8 text-gray-400"/>
                    </div>

                  </Card>
              );
            })}
            <button
                onClick={() => handleCourseClick(evaluationTableRef)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              강좌 보기
            </button>
          </div>

          {/* 코스 현황 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">코스 운영 현황</h2>

                <button
                    onClick={() => handleCourseClick(courseDetailsRef)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  테이블 데이터 보기
                </button>
              </div>
              <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.name}
                        className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-gray-500">기간: {course.duration}</p>
                      </div>
                      <span className="text-sm text-blue-600">{course.providingCount}개사 운영중</span>
                    </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-bold mb-4">최근 코스 운영 현황</h2>
              <div className="space-y-4">
                {provides.map((providing) => (
                    <div key={`${providing.course}-${providing.company}`} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{providing.course}</p>
                        <p className="text-sm text-gray-500">{providing.company} | {providing.period}</p>
                      </div>
                      <span className="text-sm text-gray-600">수강생 {providing.students}명</span>
                    </div>
                ))}
              </div>
            </Card>
          </div>

          <StorageCapacity/>

          {/* 기타 통계 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-lg font-bold mb-4">월별 통계</h2>
              <MonthlyCourseChart/>
            </Card>
            <Card>
              <h2 className="text-lg font-bold mb-4">분기별 통계</h2>
              <QuarterPieChart/>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-bold mb-4">코스 통계</h2>
            <CoursePopularityChart/>
          </Card>

          {/* 출석율 섹션 */}
          <Card>
            <h2 className="text-lg font-bold mb-4">출석율</h2>
            <div className="flex flex-wrap gap-8">
              <div className="flex-1">
                <h3 className="text-md font-bold mb-2">회사별 총 출석율</h3>
                <CompanyAttendanceGrid/>
              </div>
              <div className="flex-1">
                <h3 className="text-md font-bold mb-2">코스별 회사 출석율</h3>
                <CourseAttendanceBarChart/>
              </div>
            </div>
          </Card>

          {/* 코스 제공 상세 섹션 */}
          <Card>
            <div ref={courseDetailsRef}>
              <h2 className="text-lg font-bold mb-4">진행중인 코스 운영 현황 - 데이터 테이블</h2>
              <CourseProvideGrid/>
              <h2 className="text-lg font-bold mt-8 mb-4">체결된 회사 정보 - 데이터 테이블</h2>
              <CompanyGrid/>
            </div>
          </Card>

          <Card>
            <div ref={evaluationTableRef}>
              <h2 className="text-lg font-bold mb-4">총 코스 - 데이터 테이블</h2>
              <CourseEvaluationGrid/>
            </div>
          </Card>

        </main>
      </div>
  );
};

export default Dashboard;
