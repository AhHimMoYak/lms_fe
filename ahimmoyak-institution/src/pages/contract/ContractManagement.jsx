import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContractManagement = () => {
  const [contracts, setContracts] = useState([]); // 전체 계약 데이터
  const [filteredContracts, setFilteredContracts] = useState([]); // 검색된 계약 데이터
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 계약 목록 API 호출
    axios
        .get("http://localhost:8080/v1/institutions?userId=3")
        .then((response) => {
          const contractList = response.data.courseDetailResponseDtoList;
          setContracts(contractList);
          setFilteredContracts(contractList); // 초기 상태
        })
        .catch((error) => {
          console.error("데이터 로드 실패:", error);
        });
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    const filtered = contracts.filter(
        (contract) =>
            contract.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) || // 과정명 검색
            contract.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || // 회사명 검색
            contract.state.toLowerCase().includes(searchTerm.toLowerCase()) // 상태 검색
    );
    setFilteredContracts(filtered);
  }, [searchTerm, contracts]);

  const getStatusBadge = (state) => {
    const styles = {
      신청중: "bg-yellow-100 text-yellow-800",
      수락됨: "bg-blue-100 text-blue-800",
      승인대기: "bg-purple-100 text-purple-800",
      승인완료: "bg-green-100 text-green-800",
    };
    return `px-2 py-1 rounded-full text-sm ${styles[state]}`;
  };

  return (
      <>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">계약 관리</h2>
          </div>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <div className="relative w-96">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                  type="text"
                  placeholder="계약 검색 (과정명, 회사명, 상태)"
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">과정명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">회사</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시작일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">인원</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                  <tr
                      key={contract.courseProvideId}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/contracts/${contract.courseProvideId}`)}
                  >
                    <td className="px-6 py-4">{contract.courseTitle}</td>
                    <td className="px-6 py-4">{contract.companyName}</td>
                    <td className="px-6 py-4">{contract.createDate}</td>
                    <td className="px-6 py-4">{contract.beginDate}</td>
                    <td className="px-6 py-4">{contract.attendeeCount}명</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(contract.state)}>{contract.state}</span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </main>
      </>
  );
};

export default ContractManagement;
