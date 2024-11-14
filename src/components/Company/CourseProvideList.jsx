import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";

import "/src/styles/Company/CourseProvideList.css"

const CourseProvideList = () => {

    const {data, err, fetchData} = useAxios();
    const [companyName, setCompanyName] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const courseProvideListPage = 10;
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchData('/company/courseProvide/list', "GET");
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setCompanyName(data[0].companyName);
            setFilterEmployees(data);
            setTotalPage(Math.ceil(data.length / courseProvideListPage));
        } else {
            setCompanyName("");
            setCurrentPage(1);
            setTotalPage(1);
        }
    }, [data]);

    const indexOfLastEmployee = currentPage * courseProvideListPage;
    const indexOfFirstEmployee = indexOfLastEmployee - courseProvideListPage;
    const currentCourse = filterEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="courseProvide-page">
            <div className="courseProvide-container">
                <h2 className="courseProvide-title">
                    {companyName ? `${companyName}의 수강 신청 목록` : "수강 신청 목록"}
                </h2>
                <table className="courseProvide-table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>코스 이름</th>
                        <th>훈련 기관</th>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>수강 인원</th>
                        <th>금액</th>
                        <th>수강신청 상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentCourse && currentCourse.length > 0 ? (
                        currentCourse.map((course, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstEmployee +index + 1}</td>
                                <td>{course.courseTitle}</td>
                                <td>{course.institutionName}</td>
                                <td>{course.beginDate}</td>
                                <td>{course.endDate}</td>
                                <td>{course.attendeeCount}</td>
                                <td>{course.deposit}</td>
                                <td>{course.state}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="no-courseProvid">수강신청 목록이 없습니다.</td>
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
export default CourseProvideList;