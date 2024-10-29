import {useEffect} from "react";

import '../../styles/CourseListCss.css'
import useAxios from "../../hooks/api/useAxios.jsx";
import {useLocation, useNavigate} from "react-router-dom";

function CourseList() {

    const navigate = useNavigate()

    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const {data: courseData, error, fetchData: fetchUserCourse} = useAxios();

    useEffect(() => {
        fetchUserCourse(`/course`, "GET");
    }, []);

    useEffect(() => {
        if (courseData) {
            console.log(courseData);
        }
    }, [courseData]);

    const handleRowClick = (courseid) => {
        navigate(`/mypage/course/${courseid}`)
    }

    const course = courseData ?? [];
    const totalPages = courseData?.totalPages ?? 1;

    const handlePageChange = (newPage) => {
        navigate(`?page=${newPage}`)
    }

    return (
        <div className="mycourse-list-container">
            <div className="mycourse-list">
                <h3 className="mycourse-list-title">수강 중인 코스</h3>
                <table className="mycourse-list-table">
                    <thead>
                    <tr>
                        <td>No.</td>
                        <th>코스 제목</th>
                        <th>강사</th>
                    </tr>
                    </thead>

                    <tbody>
                    {course && course.length > 0 ? (
                        course.map((courseItem, index) => (
                            <tr key={index} onClick={() => handleRowClick(course[index].id)}
                                className="course-clickable-row">
                                <td>No.{index+1}</td>
                                <td>{courseItem.title}</td>
                                <td>{courseItem.tutor || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">수강 중인 코스가 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="courselist-pagination"></div>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className= {`pagination-button ${page === index + 1 ? "active" : ""}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CourseList;
