import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const QnATab = () => {

  const {courseId} = useParams();
  const [option, setOption] = useState('all');

  const posts = [
    { id: 1, title: 'React Hook의 생명주기 질문', author: '김학생', date: '2024-01-15', answered: true },
    { id: 2, title: '실습 과제 제출 방법', author: '이학생', date: '2024-01-14', answered: false },
    { id: 3, title: 'React Hook의 생명주기 질문', author: '김학생', date: '2024-01-15', answered: true },
    { id: 4, title: '실습 과제 제출 방법', author: '이학생', date: '2024-01-14', answered: false },
    { id: 5, title: 'React Hook의 생명주기 질문', author: '김학생', date: '2024-01-15', answered: true },
    { id: 6, title: '실습 과제 제출 방법', author: '이학생', date: '2024-01-14', answered: false },
  ]

  const navigate = useNavigate();

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b relative flex">
        <h2 className="text-lg font-medium">질문게시판</h2>
        <select className='absolute right-3 rounded-lg border-2 p-1' onChange={(e) => setOption(e.target.value)}>
          <option value={'all'}>전체</option>
          <option value={'no_answer'}>미답변</option>
        </select>
      </div>
      <div className="divide-y">
        {posts.map(question => (
          <div key={question.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/courses/${courseId}/qna/${question.id}`)}>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{question.title}</h3>
                <p className="text-sm text-gray-500">{question.author}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{question.date}</div>
                <span className={`text-sm ${question.answered ? 'text-green-600' : 'text-orange-600'}`}>
                {question.answered ? '답변완료' : '미답변'}
              </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default QnATab;