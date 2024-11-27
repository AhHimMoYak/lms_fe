import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "/src/styles/Company/CourseProvideList.css";

const CourseProvideList = () => {
    const { data, fetchData } = useAxios();
    const [companyName, setCompanyName] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [filteredByStatus, setFilteredByStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const courseProvideListPage = 10;
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();

    const statusMap = {
        ALL: "전체",
        PENDING: "대기중",
        DECLINED: "거절",
        ACCEPTED: "수락",
        ATTENDEE_PENDING: "수강인원 신청중",
        NOT_STARTED: "코스 시작전",
        ONGOING: "코스 진행중",
        FINISHED: "코스 완료",
        REMOVED: "코스 제거",
    };

    useEffect(() => {
        fetchData("http://localhost:8083/api/v1/companies/courseProvides/list", "GET");
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setCompanyName(data[0].companyName);
            setFilterEmployees(data);
            setFilteredByStatus(data); // Default to show all
            setTotalPage(Math.ceil(data.length / courseProvideListPage));
        } else {
            setCompanyName("");
            setCurrentPage(1);
            setTotalPage(1);
        }
    }, [data]);

    useEffect(() => {
        if (selectedStatus === "ALL") {
            setFilteredByStatus(filterEmployees);
            setTotalPage(Math.ceil(filterEmployees.length / courseProvideListPage));
        } else {
            const filtered = filterEmployees.filter(
                (course) => course.state === selectedStatus
            );
            setFilteredByStatus(filtered);
            setTotalPage(Math.ceil(filtered.length / courseProvideListPage));
        }
        setCurrentPage(1);
    }, [selectedStatus, filterEmployees]);

    const indexOfLastEmployee = currentPage * courseProvideListPage;
    const indexOfFirstEmployee = indexOfLastEmployee - courseProvideListPage;
    const currentCourse = filteredByStatus.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSendEnrollment = (courseProvideId, attendeeCount) => {
        navigate("/company/courseProvide/submit", {
            state: { courseProvideId, attendeeCount },
        });
    };

    const handleStatusFilterChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div className="courseProvide-page">
            <div className="courseProvide-container">
                <h2 className="courseProvide-title">
                    {companyName ? `${companyName}의 수강 신청 목록` : "수강 신청 목록"}
                </h2>

                <div className="filter-section">
                    <label htmlFor="statusFilter">수강신청 상태:</label>
                    <select
                        id="statusFilter"
                        value={selectedStatus}
                        onChange={handleStatusFilterChange}
                    >
                        {Object.entries(statusMap).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

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
                        <th>수강사원 선택</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentCourse && currentCourse.length > 0 ? (
                        currentCourse.map((course, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstEmployee + index + 1}</td>
                                <td>{course.courseTitle}</td>
                                <td>{course.institutionName}</td>
                                <td>{course.beginDate}</td>
                                <td>{course.endDate}</td>
                                <td>{course.attendeeCount}</td>
                                <td>{course.deposit}</td>
                                <td>{statusMap[course.state] || "알 수 없음"}</td>
                                <td>
                                    {course.state === "ACCEPTED" && (
                                        <button
                                            className="enroll-button"
                                            onClick={() =>
                                                handleSendEnrollment(
                                                    course.courseProvideId,
                                                    course.attendeeCount
                                                )
                                            }
                                        >
                                            사원 선택
                                        </button>
                                    )}
                                    {course.state === "ATTENDEE_PENDING" && (
                                        <button className="enroll-button" disabled>
                                            처리 중...
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="no-courseProvid">
                                수강신청 목록이 없습니다.
                            </td>
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
};

export default CourseProvideList;
