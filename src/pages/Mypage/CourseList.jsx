import { useEffect, useState } from "react";
import "../../styles/Mypage/CourseList.css";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";
import { PlusSquare } from "react-feather";

function CourseList() {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(8); // 페이지 크기 설정
    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const { data: courseData, error, fetchData: fetchUserCourse } = useAxios();

    useEffect(() => {
        fetchUserCourse(`/course`, "GET");
    }, []);

    useEffect(() => {
        if (courseData) {
            console.log(courseData);
        }
    }, [courseData]);

    const handleRowClick = (courseid) => {
        if (decodeTokenTutor()) {
            navigate(`/education/course/${courseid}`);
        } else {
            navigate(`/mypage/course/${courseid}`);
        }
    };

    const handleCreateClick = () => {
        navigate("/education/manage/course/create");
    };

    const course = courseData ?? [];
    const totalCourses = course.length;
    const totalPages = Math.ceil(totalCourses / pageSize);

    // 현재 페이지에 해당하는 코스 목록 필터링
    const currentCourses = course.slice((page - 1) * pageSize, page * pageSize);

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`);
    };

    return (
        <div className="mycourse-list-container">
            <div className="mycourse-list">
                <div className="mycourse-list-title-container">
                    <div className="mycourse-list-title">{decodeTokenTutor() ? "나의 강좌" : "수강 중인 코스"}</div>
                    {decodeTokenTutor() ? <PlusSquare onClick={handleCreateClick} style={{ cursor: "pointer" }} /> : <div />}
                </div>
                <table className="mycourse-list-table">
                    <thead>
                        <tr>
                            <td>No.</td>
                            <th>코스 제목</th>
                            <th>강사</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentCourses && currentCourses.length > 0 ? (
                            currentCourses.map((courseItem, index) => (
                                <tr key={index} onClick={() => handleRowClick(currentCourses[index].id)} className="course-clickable-row">
                                    <td>No.{(page - 1) * pageSize + index + 1}</td>
                                    <td>{courseItem.title}</td>
                                    <td>{courseItem.tutor || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">{decodeTokenTutor() ? "등록된 강좌가 없습니다" : "수강 중인 코스가 없습니다"}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div
                    className="gap"
                    style={{
                        height: `${(pageSize - currentCourses.length) * 8}vh`,
                    }}
                ></div>

                <div className="courselist-pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`pagination-button ${page === index + 1 ? "active" : ""}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseList;
