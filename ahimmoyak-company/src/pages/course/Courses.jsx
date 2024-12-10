import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Building2, User } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'React 개발 실무',
      institution: '테크 아카데미',
      instructor: '김강사',
      category: "카테고리1",
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      enrolledCount: 15,
      status: '진행중'
    },
    {
      id: 2,
      title: '프로젝트 관리',
      institution: '비즈니스 스쿨',
      instructor: '박강사',
      category: "카테고리1",
      startDate: '2024-02-01',
      endDate: '2024-03-30',
      enrolledCount: 12,
      status: '진행중'
    }
  ];

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">진행중인 교육과정</h2>
        </div>
      </header>
      <main className="p-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">과정명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기관</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">강사</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기간</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수강인원</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">상세</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400"/>
                    {course.institution}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400"/>
                    {course.instructor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {course.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400"/>
                    {course.startDate} ~ {course.endDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{course.enrolledCount}명</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                      {course.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ChevronRight className="h-5 w-5 ml-auto text-gray-400"/>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Courses;