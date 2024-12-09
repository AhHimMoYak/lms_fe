import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Building2, User } from 'lucide-react';
import axios from "axios";

const Courses = () => {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8080';
  const [courses, setCourses] = useState([]);

  const stateLabels = {
    ONGOING: { label: "교육과정 진행중", color: "bg-teal-100 text-teal-700" },
  };

  const translateState = (state) => {
    const stateInfo = stateLabels[state];
    return stateInfo ? stateInfo : { label: "알 수 없음", color: "bg-gray-100 text-gray-700" };
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/courseProvides/list`, {
        params: { userId: 2 },
        withCredentials: true,
      });
      console.log('Courses Data:', response.data);

      // Filter the courses to show only those with state "ONGOING"
      const ongoingCourses = response.data.filter(course => course.state === "ONGOING");
      setCourses(ongoingCourses);
    } catch (error) {
      console.error('Error fetching courses:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
              {courses.map((course) => {
                const { label, color } = translateState(course.state);
                return (
                    <tr
                        key={course.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/courses/${course.courseId}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{course.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                          {course.institutionName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {course.instructor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">{course.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {course.beginDate} ~ {course.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{course.attendeeCount}명</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${color}`}>
                      {label}
                    </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </main>
      </>
  );
};

export default Courses;
