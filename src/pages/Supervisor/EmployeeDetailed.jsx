import {useEffect} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/EmployeeDetailed.css'
import {useNavigate, useParams} from "react-router-dom";

function EmployeeDetailed() {

    const {id} = useParams();
    const navigate = useNavigate();
    const {data: employee, error, fetchData: fetchUserId} = useAxios();
    const {fetchData: deleteDepartmentData} = useAxios();
    const {data: course, fetchData: fetchUserCourse} = useAxios();

    //사원의 상세 정보 가져오는 api
    useEffect(() => {
        if (id) {
            fetchUserId(`/supervisor/user?userId=${id}`, "GET");
            fetchUserCourse(`/course/userCourseList?userId=${id}`,"GET");
        }
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }


    const handleDelete = (departmentId, affiliationId) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if(confirmDelete){
            deleteDepartmentData(`/supervisor/user?userId=${id}`,"DELETE")
                .then(()=>{
                    alert("삭제가 완료되었습니다.");
                    navigate('/mypage/managed');
                })
                .catch((error) => {
                    alert("삭제에 실패했습니다. 다시 시도해주세요");
                })
        }
    }


    return (
        <div className="employeeDetailed-page">
            <div className="employeeDetailed-container">
                <h2 className="employeeDetailed-title">{employee.name} 사원의 상세 정보</h2>

                <div className="employeeDetailed-info">
                    <table className="employeeDetailed-info-table">
                        <thead>
                        <tr>
                            <th>사원 이름</th>
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

                <div className="employeeDetailed-buttons">
                    <button className="employeeDetailed-delete"
                    onClick={handleDelete}>삭제</button>
                </div>

                <dive className="employeeDetailed-course">
                    <h3>수강 중인 코스</h3>
                    <table className="employeeDetailed-course-table">
                        <thead>
                        <tr>
                            <th>코스 제목</th>
                            <th>훈련 기관</th>
                            <th>카테고리</th>
                            <th>수료 날짜</th>
                            <th>진행률</th>
                        </tr>
                        </thead>

                        <tbody>
                        {course && course.map((course, index) => (
                            <tr key={index}>
                                <td>{course.title}</td>
                                <td>{course.institutionName}</td>
                                <td>{course.category}</td>
                                <td>{course.endDate}</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${course.progress}%` }}></div>
                                        <span>{course.progress}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </dive>

            </div>
        </div>

    );
}

export default EmployeeDetailed;
