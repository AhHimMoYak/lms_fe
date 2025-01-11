import {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import "../../styles/Company/EmployeeList.css";
import {useNavigate} from "react-router-dom";

const EmployeeList = () => {

    const navigate = useNavigate();
    const {data, fetchData} = useAxios();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [totalPage, setTotalPage] = useState(1);
    const [sort, setSort] = useState({key: '', direction: ''});

    useEffect(() => {
        fetchData("http://localhost:8083/api/v1/companies/employees", "GET");
    }, []);

    useEffect(() => {
        if (data) {
            setFilterEmployees(data);
            setTotalPage(Math.ceil(data.length / employeesPerPage));
        }
    }, [data]);

    const handleSearch = () => {
        if (searchTerm) {
            const filtered = data.filter((data) =>
                data.name.includes(searchTerm) ||
                data.username.includes(searchTerm)
            );
            setFilterEmployees(filtered);
            setCurrentPage(1);
            setTotalPage(Math.ceil(filtered.length / employeesPerPage));
        }
    }

    const handleReset = () => {
        setFilterEmployees(data);
        setSearchTerm("");
        setCurrentPage(1);
        setTotalPage(Math.ceil(data.length / employeesPerPage));
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sort.key === key && sort.direction === 'ascending') {
            direction = 'descending';
        }
        setSort({key, direction});

        const sortEmployees = [...filterEmployees].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setFilterEmployees(sortEmployees);
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filterEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleRowClick = (username) => {
        navigate(`/company/employees/info`, { state: { username } });
    }

    return (
        <div className="employeeList-page">
            <div className="employeeList-container">
                <h2 className="employeeList-title">사원 목록</h2>

                <div className="employeeList-filter">
                    <input
                        type="text"
                        placeholder="사원이름 이나 아이디를 입력하세요"
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
                        <th>Id</th>
                        <th onClick={() => handleSort('name')} className="sortable">
                            이름 {sort.key === 'name' && (sort.direction === 'ascending' ? '↑' : '↓')}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentEmployees && currentEmployees.length > 0 ? (
                        currentEmployees.map((user, index) => (
                            <tr key={user.id} onClick={()=>handleRowClick(user.username)} className="clickable-row">
                                <td>{indexOfFirstEmployee + index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-employees">사원이 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="pagination">
                    {[...Array(totalPage).keys()].map((page) => (
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