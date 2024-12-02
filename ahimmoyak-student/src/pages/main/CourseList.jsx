import CourseCard from "../../components/main/CourseCard.jsx";

const CourseList = () => {
  const activeCourses = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    title: `진행중인 코스 ${i + 1} - 상세한 코스 제목이 들어갑니다`,
    progress: Math.floor(Math.random() * 100),
    deadline: '2024-04-30',
    thumbnail: '/api/placeholder/300/200'
  }));

  const completedCourses = Array(8).fill(null).map((_, i) => ({
    id: i + 100,
    title: `완료된 코스 ${i + 1} - 상세한 코스 제목이 들어갑니다`,
    progress: 100,
    completedDate: '2024-03-15',
    thumbnail: '/api/placeholder/300/200'
  }));

  return (
    <div className="space-y-8 mt-6">
      <h2 className="text-2xl font-bold mb-6">수강 중인 코스</h2>

      <section>
        <h3 className="text-xl font-semibold mb-4">진행중인 코스</h3>
        <div className="flex flex-wrap gap-4">
          {activeCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
      <hr className="border-2 border-gray-800 my-4"/>
      <section>
        <h3 className="text-xl font-semibold mb-4">수강 완료된 코스</h3>
        <div className="flex flex-wrap gap-4">
          {completedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseList;