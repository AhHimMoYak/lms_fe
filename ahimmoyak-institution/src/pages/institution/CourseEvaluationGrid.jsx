import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CourseEvaluationGrid = () => {
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState(null);
    const axiosInstance = AxiosManager();
    const fileName = "course-rate-data";

    // 컬럼 정의
    const columnDefs = [
        {
            headerName: "코스 명",
            field: "courseName",
            sortable: true,
            filter: true,
            cellStyle: params => getCourseStyle(params)
        },
        {
            headerName: "시작 날짜",
            field: "validPeriod.startDate",
            sortable: true,
            filter: "agDateColumnFilter",
            cellStyle: params => getCourseStyle(params)
        },
        {
            headerName: "종료 날짜",
            field: "validPeriod.endDate",
            sortable: true,
            filter: "agDateColumnFilter",
            cellStyle: params => getCourseStyle(params)
        },
        {
            headerName: "심사 등급",
            field: "evaluationGrade",
            sortable: true,
            filter: true,
            cellStyle: params => getCourseStyle(params)
        }
    ];

    // 스타일 적용 함수
    const getCourseStyle = (params) => {
        const today = new Date();
        const endDate = new Date(params.data?.validPeriod?.endDate);

        if (endDate < today) {
            return { color: "gray", fontWeight: "normal" };  // 종료된 코스
        }
        return { fontWeight: "bold" };  // 진행 중인 코스
    };

    // JSON 데이터 로드
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axiosInstance.get(`analysis/api/aggrid/${fileName}`);
                const sortedData = response.data.sort((a, b) => {
                    const today = new Date();
                    const endDateA = new Date(a.validPeriod.endDate);
                    const endDateB = new Date(b.validPeriod.endDate);

                    // 진행 중인 코스 우선 정렬
                    if (endDateA >= today && endDateB < today) return -1;
                    if (endDateA < today && endDateB >= today) return 1;

                    // 종료 날짜 순 정렬
                    return endDateA - endDateB;
                });
                setRowData(sortedData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCourseData();
    }, []);

    if (error) return <p>에러 발생: {error}</p>;

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "80%", margin: "auto" }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                    flex: 1,
                    minWidth: 150,
                    filter: true,
                    sortable: true,
                    resizable: true
                }}
            />
        </div>
    );
};

export default CourseEvaluationGrid;
