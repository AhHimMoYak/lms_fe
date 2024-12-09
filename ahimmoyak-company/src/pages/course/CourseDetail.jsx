import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, User } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [expandedUnit, setExpandedUnit] = useState(null);

  const courseData = {
    id: 1,
    title: 'React 개발 실무',
    institution: '테크 아카데미',
    instructor: '김강사',
    introduction: "이교육과정은 좋은 교육과정입니다.",
    category: "카테고리1",
    period: '2024-01-15 ~ 2024-03-15',
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
    ],
    enrolledEmployees: [
      { id: 1, name: '홍길동', department: 'IT개발팀', position: '선임개발자' },
      { id: 2, name: '김영희', department: 'IT개발팀', position: '주임개발자' }
    ]
  };

  const getContentIcon = (type) => {
    switch(type) {
      case 'video': return '🎥';
      case 'document': return '📄';
      case 'assignment': return '✍️';
      default: return '📌';
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{courseData.title}</h2>
        </div>
      </header>
      <main className="p-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6 space-y-2">
          <p>교육기관: {courseData.institution} | 강사: {courseData.instructor}</p>
          <p>교육기간: {courseData.period}</p>
          <p>카테고리: {courseData.category}</p>
          <p>소개: {courseData.introduction}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
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
                      <div className="px-4 py-2 border-t">
                        {unit.contents.map((content) => (
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
                {courseData.enrolledEmployees.map((employee) => (
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