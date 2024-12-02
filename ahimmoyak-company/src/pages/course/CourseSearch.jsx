import { useNavigate } from 'react-router-dom';
import { ChevronRight, Building2, User, Clock, Search } from 'lucide-react';

const CourseSearch = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'React 개발 실무',
      institution: '테크 아카데미',
      instructor: '김강사',
      duration: 60,
      price: 1200000,
      maxStudents: 30
    },
    {
      id: 2,
      title: '프로젝트 관리',
      institution: '비즈니스 스쿨',
      instructor: '박강사',
      duration: 40,
      price: 800000,
      maxStudents: 25
    }
  ];

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">교육과정 찾기</h2>
        </div>
      </header>
      <main className="p-6">
        <div className="mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="교육과정 검색..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">과정명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기관</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">강사</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기간</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수강인원</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수강료</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/search/${course.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    {course.institution}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {course.instructor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {course.duration}일
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">최대 {course.maxStudents}명</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.price.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
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

export default CourseSearch;