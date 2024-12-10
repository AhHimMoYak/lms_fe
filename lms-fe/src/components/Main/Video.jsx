import React, { useEffect, useState, memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Main/Video.css";
import "../../styles/Main/MainCourseCardList.css";
import CourseSidebar from "./CourseSidebar.jsx";
import useAxios from "../../hooks/api/useAxios.jsx";

const MemoizedCourseSidebar = memo(CourseSidebar);

function Video() {
    const query = new URLSearchParams(useLocation().search);
    const initialPage = parseInt(query.get("page")) || 0;
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalCourses, setTotalCourses] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("전체");

    const { data: response, error, fetchData } = useAxios();
    const navigate = useNavigate();

    const handleCategorySelect = useCallback((categoryValue, categoryTitle) => {
        setSelectedCategory(categoryValue);
        setCurrentPage(0);
        setSelectedCategoryTitle(categoryTitle);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);

            const url = selectedCategory && selectedCategory !== "ALL"
                ? `/courses/all?category=${selectedCategory}&page=${currentPage}&size=12`
                : `/courses/all?page=${currentPage}&size=12`;

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

    if (error) {
        return <div className="course-error-message">Error fetching courses: {error.message}</div>;
    }

    const courses = response ? response.content : [];

    const handleCardClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    return (
        <div className="course-video-page-container">
            <MemoizedCourseSidebar onCategorySelect={handleCategorySelect} />
            <div className="course-list-container">
                <h2 className="course-category-title">{selectedCategoryTitle}</h2>
                {loading ? (
                    <div className="course-LoadingContainer"></div>
                ) : courses.length === 0 ? (
                    <div className="course-NoCoursesText">해당 카테고리에는 코스가 없습니다.</div>
                ) : (
                    <div className="course-CourseCardContainer">
                        {courses.map((course, index) => {
                            const colors = ["#3F51B5", "#FF9800", "#9C27B0", "#4CAF50", "#009688", "#F44336"];
                            const diabledColor = "#999999";
                            return (
                                <div
                                    className="course-CourseCard"
                                    key={course.id}
                                    style={course.state === "NOT_STARTED"
                                        ? {background: colors[index % colors.length]}
                                        : {background: diabledColor, color: diabledColor}}
                                    onClick={() => handleCardClick(course.id)}
                                >
                                    <div className="course-CourseCardHeader"></div>
                                    <div className="course-CourseCardContent">
                                        <h3 className="course-CourseCardTitle">{course.title}</h3>
                                        <p className="course-CourseCardTutor">{course.tutor}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="course-PaginationContainer">
                    <button
                        className="course-pagination-button"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage <= 0}
                    >
                        이전
                    </button>
                    <span className="course-pagination-info">
                    페이지 {currentPage + 1} / {Math.ceil(totalCourses / 12)}
                </span>
                    <button
                        className="course-pagination-button"
                        onClick={() => setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(totalCourses / 12) - 1)
                        )}
                        disabled={currentPage >= Math.ceil(totalCourses / 12) - 1}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Video;

