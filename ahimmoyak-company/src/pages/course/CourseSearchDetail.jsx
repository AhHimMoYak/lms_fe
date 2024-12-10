import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Building2, User, Clock, ChartBarStacked } from 'lucide-react';
import ContractRequestModal from "../../components/contract/ContractRequestModal.jsx";

const CourseSearchDetail = () => {
  const { courseId } = useParams();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const courseData = {
    id: 1,
    title: 'React 개발 실무',
    institution: '테크 아카데미',
    instructor: '김강사',
    category: "카테고리1",
    duration: 60,
    price: 1200000,
    maxStudents: 30,
    description: 'React를 활용한 웹 애플리케이션 개발 실무 과정입니다.',
    curriculum: [
      {
        id: 1,
        title: '1주차: React 기초',
        contents: [
          { id: 1, title: 'React 소개', type: 'video' },
          { id: 2, title: 'Component와 Props', type: 'document' },
          { id: 3, title: '실습 과제 1', type: 'assignment' }
        ]
      },
      {
        id: 2,
        title: '2주차: React Hooks',
        contents: [
          { id: 4, title: 'useState 활용', type: 'video' },
          { id: 5, title: 'useEffect 이해하기', type: 'document' }
        ]
      }
    ]
  };


  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{courseData.title}</h2>
          <div className="mt-2 text-gray-600 space-y-1">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2"/>
              <span>{courseData.institution}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2"/>
              <span>강사: {courseData.instructor}</span>
            </div>
            <div className="flex items-center">
              <ChartBarStacked className="h-4 w-4 mr-2"/>
              <span>카테고리: {courseData.category}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2"/>
              <span>교육기간: {courseData.duration}일</span>
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
                <p className="text-gray-600">{courseData.description}</p>
              </div>

              <h3 className="text-lg font-semibold mb-4">커리큘럼</h3>
              <div className="space-y-2">
                {courseData.curriculum.map((unit) => (
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
                        {unit.contents.map((content) => (
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
                  <p className="text-xl font-semibold">최대 {courseData.maxStudents}명</p>
                </div>
                <div>
                  <p className="text-gray-600">수강료</p>
                  <p className="text-xl font-semibold">{courseData.price.toLocaleString()}원</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  계약 신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && (<ContractRequestModal courseData={courseData} isOpen={showModal} onClose={() => setShowModal(false)} />)}
    </>
  );
};

export default CourseSearchDetail;