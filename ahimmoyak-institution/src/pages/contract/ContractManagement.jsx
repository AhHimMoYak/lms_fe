import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import {useNavigate} from "react-router-dom";

const ContractManagement = () => {

  const contracts = [
    {
      id: 1,
      courseTitle: 'React 개발 실무',
      company: '메가존 클라우드',
      requestDate: '2024-01-15',
      startDate: '2024-02-01',
      studentCount: 15,
      status: '신청중',
    },
    {
      id: 2,
      courseTitle: '프로젝트 관리',
      company: '아힘모약',
      requestDate: '2024-01-10',
      startDate: '2024-03-01',
      studentCount: 10,
      status: '수락됨',
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      '신청중': 'bg-yellow-100 text-yellow-800',
      '수락됨': 'bg-blue-100 text-blue-800',
      '승인대기': 'bg-purple-100 text-purple-800',
      '승인완료': 'bg-green-100 text-green-800'
    };
    return `px-2 py-1 rounded-full text-sm ${styles[status]}`;
  };

  const navigate = useNavigate();

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
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
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
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/contracts/${contract.id}`)}>
                <td className="px-6 py-4">{contract.courseTitle}</td>
                <td className="px-6 py-4">{contract.company}</td>
                <td className="px-6 py-4">{contract.requestDate}</td>
                <td className="px-6 py-4">{contract.startDate}</td>
                <td className="px-6 py-4">{contract.studentCount}명</td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(contract.status)}>{contract.status}</span>
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