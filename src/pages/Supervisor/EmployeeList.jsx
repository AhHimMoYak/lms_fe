import {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/EmployeeList.css'
import {useNavigate} from "react-router-dom";

function EmployeeList() {

    const navigate = useNavigate();

    const { data: employees, error, fetchData: fetchEmployeeData } = useAxios();
    const {data: companyID ,fetchData: fetchCompanyIdData} = useAxios();
    const {fetchData: deleteDepartmentData} = useAxios();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    // 1. 회사 id 가져오는 useEffect
    useEffect(() => {
        fetchCompanyIdData("/users/companyId", "GET");
    },[]);

    //2. 가져온 회사 id 로 회사 직원 가져오는 useEffect
    useEffect(() => {
        if (companyID) {
            fetchEmployeeData(`/supervisor/?companyId=${companyID}`, "GET");
        }
    }, [companyID]);

    //3. 필터링된 직원 목록 초기화
    useEffect(() => {
        if(employees){
            setFilterEmployees(employees)
            setTotalPages(Math.ceil(employees.length / employeesPerPage))
        }
    }, [employees]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filterEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handleSort = (key) => {
        let direction = 'ascending';
        if(sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});

        const sortedEmployees = [...filterEmployees].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setFilterEmployees(sortedEmployees);
    }

    const handleSearch = () => {
        if (searchTerm) {
            const filtered = employees.filter((employee) =>
                employee.name.includes(searchTerm) ||
                employee.email.includes(searchTerm)
            );
            setFilterEmployees(filtered);
            setCurrentPage(1);
            setTotalPages(Math.ceil(filtered.length / employeesPerPage));
        }
    };

    const handleReset = () => {
        setFilterEmployees(employees);
        setSearchTerm("");
        setCurrentPage(1);
        setTotalPages(Math.ceil(employees.length / employeesPerPage));
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleRowClick = (userId) => {
        navigate(`/mypage/managed/:${userId}`);
    };

    return (
        <div className="employeeList-page">
            <div className="employeeList-container">
                <h2 className="employeeList-title">사원 목록</h2>

                <div className="employeeList-filter">
                    <input
                        type="text"
                        placeholder="사원 이름 또는 이메일을 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button id="searchButton" name="searchButton" onClick={handleSearch}>검색</button>
                    <button id="resetButton" name="resetButton" onClick={handleReset}>초기화</button>
                </div>

                <table className="employeeList-table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th onClick={() => handleSort('name')} className="sortable">
                            사원 이름 {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('departmentName')} className="sortable">
                            부서 {sortConfig.key === 'departmentName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                        <th>성별</th>
                        <th>이메일</th>

                    </tr>
                    </thead>
                    <tbody>
                    {currentEmployees && currentEmployees.length > 0 ? (
                        currentEmployees.map((user, index) => (
                            <tr key={user.id} onClick={()=> handleRowClick(user.id)} className="clickable-row">
                                <td>{indexOfFirstEmployee + index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.departmentName}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>

                            </tr>
                        ))
                    ) : (
                        Array.from({ length: employeesPerPage }).map((_, idx) => (
                            <tr key={idx}>
                                <td colSpan="5">{idx === 0 ? '사원이 없습니다.' : ''}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                <div className="pagination">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => handlePageChange(page + 1)}
                            className={currentPage === page + 1 ? "active" : "pagination"}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>


    );
}

export default EmployeeList;
