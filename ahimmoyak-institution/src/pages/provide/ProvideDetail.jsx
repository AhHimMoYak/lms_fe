import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const ProvideDetail = () => {
  const { provideId } = useParams();
  const [expandedExam, setExpandedExam] = useState(null);
  const [offering, setOffering] = useState({
    courseTitle: '',
    companyName: '',
    beginDate: '',
    endDate: '',
    state: '',
    learnerList: [],
    exams: [
      {
        id: 1,
        title: '중간평가',
        questionCount: 20,
        duration: 60,
        results: [
          {studentId: 1, status: '완료', score: 85, submitDate: '2024-01-10'},
          {studentId: 2, status: '미응시', score: null, submitDate: null}
        ]
      },
      {
        id: 2,
        title: '최종평가',
        questionCount: 30,
        duration: 90,
        results: [
          {studentId: 1, status: '미응시', score: null, submitDate: null},
          {studentId: 2, status: '미응시', score: null, submitDate: null}
        ]
      }
    ]
  });

  console.log("provide:", provideId); // 디버깅용
  useEffect(() => {
    axios
        .get(`http://localhost:8080/v1/institutions/${provideId}/startCourseProvideDetails?userId=3`)
        .then((response) => {
          console.log(response.data); // API 응답 확인
          // API 응답 데이터와 기존 목데이터 병합
          setOffering((prevState) => ({
            ...prevState,
            ...response.data, // API 데이터 병합
          }));
        })
        .catch((error) => {
          console.error('데이터 로드 실패:', error);
        });
  }, [provideId]);

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
                  <div className="font-medium">{offering.companyName}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">제공기간</div>
                  <div className="font-medium">{offering.beginDate} ~ {offering.endDate}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">상태</div>
                  <div className={`inline-block px-2 py-1 rounded text-sm ${
                    offering.state === '진행중' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {offering.state}
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
            {offering.learnerList.map(student => (
              <div key={student.enrollmentId} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{student.enrollmentName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">진도율 {student.progress}%</div>
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
