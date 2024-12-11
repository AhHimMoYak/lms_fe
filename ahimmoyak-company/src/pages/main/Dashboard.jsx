import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const API_URL = 'http://localhost:8080';
    const [dashboardData, setDashboardData] = useState({
        employeeCount: 0,
        ongoingCount: 0,
        pendingCount: 0,
    });
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = 2; // 사용자 ID를 설정 (필요에 따라 동적으로 변경)
                const response = await axios.get(`${API_URL}/v1/companies/dashboard/info`, {
                    params: { userId },
                });
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false); // 로딩 상태 해제
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">데이터 로딩 중...</p>
            </div>
        );
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">대시보드</h2>
                </div>
            </header>
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="전체 직원 수" value={`${dashboardData.employeeCount}명`} />
                    <Card title="진행중인 교육" value={`${dashboardData.ongoingCount}개`} />
                    <Card title="대기중인 계약" value={`${dashboardData.pendingCount}건`} />
                </div>
            </main>
        </>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);

export default Dashboard;
