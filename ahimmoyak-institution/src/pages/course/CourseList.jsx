import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ChevronRight, Clock, User } from 'lucide-react';
import axios from 'axios';

// 코스 목록 페이지
const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/v1/institutions/courses?userId=3')
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.log('오류', error)
        })

  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">교육과정관리</h2>
        </div>
      </header>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">코스 관리</h1>
          <button
            onClick={() => navigate('/courses/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5"/>
            코스 추가
          </button>
        </div>

        <div className="bg-white rounded-lg shadow divide-y">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}/info`)}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4"/> {course.period}일
                  </span>
                    <span className="flex items-center gap-1">
                    <User className="w-4 h-4"/> {course.instructor}
                  </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// 코스 생성 페이지
const CourseCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 처리
    navigate('/courses');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">새 코스 추가</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">코스명</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">기간 (일)</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">강사명</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">소개글</label>
            <textarea
              className="w-full border rounded-lg p-2 h-32"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export { CourseList, CourseCreate };