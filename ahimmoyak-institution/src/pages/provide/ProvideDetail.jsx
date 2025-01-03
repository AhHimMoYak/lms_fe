import {useParams} from "react-router-dom";
import React, {useState} from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProvideDetail = () => {
  const { provideId } = useParams();
  const [expandedExam, setExpandedExam] = useState(null);

  const offering = {
    id: 1,
    courseTitle: 'React 기초부터 실전까지',
    company: 'A기업',
    startDate: '2024-01',
    endDate: '2024-06',
    status: '진행중',
    students: [
      { id: 1, name: '김학생', progress: 75, lastAccess: '2024-01-15' },
      { id: 2, name: '이학생', progress: 60, lastAccess: '2024-01-14' }
    ],
    exams: [
      {
        id: 1,
        title: '중간평가',
        questionCount: 20,
        duration: 60,
        results: [
          { studentId: 1, status: '완료', score: 85, submitDate: '2024-01-10' },
          { studentId: 2, status: '미응시', score: null, submitDate: null }
        ]
      },
      {
        id: 2,
        title: '최종평가',
        questionCount: 30,
        duration: 90,
        results: [
          { studentId: 1, status: '미응시', score: null, submitDate: null },
          { studentId: 2, status: '미응시', score: null, submitDate: null }
        ]
      }
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

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">시험 목록</h2>
          </div>
          <div className="divide-y">
            {offering.exams.map(exam => (
              <div key={exam.id} className="p-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)}
                >
                  <div>
                    <h3 className="font-medium">{exam.title}</h3>
                    <p className="text-sm text-gray-500">
                      {exam.questionCount}문항 · {exam.duration}분
                    </p>
                  </div>
                  {expandedExam === exam.id ?
                    <ChevronUp className="w-5 h-5"/> :
                    <ChevronDown className="w-5 h-5"/>
                  }
                </div>

                {expandedExam === exam.id && (
                  <div className="mt-4">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">수강생</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">상태</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">점수</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">제출일시</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y">
                      {exam.results.map(result => {
                        const student = offering.students.find(s => s.id === result.studentId);
                        return (
                          <tr key={result.studentId}>
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">
                                <span className={`inline-block px-2 py-1 rounded text-sm ${
                                  result.status === '완료'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {result.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">{result.score ? `${result.score}점` : '-'}</td>
                            <td className="px-4 py-2 text-gray-500">{result.submitDate || '-'}</td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProvideDetail;
