import React, { useEffect, useState, memo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/CourseCard.css";
import CourseSidebar from '../../components/Main/CourseSidebar.jsx';

const MemoizedCourseSidebar = memo(CourseSidebar);

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

function Video() {
    const query = new URLSearchParams(useLocation().search);
    const initialCategory = parseInt(query.get("type")) || 1;
    const initialPage = parseInt(query.get("page")) || 1;
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalCourses, setTotalCourses] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("전체");

    const handleCategorySelect = useCallback((categoryId, categoryTitle) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
        setSelectedCategoryTitle(categoryTitle);
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100vh" }}>
            <MemoizedCourseSidebar onCategorySelect={handleCategorySelect} />
            <div style={{ flex: 1, padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{selectedCategoryTitle}</h2>
                <CourseList
                    selectedCategory={selectedCategory}
                    currentPage={currentPage}
                    setLoading={setLoading}
                    setTotalCourses={setTotalCourses}
                />
                <div className="pagination" style={{ textAlign: "center", marginTop: "20px" }}>
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage <= 1}>이전</button>
                    <span style={{ margin: "0 10px" }}>페이지 {currentPage} / {Math.ceil(totalCourses / 12)}</span>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalCourses / 12)))} disabled={currentPage >= Math.ceil(totalCourses / 12)}>다음</button>
                </div>
            </div>
        </div>
    );
}

export default Video;
