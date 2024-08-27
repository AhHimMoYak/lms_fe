import {useState, useEffect} from 'react';
import '../styles/CourseBoard.css';
import useAxios from "../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";
import Pagination from "./Pagination.jsx";

function CourseBoard() {
    const [courses, setCourses] = useState([]);
    const {fetchData, data, error} = useAxios()
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);

    useEffect(() => {
        fetchData("/enrollment/course", "get");
    }, []);

    useEffect(() => {
        console.log(data)
        if (Array.isArray(data)) {
            setCourses(data);
        }
    }, [data]);
    const handleTitleClick = (id) => {
        navigate(`/mypage/course/${id}`,{
            state :{
                courseId:id
            }
        });
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="course-table-container">
            <h2 className="coureslist-text">수강 신청 List</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th className="list-top">No.</th>
                    <th className="list-top">제목</th>
                    <th className="list-top">강사</th>
                    <th className="list-top">강의 시청기간</th>
                    <th className="list-top">진행상태</th>
                </tr>
                </thead>
                <tbody>
                {currentCourses.map((course, index) => (
                    <tr key={index}>
                        <td className="list-content">{indexOfFirstCourse+index + 1}</td>
                        <a href="#"
                           onClick={(e)=> {
                               e.preventDefault();
                               handleTitleClick(course["courseId"]);}} className="list-url">{course.title}</a>
                        <td className="list-content">{course["instructor"]}</td>
                        <td className="list-content">{course["period"]}</td>
                        <td className="list-content">
                            <button className="status-button">응답 (percent%)</button>
                        </td>
                    </tr>

                ))}
                </tbody>
            </table>
            <Pagination
                coursesPerPage={coursesPerPage}
                totalCourses={courses.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default CourseBoard;
