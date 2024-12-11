import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null); // Initialize as null
  const [expandedUnit, setExpandedUnit] = useState(null);

  const API_URL = 'http://localhost:8080';

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/courses/${courseId}/details`, {
        withCredentials: true,
      });
      console.log(response.data);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const getContentIcon = (type) => {
    switch (type) {
      case 'VIDEO': return '🎥';
      case 'MATERIAL': return '📄';
      case 'QUIZ': return '✏️';
      default: return '📌';
    }
  };

  if (!courseData) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl font-semibold">데이터 로딩중 ...</p>
        </div>
    );
  }

  return (
      <>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{courseData.categoryTitle}</h2>
          </div>
        </header>
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-2">
            <p>교육기관: {courseData.institutionName} | 강사: {courseData.instructor}</p>
            <p>교육기간: {courseData.beginDate} ~ {courseData.endDate}</p>
            <p>카테고리: {courseData.categoryTitle}</p>
            <p>소개: {courseData.introduction}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">커리큘럼</h3>
                <div className="space-y-2">
                  {courseData.curriculumList && courseData.curriculumList.map((unit) => (
                      <div key={unit.id} className="border rounded-lg">
                        <button
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                            onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                        >
                          <span>{unit.title}</span>
                          {expandedUnit === unit.id ? <ChevronDown /> : <ChevronRight />}
                        </button>
                        {expandedUnit === unit.id && (
                            <div className="px-4 py-2 border-t">
                              {unit.contentList && unit.contentList.map((content) => (
                                  <div key={content.id} className="py-2 flex items-center">
                                    <span className="mr-2">{getContentIcon(content.type)}</span>
                                    <span>{content.title}</span>
                                  </div>
                              ))}
                            </div>
                        )}
                      </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">수강중인 직원</h3>
                <div className="space-y-3">
                  {courseData.enrolledEmployees && courseData.enrolledEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center p-3 border rounded-lg">
                        <User className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.department} | {employee.position}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
  );
};

export default CourseDetail;
