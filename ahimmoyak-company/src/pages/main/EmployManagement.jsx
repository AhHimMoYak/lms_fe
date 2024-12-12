import { useEffect, useState } from "react";
import { Plus, Search, Trash } from "lucide-react";
import axios from "axios";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const API_URL = "http://localhost:8080";

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/employees`, {
        params: { userId: 2 },
        withCredentials: true,
      });
      setEmployees(response.data);
      console.log("Employees Data:", response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEmployee = async (userId, username) => {
    const confirmDelete = window.confirm(`정말 ${username}을(를) 삭제하시겠습니까?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/v1/companies/employees`, {
        params: { username },
        withCredentials: true,
      });
      setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.username !== username)
      );
      alert(`삭제가 완료되었습니다.`);
    } catch (e) {
      console.error("Failed to delete employee:", e);
      alert("직원 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // 검색어를 기준으로 필터링된 직원 목록 계산
  const filteredEmployees = employees.filter((employee) =>
      employee.username
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(
              searchTerm
                  .toLowerCase()
                  .replace(/\s+/g, "")
          )
  );

  return (
      <>
        <header className="bg-white shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">직원관리</h2>
          </div>
        </header>
        <div className="space-y-6 p-6">
          {/* 헤더 액션 */}
          <div className="flex justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                  type="text"
                  placeholder="직원 검색..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchTerm} // 검색어 상태 바인딩
                  onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경 이벤트
              />
            </div>
          </div>

          {/* 직원 테이블 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  이름
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  관리
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{employee.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                          className="text-red-600 hover:text-red-800 mx-2"
                          onClick={() => handleDeleteEmployee(2, employee.username)}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
};

export default EmployeeManagement;
