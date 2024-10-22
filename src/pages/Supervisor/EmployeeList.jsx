import {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/EmployeeList.css'

function EmployeeList() {

    const { data: employees, error, fetchData: fetchEmployeeData } = useAxios();
    const {data: companyID ,fetchData: fetchCompanyIdData} = useAxios();
    const {fetchData: deleteDepartmentData} = useAxios();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);

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


    // const handleDelete = (departmentId, affiliationId) => {
    //     const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    //     if(confirmDelete){
    //         deleteDepartmentData(`/supervisor/department?companyId=${companyID}&affiliationId=${affiliationId}&departmentId=${departmentId}`,"DELETE")
    //             .then(()=>{
    //                 alert("삭제가 완료되었습니다.");
    //                 fetchEmployeeData()
    //             })
    //             .catch((error) => {
    //                 alert("삭제에 실패했습니다. 다시 시도해주세요");
    //                 console.log(error);
    //             })
    //     }
    //
    // }

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
                        <th>사원 이름</th>
                        <th>부서</th>
                        <th>성별</th>
                        <th>이메일</th>

                    </tr>
                    </thead>
                    <tbody>
                    {currentEmployees && currentEmployees.length > 0 ? (
                        currentEmployees.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.departmentName}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">사원이 없습니다.</td>
                        </tr>
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
