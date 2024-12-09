import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContractDetail = () => {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null); // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    axios
        .get(`http://localhost:8080/v1/institutions/${contractId}/courseProvideDetails`, {
          params: { userId: 3 },
        })
        .then((response) => {
          console.log('API Response:', response.data); // 디버깅용 API 응답 확인
          setContract(response.data); // 응답 데이터 설정
          setLoading(false); // 로딩 완료
        })
        .catch((error) => {
          console.error('데이터 로드 실패:', error);
          setLoading(false); // 로딩 종료
        });
  }, [contractId]);



  const getStatusBadge = (state) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-blue-100 text-blue-800',
      WAITING: 'bg-purple-100 text-purple-800',
      APPROVED: 'bg-green-100 text-green-800',
    };
    return `px-2 py-1 rounded-full text-sm ${styles[state] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleAction = (actionType) => {
    const endpoint =
        contract.state === "PENDING"
            ? `http://localhost:8080/v1/institutions/${contractId}/response?userId=3`
            : `http://localhost:8080/v1/institutions/${contractId}/registrations?userId=3`;

    const payload = {
      action: actionType.toUpperCase(),
    };

    axios
        .patch(endpoint, payload)
        .then((response) => {
          setContract((prev) => ({
            ...prev,
            state: response.data.action || actionType.toUpperCase(),
          }));
        })
        .catch((error) => {
          console.error("Action 실패:", error.response?.data?.message || error.message);
        });
  };


  const renderActionButtons = () => {
    if (!contract) return null;

    switch (contract.state) {
      case 'PENDING':
        return (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => handleAction('accept')}>
                수락
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => handleAction('reject')}>
                거절
              </button>
            </div>
        );
      case 'ACCEPTED':
        return (
            <div className="flex gap-3">
              <div>인원 선택 대기 중</div>
            </div>
        );
      case 'ATTENDEE_PENDING':
        return (
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={() => handleAction('approve')}>
                승인
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg"   onClick={() => handleAction('deny')}>
                거절
              </button>
            </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="p-6 text-center">데이터를 불러오는 중입니다...</div>;
  }

  if (!contract) {
    return (
        <div className="p-6 text-center text-red-500">
          데이터를 불러오지 못했습니다. 다시 시도해주세요.
        </div>
    );
  }

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
                      <div>{contract.period }일</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">강사</div>
                      <div>{contract.instructor}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-4">회사 정보</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">회사명</div>
                      <div>{contract.companyName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">교육 기관 명</div>
                      <div>{contract.institutionName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">연락처</div>
                      <div>{contract.phone}</div>
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
                    <div>{contract.createdDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">교육 시작일</div>
                    <div>{contract.beginDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">교육 종료일</div>
                    <div>{contract.endDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">교육 인원</div>
                    <div>{contract.attendeeCount}명</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">상태</div>
                    <span className={getStatusBadge(contract.state)}>{contract.state}</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">관리</div>
                    {renderActionButtons()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {contract.learnerList && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-medium">수강생 명단</h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users className="w-5 h-5" />
                    <span>{contract.learnerList.length}명</span>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {contract.learnerList.map((student) => (
                      <tr key={student.enrollmentId}>
                        <td className="px-6 py-4">{student.username}</td>
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
