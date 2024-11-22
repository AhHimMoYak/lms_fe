import {useEffect} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";

import '/src/styles/Company/EmployeeDetailed.css'

const EmployeeDetailed = ({username}) => {

    const navigate = useNavigate();
    const {data: employee, err, fetchData: fetchEmployee} = useAxios();
    const {data: course, fetchData: fetchCourse} = useAxios();
    const {fetchData: deleteEmployee} = useAxios();

    useEffect(() => {
        fetchEmployee(`/user?username=${username}`, "GET");
        fetchCourse(`/course/user?userName=${username}`,"GET");
    }, [username]);
    

    if (!employee) {
        return <div>Loading...</div>
    }

    const handleDelete = (username) => {
        console.log(course)
        const confirmDelete = window.confirm("정말 삭제하시겠습니끼?");
        if (confirmDelete) {
            deleteEmployee(`/company/employees?username=${username}`, "DELETE")
                .then(() => {
                    alert("삭제가 완료되었습니다.");
                    navigate('/company/employees');
                })
                .catch((error) => {
                    alert("삭제에 실패했습니다. 다시 시도해주세요");
                })
        }
    }

    return (
        <div className="employeeDetailed-page">
            <div className="employeeDetailed-container">
                <h2 className="employeeDetailed-title">{employee.name} 사원 정보</h2>

                <div className="employeeDetailed-info">
                    <table className="employeeDetailed-info-table">
                        <thead>
                        <tr>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>전화번호</th>
                            <th>생년월일</th>
                            <th>성별</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{employee.username}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.birth}</td>
                            <td>{employee.gender}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="employeeDetailed-button">
                        <button className="employeeDetailed-delete"
                                onClick={() => handleDelete(employee.username)}>삭제</button>
                    </div>

                    <div className="employeeDetailed-course">
                        <h3>{employee.name} 사원 수강코스</h3>
                        <table className="employeeDetailed-course-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>코스 제목</th>
                                    <th>훈련 기관</th>
                                    <th>강사</th>
                                    <th>카테고리</th>
                                    <th>시작일</th>
                                    <th>수료일</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                            {course && course.map((course, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.institution}</td>
                                    <td>{course.instructor}</td>
                                    <td>{course.category}</td>
                                    <td>{course.beginDate}</td>
                                    <td>{course.endDate}</td>
                                    <td>{course.state}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetailed;