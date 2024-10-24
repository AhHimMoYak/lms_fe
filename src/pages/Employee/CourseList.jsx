import {useEffect} from "react";

import '/src/styles/CourseListCss.css'
import useAxios from "../../hooks/api/useAxios.jsx";
import {useLocation, useNavigate} from "react-router-dom";

function CourseList() {

    const navigate = useNavigate()

    const query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) || 1;
    const {data: courseData, error, fetchData: fetchUserCourse} = useAxios();

    useEffect(() => {
        fetchUserCourse(`/course/myPage?page=${page}&size=6`, "GET");
    }, [page]);

    useEffect(() => {
        if (courseData) {
            console.log(courseData);
        }
    }, [courseData]);

    const handleRowClick = (courseid) => {
        navigate(`/mypage/course/${courseid}`)
    }

    const course = courseData?.content ?? [];

    const courseid = courseData?.content[0].id ?? [];


    return (
        <div className="mycourse-list-container">
            <div className="mycourse-list">
                <h3 className="mycourse-list-title">수강 중인 코스</h3>
                <table className="mycourse-list-table">
                    <thead>
                    <tr>
                        <td>No.</td>
                        <th>코스 제목</th>
                        <th>카테고리</th>
                        <th>강사</th>
                    </tr>
                    </thead>

                    <tbody>
                    {course && course.length > 0 ? (
                        course.map((courseItem, index) => (
                            <tr key={index} onClick={()=>handleRowClick(courseid)} className="course-clickable-row">
                                <td>No.{courseItem.id}</td>
                                <td>{courseItem.title}</td>
                                <td>{courseItem.category || "N/A"}</td>
                                <td>{courseItem.tutorName || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">수강 중인 코스가 없습니다.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CourseList;
