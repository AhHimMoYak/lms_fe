import React from 'react';
import { Users } from 'lucide-react';

const ContractDetail = () => {
  const contract = {
    id: 1,
    courseTitle: 'React 개발 실무',
    courseDuration: 30,
    courseInstructor: '김강사',
    company: '메가존 클라우드',
    department: '교육팀',
    manager: '홍길동',
    contact: '010-1234-5678',
    email: 'hong@example.com',
    requestDate: '2024-01-15',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    studentCount: 15,
    status: '승인대기',
    students: [
      { id: 1, name: '김학생', department: '개발1팀', position: '사원' },
      { id: 2, name: '이학생', department: '개발2팀', position: '대리' }
    ]
  };

  const getStatusBadge = (status) => {
    const styles = {
      '신청중': 'bg-yellow-100 text-yellow-800',
      '수락됨': 'bg-blue-100 text-blue-800',
      '승인대기': 'bg-purple-100 text-purple-800',
      '승인완료': 'bg-green-100 text-green-800'
    };
    return `px-2 py-1 rounded-full text-sm ${styles[status]}`;
  };

  const renderActionButtons = () => {
    switch(contract.status) {
      case '신청중':
        return (
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              수락
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              거절
            </button>
          </div>
        );
      case '승인대기':
        return (
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              승인
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              거절
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">계약 관리</h2>
        </div>
      </header>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{contract.courseTitle}</h1>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-4">과정 정보</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">교육기간</div>
                    <div>{contract.courseDuration}일</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">강사</div>
                    <div>{contract.courseInstructor}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">회사 정보</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">회사명</div>
                    <div>{contract.company}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">담당부서</div>
                    <div>{contract.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">담당자</div>
                    <div>{contract.manager}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">연락처</div>
                    <div>{contract.contact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">이메일</div>
                    <div>{contract.email}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">계약 정보</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">신청일</div>
                  <div>{contract.requestDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">교육 시작일</div>
                  <div>{contract.startDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">교육 종료일</div>
                  <div>{contract.endDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">교육 인원</div>
                  <div>{contract.studentCount}명</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">상태</div>
                  <span className={getStatusBadge(contract.status)}>{contract.status}</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">관리</div>
                  {renderActionButtons()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {(contract.status === '승인대기' || contract.status === '승인완료') && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">수강생 명단</h2>
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-5 h-5"/>
                <span>{contract.students.length}명</span>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">부서</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">직급</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {contract.students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.position}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ContractDetail;
