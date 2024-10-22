import {useEffect} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/EmployeeDetailed.css'
import {useParams} from "react-router-dom";

function EmployeeDetailed() {

    const {id} = useParams();
    const {data: employee, error, fetchData: fetchUserId} = useAxios();

    useEffect(() => {
        console.log("현재 사원:", id)
    }, [id]);

    //사원의 상세 정보 가져오는 api
    useEffect(() => {
        if (id) {
            fetchUserId(`supervisor/user?userId=${id}`, "GET");
        }
    }, [id]);


    useEffect(() => {
        if (employee) {
            console.log(employee)
        }
    }, [employee]);

    if (!employee) {
        return <div>Loading...</div>;
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
        <div className="employeeDetailed-page">
            <div className="employeeDetailed-container">
                <h2 className="employeeDetailed-title">{employee.name} 사원의 상세 정보</h2>

                <div className="employeeDetailed-info">
                    <table className="employeeDetailed-info-table">
                        <thead>
                        <tr>
                            <th>사원이름</th>
                            <th>아이디</th>
                            <th>생년월일</th>
                            <th>부서</th>
                            <th>연락처</th>
                            <th>이메일</th>
                            <th>성별</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{employee.name}</td>
                            <td>{employee.username}</td>
                            <td>{employee.birth}</td>
                            <td>{employee.departmentName}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default EmployeeDetailed;
