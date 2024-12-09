import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Building2, User, Clock, ChartBarStacked } from 'lucide-react';
import ContractRequestModal from "../../components/contract/ContractRequestModal.jsx";
import axios from "axios";

const CourseSearchDetail = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [courseData, setCourseData] = useState(null);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = 'http://localhost:8080';

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/courses/${courseId}/details`, {
        withCredentials: true,
      });
      console.log('Courses Data:', response.data);
      setCourseData(response.data);

    } catch (e) {
      console.error('Error fetching courses:', e);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl font-semibold">데이터 로딩중 ...</p>
        </div>
    );
  }

  const tuitionFromLocation = location.state?.price || 0;
  const maxStudents = Math.floor(tuitionFromLocation / 40000);

  const refreshCourseData = async () => {
    fetchCourseData();
  };


  return (
      <>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{courseData.title}</h2>
            <div className="mt-2 text-gray-600 space-y-1">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{courseData.institutionName}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>강사: {courseData.instructor}</span>
              </div>
              <div className="flex items-center">
                <ChartBarStacked className="h-4 w-4 mr-2" />
                <span>카테고리: {courseData.categoryTitle}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>교육기간: {courseData.period || 0}일</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">과정 소개</h3>
                  <p className="text-gray-600">{courseData.introduction}</p>
                </div>

                <h3 className="text-lg font-semibold mb-4">커리큘럼</h3>
                <div className="space-y-2">
                  {courseData.curriculumList.map((unit) => (
                      <div key={unit.id} className="border rounded-lg">
                        <button
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                            onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                        >
                          <span>{unit.title}</span>
                          {expandedUnit === unit.id ? <ChevronDown /> : <ChevronRight />}
                        </button>
                        {expandedUnit === unit.id && (
                            <div className="px-4 py-2 border-t space-y-2">
                              {unit.contentList.map((content) => (
                                  <div key={content.id} className="py-2 flex items-center text-gray-600">
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
                <h3 className="text-lg font-semibold mb-4">수강 정보</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">수강 인원</p>
                    <p className="text-xl font-semibold">
                      최대 {maxStudents || 0}명
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">수강료</p>
                    <p className="text-xl font-semibold">
                      {tuitionFromLocation.toLocaleString()}원
                    </p>
                  </div>

                  <button
                      onClick={() => setShowModal(true)}
                      disabled={courseData.courseProvides?.some((cp) =>
                          ["PENDING", "DECLINED", "ACCEPTED", "ATTENDEE_PENDING", "NOT_STARTED", "ONGOING", "FINISHED", "REMOVED"].includes(cp.state)
                      )}
                      className={`w-full px-4 py-2 rounded-lg ${
                          courseData.courseProvides?.some((cp) =>
                              ["PENDING", "DECLINED", "ACCEPTED", "ATTENDEE_PENDING", "NOT_STARTED", "ONGOING", "FINISHED", "REMOVED"].includes(cp.state)
                          )
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    {courseData.courseProvides?.some((cp) =>
                        ["PENDING", "DECLINED", "ACCEPTED", "ATTENDEE_PENDING"].includes(cp.state)
                    )
                        ? "수강 신청 중"
                        : courseData.courseProvides?.some((cp) =>
                            ["NOT_STARTED", "ONGOING"].includes(cp.state)
                        )
                            ? "수강 중"
                            : courseData.courseProvides?.some((cp) =>
                                ["FINISHED", "REMOVED"].includes(cp.state)
                            )
                                ? "수강 신청 불가"
                                : "계약 신청하기"}
                  </button>


                </div>
              </div>
            </div>
          </div>
        </main>

        {showModal && (
            <ContractRequestModal
                courseData={courseData}
                courseId={courseId}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onContractSubmit={refreshCourseData}
            />
        )}
      </>
  );
};

export default CourseSearchDetail;
