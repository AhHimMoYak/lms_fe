import React from 'react';
import { BookOpen, Users, Building2, Bell } from 'lucide-react';

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow p-6">{children}</div>
);

const Dashboard = () => {
  const stats = [
    { title: '총 코스', value: '15', icon: BookOpen },
    { title: '코스제공 수', value: '24', icon: Building2 },
    { title: '총 수강생', value: '1,234', icon: Users },
    { title: '새 계약신청', value: '12', icon: Bell }
  ];

  const courses = [
    {name: 'React 기초부터 실전까지', duration: '30일', providingCount: 3},
    {name: 'Python 데이터 분석', duration: '45일', providingCount: 2},
    {name: 'AWS 클라우드 마스터', duration: '60일', providingCount: 4}
  ]

  const provides = [
    {course: 'React 기초부터 실전까지', company: 'A기업', period: '2024.01-2024.06', students: 234},
    {course: 'Python 데이터 분석', company: 'B기업', period: '2024.03-2024.08', students: 189},
    {course: 'AWS 클라우드 마스터', company: 'C기업', period: '2024.02-2024.07', students: 156}
  ]

  return (
    <div>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">대시보드</h2>
        </div>
      </header>
      <main className="p-8 max-w-7xl mx-auto">
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
                  <Icon className="h-8 w-8 text-gray-400"/>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-bold">최근 코스제공 현황</h2>
            </div>
            <div className="space-y-4">
              {provides.map((providing) => (
                <div key={`${providing.course}-${providing.company}`} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{providing.course}</p>
                    <p className="text-sm text-gray-500">{providing.company} | {providing.period}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                  수강생 {providing.students}명
                </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;