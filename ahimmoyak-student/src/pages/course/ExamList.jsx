import ExamCard from "../../components/exam/ExamCard.jsx";

const ExamList = () => {
  const mockExam = [
    {
      id: 1,
      title: "React 기초 평가",
      description: "React의 기본 개념과 Hooks에 대한 이해도를 평가합니다.",
      timeLimit: 30,
      questionCount: 10,
      totalPoints: 100,
      status: "took"
    },
    {
      id: 2,
      title: "중간고사",
      description: "1-7주차 학습내용 평가",
      timeLimit: 60,
      questionCount: 20,
      totalPoints: 100,
      status: "on_taking",
      score: 85
    },
    {
      id: 3,
      title: "기말고사",
      description: "최종평가 입니다",
      timeLimit: 60,
      questionCount: 20,
      totalPoints: 100,
      status: "can_take",
      score: 85
    }
  ];

  const exams = mockExam;


  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold mb-4">평가시험</h1>

      <div className="grid gap-4">
        {exams.map((exam) => (
          <ExamCard exam={exam} key={exam.id} />
        ))}
      </div>
    </div>
  );
};

export default ExamList;