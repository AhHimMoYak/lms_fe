import {useParams} from "react-router-dom";
import React from "react";

const ProvideDetail = () => {
  const { provideId } = useParams();
  const offering = {
    id: 1,
    courseTitle: 'React 기초부터 실전까지',
    company: 'A기업',
    startDate: '2024-01',
    endDate: '2024-06',
    status: '진행중',
    students: [
      { id: 1, name: '김학생', department: '개발팀', progress: 75, lastAccess: '2024-01-15' },
      { id: 2, name: '이학생', department: '기획팀', progress: 60, lastAccess: '2024-01-14' }
    ]
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">교육제공관리</h2>
        </div>
      </header>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{offering.courseTitle}</h1>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-500">회사명</div>
                  <div className="font-medium">{offering.company}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">제공기간</div>
                  <div className="font-medium">{offering.startDate} ~ {offering.endDate}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">상태</div>
                  <div className={`inline-block px-2 py-1 rounded text-sm ${
                    offering.status === '진행중' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {offering.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">수강생 목록</h2>
          </div>
          <div className="divide-y">
            {offering.students.map(student => (
              <div key={student.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.department}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">진도율 {student.progress}%</div>
                    <div className="text-sm text-gray-500">최근접속 {student.lastAccess}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProvideDetail;
