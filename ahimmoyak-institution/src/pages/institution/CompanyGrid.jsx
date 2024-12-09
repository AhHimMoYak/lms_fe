import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CompanyGrid = () => {
    const [rowData, setRowData] = useState([]);
    const fileName = "companies";
    const axiosInstance  = AxiosManager();

    useEffect(() => {
            try {
                axiosInstance.get(`analysis/api/aggrid/${fileName}`)
                    .then(response => {
                    setRowData(response.data)
               });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
    }, []);

    const columnDefs = [
        { headerName: 'Company Name', field: 'companyName', sortable: true, filter: true },
        { headerName: 'Location', field: 'location', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Representative', field: 'representative', sortable: true, filter: true },
        { headerName: 'Courses Offered', field: 'coursesOffered', sortable: true, filter: true },
        { headerName: 'Number of Employees', field: 'numberOfEmployees', sortable: true, filter: true }
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default CompanyGrid;
