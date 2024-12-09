import {useEffect, useState} from 'react';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import axios from "axios";

const EmployeeManagement = () => {
  const [employees] = useState([
    { id: 1, name: '홍길동', email: 'hong@company.com' },
    { id: 2, name: '김영희', email: 'kim@company.com' },
  ]);

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
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"/>
            <input
              type="text"
              placeholder="직원 검색..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          {/*<button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg">*/}
          {/*  <Plus className="h-5 w-5" />*/}
          {/*  <span>직원 추가</span>*/}
          {/*</button>*/}
        </div>

        {/* 직원 테이블 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-red-600 hover:text-red-800 mx-2">
                    <Trash className="h-5 w-5"/>
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