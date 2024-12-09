import { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AxiosManager from "../components/authentication/AxiosManager.jsx";
const CompanyAttendanceGrid = () => {
    const [rawCourseData, setRawCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fileName = "company-attendance-data";
    const axiosInstance  = AxiosManager();

    useEffect(() => {
        // API 호출
        const fetchCourseData = async () => {
            try {
                axiosInstance.get(
                    `analysis/api/aggrid/${fileName}`
                ).then(response =>{
                    setRawCourseData(response.data);
                })
                // 응답 데이터 설정
                setLoading(false);
            } catch (err) {
                console.error("API 호출 에러:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCourseData();
    }, []);

    // 각 회사별 강좌 연결 횟수 및 출석율 계산
    const gridData = useMemo(() => {
        if (!rawCourseData.length) return [];

        const companyMap = new Map();

        rawCourseData.forEach((course) => {
            course.companies.forEach((company) => {
                if (!companyMap.has(company.companyName)) {
                    companyMap.set(company.companyName, {
                        companyName: company.companyName,
                        attendanceRates: [],
                        enrolledTotal: 0,
                        completedTotal: 0,
                        connectedCourses: 0,
                    });
                }

                const companyInfo = companyMap.get(company.companyName);
                companyInfo.attendanceRates.push(
                    company.enrolledStudents
                        ? (company.completedStudents / company.enrolledStudents) * 100
                        : 0
                );
                companyInfo.enrolledTotal += company.enrolledStudents;
                companyInfo.completedTotal += company.completedStudents;
                companyInfo.connectedCourses += 1;
            });
        });

        return Array.from(companyMap.values())
            .map((company) => ({
                ...company,
                averageAttendanceRate: company.enrolledTotal
                    ? (company.completedTotal / company.enrolledTotal) * 100
                    : 0,
            }))
            .sort((a, b) => b.averageAttendanceRate - a.averageAttendanceRate);
    }, [rawCourseData]);

    // 컬럼 정의
    const columnDefs = [
        { headerName: "회사명", field: "companyName", sortable: true, filter: true },
        {
            headerName: "평균 출석율 (%)",
            field: "averageAttendanceRate",
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                params.value ? params.value.toFixed(2) + "%" : "0%",
        },
        { headerName: "연결된 강좌 수", field: "connectedCourses", sortable: true, filter: true },
        { headerName: "총 수강생 수", field: "enrolledTotal", sortable: true, filter: true },
        { headerName: "총 완료 수강생 수", field: "completedTotal", sortable: true, filter: true },
    ];

    // 로딩 및 에러 처리
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error}</p>;

    return (
        <div style={{ width: "100%", height: "600px", marginBottom: "20px" }}>
            <div className="ag-theme-alpine" style={{height: "100%", width: "100%"}}>
                <AgGridReact
                    rowData={gridData}
                    columnDefs={columnDefs}
                    defaultColDef={{resizable: true}}
                    rowSelection="multiple"
                />
            </div>
        </div>
    );
};

export default CompanyAttendanceGrid;
