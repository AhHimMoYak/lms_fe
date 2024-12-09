import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AxiosManager from "../components/authentication/AxiosManager.jsx";

const CourseEvaluationGrid = () => {
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState(null);
    const axiosInstance  = AxiosManager();
    const fileName = "course-rate-data";

    // 컬럼 정의
    const columnDefs = [
        { headerName: "코스 명", field: "courseName", sortable: true, filter: true },
        {
            headerName: "시작 날짜",
            field: "validPeriod.startDate",
            sortable: true,
            filter: "agDateColumnFilter"
        },
        {
            headerName: "종료 날짜",
            field: "validPeriod.endDate",
            sortable: true,
            filter: "agDateColumnFilter"
        },
        {
            headerName: "심사 등급",
            field: "evaluationGrade",
            sortable: true,
            filter: true
        }
    ];

    // JSON 데이터 로드
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                axiosInstance.get(`analysis/api/aggrid/${fileName}`)
                    .then((response) => {
                        setRowData(response.data);
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
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
