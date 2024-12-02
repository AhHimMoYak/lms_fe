import {NavLink, useParams} from "react-router-dom";

const ExamCard = ({exam}) => {

  const {courseId} = useParams();

  return (
    <div key={exam.id} className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">{exam.title}</h2>
          <p className="text-gray-600 mb-4">{exam.description}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              제한시간: {exam.timeLimit}분
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              문항 수: {exam.questionCount}문항
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              배점: {exam.totalPoints}점
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {exam.status === 'can_take' ?
            (<span className='px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gray-100 text-gray-600'>
              미응시
            </span>) :
            exam.status === 'on_taking' ?
            (<span className='px-3 py-1 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-600'>
              진행중
            </span>) :
            (<span className='px-3 py-1 rounded-full text-sm font-medium mb-4 bg-green-100 text-green-600'>
              응시완료
            </span>)
          }
          {exam.score && (
            <span className="text-lg font-semibold text-gray-900">
                    {exam.score}점
                  </span>
          )}
        </div>
      </div>

      <div className="border-t pt-4 flex justify-end">
        {exam.status === 'took' ? (
          <NavLink
            to={`/course/${courseId}/exam/${exam.id}/review`}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            결과 확인
          </NavLink>
        ) : (
          <NavLink
            to={`/course/${courseId}/exam/${exam.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium
                    ${exam.status === 'can_take' ?
              'bg-blue-600 text-white hover:bg-blue-700' :
              'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
          >
            {exam.status === 'can_take' ? '시험 시작' : '이어서 진행'}
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default ExamCard;