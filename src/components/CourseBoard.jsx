import { useState, useEffect } from 'react';
import '../styles/CourseBoard.css';

// 테스트용 데이터
const testCourses = [
    { title: 'DataBase In Action1', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action2', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action3', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action4', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action5', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action6', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action7', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action8', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action9', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
    { title: 'DataBase In Action10', instructor: '이동림', period: 'yyyy.mm.dd ~ yyyy.mm.dd' },
];

function Courselist() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const courses = testCourses;
                setCourses(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        getCourses();
    }, []);

    return (
        <div className="course-table-container">
            <h2 className="coureslist-text">수강 신청 List</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>강사</th>
                    <th>강의 시청기간</th>
                    <th>진행상태</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.title}</td>
                        <td>{course.instructor}</td>
                        <td>{course.period}</td>
                        <td><button className="status-button">응답 (percent%)</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Courselist;
