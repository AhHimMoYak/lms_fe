import React, { useEffect, useState, memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Main/Video.css";
import "../../styles/Main/MainCourseCardList.css";
import CourseSidebar from "../../components/Main/CourseSidebar.jsx";
import useAxios from "../../hooks/api/useAxios";

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
                ? `/course/all?category=${selectedCategory}&page=${currentPage}&size=12`
                : `/course/all?page=${currentPage}&size=12`;

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
        return <div className="error-message">Error fetching courses: {error.message}</div>;
    }

    const courses = response ? response.content : [];

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="video-page-container">
            <MemoizedCourseSidebar onCategorySelect={handleCategorySelect} />
            <div className="course-list-container">
                <h2 className="category-title">{selectedCategoryTitle}</h2>
                {loading ? (
                    <div className="LoadingContainer"></div>
                ) : courses.length === 0 ? (
                    <div className="NoCoursesText">해당 카테고리에는 코스가 없습니다.</div>
                ) : (
                    <div className="CourseCardContainer">
                        {courses.map((course, index) => {
                            const colors = ["#3F51B5", "#FF9800", "#9C27B0", "#4CAF50", "#009688", "#F44336"];
                            const diabledColor = "#999999";
                            return (
                                <div
                                    className="CourseCard"
                                    key={course.id}
                                    style={course.state === "NOT_STARTED"
                                        ? {background: colors[index % colors.length]}
                                        : {background: diabledColor, color: diabledColor}}
                                    onClick={() => handleCardClick(course.id)}
                                >
                                    <div className="CourseCardHeader"></div>
                                    <div className="CourseCardContent">
                                        <h3 className="CourseCardTitle">{course.title}</h3>
                                        <p className="CourseCardTutor">{course.tutor}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="PaginationContainer">
                    <button
                        className="pagination-button"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage <= 0}
                    >
                        이전
                    </button>
                    <span className="pagination-info">
                    페이지 {currentPage + 1} / {Math.ceil(totalCourses / 12)}
                </span>
                    <button
                        className="pagination-button"
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

