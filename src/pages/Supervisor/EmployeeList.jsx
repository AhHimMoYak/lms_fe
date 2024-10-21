import {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/EmployeeList.css'
import {useLocation, useParams} from "react-router-dom";

function EmployeeList() {
    const {companyId, departmentId} = useParams()
    const {data, error, fetchData} = useAxios();
    const {campanyIdData, companyIdError, companyIdfetchData} = useAxios();


    useEffect(() => {
        fetchData(`/api/v1/supervisor/?${companyId}`, "GET");
    }, [companyId]);

    console.log(data)
    //if(error) return <div className="employeeList-error">오류가 발생했습니다: {error.message}</div>

    return (
        <div className="employeeList-page">
            <div className="employeeList-container">
                <h2 className="employeeList-title">사원 목록</h2>

                <div className="employeeList-filter">
                    <input type="text" placeholder="검색어를 입력하세요"/>
                    <button>검색</button>
                    <button>초기화</button>
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
                    {data && data.length > 0 ? (
                        data.map((user, index) => (
                            <tr key={user.email}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                {/*<td>{user.departmentName}</td>*/}
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button>수정</button>
                                </td>
                                <td>
                                    <button>삭제</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">사원이 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button>1</button>
                    <button>2</button>
                </div>
            </div>
        </div>


    );
}

export default EmployeeList;
