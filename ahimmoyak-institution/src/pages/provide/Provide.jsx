import {Building2, ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";
import React from "react";

const Provide = () => {
  const courses = {
    1: {
      courseTitle: 'React 기초부터 실전까지',
      provides: [
        { id: 1, company: 'A기업', startDate: '2024-01', endDate: '2024-06', students: 234, status: '진행중' },
        { id: 2, company: 'B기업', startDate: '2024-03', endDate: '2024-08', students: 189, status: '예정' }
      ]
    },
    2: {
      courseTitle: 'Python 데이터 분석',
      provides: [
        { id: 3, company: 'C기업', startDate: '2024-02', endDate: '2024-07', students: 156, status: '진행중' }
      ]
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">교육제공관리</h2>
        </div>
      </header>
      <div className="p-8 max-w-5xl mx-auto space-y-6">

        {Object.entries(courses).map(([courseId, course]) => (
          <div key={courseId} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-medium">{course.courseTitle}</h2>
            </div>
            <div className="divide-y">
              {course.provides.map(provide => (
                <div
                  key={provide.id}
                  onClick={() => navigate(`/provide/${provide.id}`)}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400"/>
                        <h3 className="font-medium">{provide.company}</h3>
                        <span className={`text-sm px-2 py-1 rounded ${
                          provide.status === '진행중' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {provide.status}
                      </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {provide.startDate} ~ {provide.endDate}
                        <span className="ml-3">수강생 {provide.students}명</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Provide;
