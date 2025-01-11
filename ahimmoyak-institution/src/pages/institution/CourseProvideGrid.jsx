import {useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";


const CourseProvideGrid = () => {
    const [rowData, setRowData] = useState([]);
    const fileName = "course-provides";
    const axiosInstance  = AxiosManager();


    useEffect(() => {
        const fetchData = () => {
            axiosInstance.get(
                `analysis/api/aggrid/${fileName}`)
                .then(response => {
                const data = response.data || [];
                const updatedData = data.map(course => {
                    const companies = course.companies || [];
                    const companyCount = companies.length;
                    const totalStudents = companies.reduce((sum, company) => sum + (company.numberOfStudents || 0), 0);
                    return {
                        ...course,
                        companyCount,
                        totalStudents,
                    };
                });
                setRowData(updatedData);
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        };
        fetchData();
    }, []);

    const columnDefs = useMemo(() => [
        {
            field: 'courseName',
            headerName: 'Course Name',
            cellRenderer: 'agGroupCellRenderer',
            sortable: true,
            filter: true,
            minWidth: 300,
        },
        {
            field: 'instructorName',
            headerName: 'Instructor Name',
            sortable: true,
            filter: true,
        },
        {
            field: 'companyCount',
            headerName: 'Number of Companies',
            sortable: true,
            filter: true,
            minWidth: 150,
        },
        {
            field: 'totalStudents',
            headerName: 'Number of Students',
            sortable: true,
            filter: true,
            minWidth: 150,
        },
    ], []);

    const detailCellRendererParams = useMemo(() => ({
        detailGridOptions: {
            columnDefs: [
                { headerName: 'Company Name', field: 'companyName', sortable: true, filter: true, minWidth: 200 },
                { headerName: 'Start Date', field: 'startDate', sortable: true, filter: true, minWidth: 150 },
                { headerName: 'End Date', field: 'endDate', sortable: true, filter: true, minWidth: 150 },
                { headerName: 'Number of Students', field: 'numberOfStudents', sortable: true, filter: true, minWidth: 150 },
            ],
        },
        getDetailRowData: (params) => {
            params.successCallback(params.data.companies);
        },
    }), []);

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                masterDetail={true}
                detailCellRendererParams={detailCellRendererParams}
                pagination={true}
                paginationPageSize={10}
                defaultColDef={{ resizable: true }}
            />
        </div>
    );
};

export default CourseProvideGrid;
