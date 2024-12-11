import { useNavigate } from 'react-router-dom';
import { ChevronRight, Building2, User, Clock, Search, ChartBarStacked } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseSearch = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const API_URL = 'http://localhost:8080';

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/courses/all`, {
        withCredentials: true,
      });
      console.log('Courses Data:', response.data);
      setCourses(response.data);
    } catch (e) {
      console.error('Error fetching courses:', e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const calculateTuition = (period) => {
    const DAILY_RATE = 50000;
    return period * DAILY_RATE;
  };

  const filteredCourses = courses.filter((course) => {
    const normalizedSearch = search.replace(/\s+/g, '');
    const normalizedTitle = course.title.replace(/\s+/g, '');
    const regex = new RegExp(normalizedSearch, 'i');
    const isTitleMatch = regex.test(normalizedTitle);
    const isCategoryMatch =
        searchCategory === 'all' || course.categoryTitle === searchCategory;
    return isTitleMatch && isCategoryMatch;
  });

  return (
      <>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">교육과정 찾기</h2>
          </div>
        </header>
        <main className="p-6">
          <div className="mb-6 flex">
            <div className="relative w-52">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                  type="text"
                  placeholder="교육과정 검색..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative w-52">
              <ChartBarStacked className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  onChange={(e) => setSearchCategory(e.target.value)}
                  value={searchCategory}
              >
                <option value="all">전체</option>
                {Array.from(new Set(courses.map((course) => course.categoryTitle))).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">과정명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기관</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">강사</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육기간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">수강료</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                  <tr
                      key={course.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                          navigate(`/search/${course.id}`, {
                            state: { price: calculateTuition(course.period) },
                          })
                      }
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
                      <div className="flex items-center">{course.categoryTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {course.period}일
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {calculateTuition(course.period).toLocaleString()}원
                    </td>
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
