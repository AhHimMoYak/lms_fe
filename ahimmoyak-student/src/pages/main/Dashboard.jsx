import CourseCard from "../../components/main/CourseCard.jsx";

const Dashboard = () => {


  const courses = [
    {
      id: 1,
      title: 'React 기초 마스터하기 - Component, Props, State 완벽 이해',
      progress: 75,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Node.js 백엔드 개발 - Express와 MongoDB를 활용한 REST API 구축',
      progress: 45,
      thumbnail: '/api/placeholder/300/200'
    },
    // ... 더 많은 코스 추가
  ].concat(Array(6).fill(null).map((_, i) => ({
    id: i + 3,
    title: `샘플 코스 ${i + 1}`,
    progress: Math.floor(Math.random() * 100),
    thumbnail: '/api/placeholder/300/200'
  })));

  const questions = [
    {
      id: 1,
      title: 'React Hook의 생명주기에 대해 질문있습니다',
      createdAt: '2024-03-20',
      isAnswered: true
    },
    {
      id: 2,
      title: 'setState가 비동기로 동작하는 이유가 궁금합니다',
      createdAt: '2024-03-19',
      isAnswered: false
    }
  ];

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">대시보드</h2>

      <section>
        <h3 className="text-xl font-semibold mb-4">수강 중인 코스</h3>
        <div className="flex flex-wrap gap-4">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">최근 Q&A</h3>
        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold text-lg">{question.title}</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">{question.createdAt}</span>
                <span className={`px-3 py-1 rounded ${
                  question.isAnswered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {question.isAnswered ? '답변 완료' : '답변 대기중'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;