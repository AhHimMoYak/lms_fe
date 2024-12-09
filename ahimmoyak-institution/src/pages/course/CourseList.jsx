import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, ChevronRight, Clock, User, ChartBarStacked } from 'lucide-react';
import AddCourseModal from "../../components/course/AddCourseModal.jsx";

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

  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const handleAddCourse = () => {
    setIsAddingCourse(true);
  }

  const submitAddCourse = async (newCourse) => {
    try {
      // 서버에 새로운 코스 추가 요청
      const response = await axios.post('http://localhost:8080/v1/institutions/courses?userId=3', newCourse);

      console.log('새로운 코스 추가 완료:', response.data);

      navigate(`/courses/${response.data.courseId}/info`);
    } catch (error) {
      console.error('코스 추가 중 오류 발생:', error);
    } finally {
      // 추가 상태를 비활성화
      setIsAddingCourse(false);
    }
  };

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
            onClick={() => handleAddCourse()}
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
            <Clock className="w-4 h-4" /> {course.period}일
          </span>
                    <span className="flex items-center gap-1">
            <User className="w-4 h-4" /> {course.instructor}
          </span>
                    <span className="flex items-center gap-1">
            <ChartBarStacked className="w-4 h-4" /> {course.categoryTitle}
          </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAddingCourse && (
        <AddCourseModal onAdd={submitAddCourse} onClose={() => setIsAddingCourse(false)} />
      )}
    </>
  );
};



export { CourseList };