import React, { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";
import StudentSelectModal from "../../components/contract/StudentSelectModal.jsx";
import axios from "axios";
import stringSimilarity from "string-similarity";

const ContractManagement = () => {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const API_URL = "http://localhost:8080";

  const normalizeText = (text) => {
    return text.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9가-힣]/gi, "");
  };

  const fetchContracts = async () => {
    try {
      const response = await axios.get(
          `${API_URL}/v1/companies/courseProvides/list?userId=2`,
          {
            withCredentials: true,
          }
      );
      console.log("Contracts Data:", response.data);
      setContracts(response.data);
    } catch (e) {
      console.error("Error fetching contracts:", e.response || e.message);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const getStatusBadge = (state) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-blue-100 text-blue-800",
      DECLINED: "bg-red-100 text-red-800",
      ATTENDEE_PENDING: "bg-purple-100 text-purple-800",
      NOT_STARTED: "bg-green-100 text-green-800",
      ONGOING: "bg-indigo-100 text-indigo-800",
    };
    return `px-2 py-1 rounded-full text-sm ${
        styles[state] || "bg-gray-100 text-gray-800"
    }`;
  };

  const handleStudentSelect = (contract) => {
    setSelectedContract(contract);
    setShowStudentModal(true);
  };

  const filteredContracts = contracts.filter((contract) => {
    const normalizedTitle = normalizeText(contract.title); // 제목 정규화
    const normalizedQuery = normalizeText(searchQuery); // 검색어 정규화

    if (normalizedTitle.includes(normalizedQuery)) {
      return true;
    }

    const similarity = stringSimilarity.compareTwoStrings(
        normalizedTitle,
        normalizedQuery
    );
    return similarity > 0.5;
  });

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
                  placeholder="계약 검색..."
                  value={searchQuery} // 검색어 상태를 입력 필드와 연결
                  onChange={(e) => setSearchQuery(e.target.value)} // 상태 업데이트
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  과정명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  교육기관
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  강사
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  신청일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  시작일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  종료일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  계약금
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  인원
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  관리
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                  <tr key={contract.courseId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{contract.title}</td>
                    <td className="px-6 py-4">{contract.institutionName}</td>
                    <td className="px-6 py-4">{contract.instructor}</td>
                    <td className="px-6 py-4">{contract.creationDate}</td>
                    <td className="px-6 py-4">{contract.beginDate}</td>
                    <td className="px-6 py-4">{contract.endDate}</td>
                    <td className="px-6 py-4">{contract.deposit}원</td>
                    <td className="px-6 py-4">{contract.attendeeCount}명</td>
                    <td className="px-6 py-4">
                    <span className={getStatusBadge(contract.state)}>
                      {contract.state}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                      {contract.state === "ACCEPTED" && (
                          <button
                              onClick={() => handleStudentSelect(contract)}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Users className="h-4 w-4 mr-1" />
                            수강생 선택
                          </button>
                      )}
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </main>

        {showStudentModal && (
            <StudentSelectModal
                isOpen={showStudentModal}
                onClose={() => setShowStudentModal(false)}
                contract={selectedContract}
                onSubmit={(students) => {
                  console.log("Selected students:", students);
                  setShowStudentModal(false);
                }}
            />
        )}
      </>
  );
};

export default ContractManagement;
