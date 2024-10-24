import React, { useEffect } from "react";
import useAxios from "../hooks/api/useAxios.jsx";
import "../styles/CourseCard.css";

const CourseList = ({ selectedCategory, currentPage, setLoading, setTotalCourses }) => {
    const { data: response, error, fetchData } = useAxios();

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const url = `/course/main?categoryNum=${selectedCategory}&page=${currentPage}&size=12`;
            await fetchData(url, "GET");
            setLoading(false);
        };

        fetchCourses();
    }, [selectedCategory, currentPage]);

    useEffect(() => {
        if (response) {
            setTotalCourses(response.totalElements);
        }
    }, [response]);

    if (error) return <div>Error: {error.message}</div>;

    const courses = response ? response.content : [];

    return (
        <div className="course-container">
            {courses.length === 0 ? (
                <div>해당 카테고리에는 코스가 없습니다.</div>
            ) : (
                courses.map((course) => (
                    <div className="CourseCard" key={course.id}>
                        <img className="CourseCardMedia" src={course.image} alt={course.title} />
                        <div className="CourseCardContent">
                            <h3 className="CourseCardTitle">{course.title}</h3>
                            <p className="CourseCardTutor">{course.tutorName}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CourseList;