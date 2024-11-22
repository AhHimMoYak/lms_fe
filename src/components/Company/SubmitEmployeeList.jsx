import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";

import "/src/styles/Company/SubmitEmployeeList.css"

const SubmitEmployeeList = ({courseProvideId, attendeeCount }) => {
    const navigate = useNavigate();
    const { data: employee, fetchData: fetchEmployee } = useAxios();
    const {data: submitEmployees, fetchData: fetchSubmitEmployees} = useAxios();

    const [filterEmployees, setFilterEmployees] = useState([]);
    const [displayedEmployees, setDisplayedEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const employeesPerLoad = 10;
    const loaderRef = useRef(null);

    useEffect(() => {
        fetchEmployee("/company/employees", "GET");
    }, []);

    useEffect(() => {
        if (employee) {
            const employeesWithIndex = employee.map((emp, index) => ({
                ...emp,
                originalIndex: index + 1,
            }));
            setFilterEmployees(employeesWithIndex);
            setDisplayedEmployees(employeesWithIndex.slice(0, employeesPerLoad));
            console.log("courseProvideId : " +courseProvideId)
            console.log("attendeeCount: "+ attendeeCount)

        }
    }, [employee]);

    const loadMoreEmployees = () => {
        const currentLength = displayedEmployees.length;
        const moreEmployees = filterEmployees.slice(
            currentLength,
            currentLength + employeesPerLoad
        );
        setDisplayedEmployees((prev) => [...prev, ...moreEmployees]);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreEmployees();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [displayedEmployees]);

    const handleCheckboxChange = (employeeName) => {
        setSelectedEmployees((prev) =>
            prev.includes(employeeName)
                ? prev.filter((name) => name !== employeeName)
                : [...prev, employeeName]
        );
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedEmployees([]);
            setIsAllSelected(false);
        } else {
            const allEmployeeNames = filterEmployees.map((employee) => employee.name);
            setSelectedEmployees(allEmployeeNames);
            setIsAllSelected(true);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = employee
            .filter((emp) => emp.name.includes(searchTerm) || emp.username.includes(searchTerm))
        setFilterEmployees(filtered);
        setDisplayedEmployees(filtered.slice(0, employeesPerLoad));
    };

    const handleSubmit = (userName, id) => {
        if (selectedEmployees.length === 0) {
            alert("선택된 사원이 없습니다.");
            return;
        }

        if (selectedEmployees.length > attendeeCount) {
            alert(`수강 신청 가능한 인원을 초과했습니다.`);
            return;
        }


        const payload = {
            courseProvideId: courseProvideId,
            employeeUserName: selectedEmployees,
        };

        fetchSubmitEmployees("/company/courseProvide/employees", "POST", payload)
            .then((response) => {
                alert("수강신청이 완료되었습니다.");
                navigate("/company/courseProvide/list");
            })
            .catch((error) => {
                alert(`수강신청중 오류가 발생했습니다. 다시한번 시도해주세요`);
                console.error("에러 세부사항:", error.response || error);
            });
    };


    return (
        <div className="employee-submit-page">
            <div className="employee-submit-container">
                <h2 className="employee-submit-title">수강 신청할 사원</h2>
                <div className="employee-submit-attendeeCount">
                    수강 가능 인원: {attendeeCount}
                </div>

                <div className="employee-submit-header">
                    <div className="employee-submit-filter">
                        <input
                            type="text"
                            placeholder="사원이름 이나 아이디를 입력하세요"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    <div className="selected-count">
                        선택된 사원 수: {selectedEmployees.length}
                    </div>
                </div>

                <table className="employee-submit-table">
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>No.</th>
                        <th>ID</th>
                        <th>이름</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedEmployees.map((employee, index) => (
                        <tr
                            key={employee.name}
                            className="clickable-row"
                            onClick={() => handleCheckboxChange(employee.name)}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedEmployees.includes(employee.name)}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleCheckboxChange(employee.name)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{employee.username}</td>
                            <td>{employee.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div ref={loaderRef} className="loader">
                    {displayedEmployees.length < filterEmployees.length && "더 불러오는 중..."}
                </div>
                <div className="employee-submit-button">
                    <button
                        id="submitButton"
                        name="submitButton"
                        onClick={() => handleSubmit(employee.username, courseProvideId)}>수강신청하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitEmployeeList;
