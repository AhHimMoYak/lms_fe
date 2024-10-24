// Video.jsx
import React, { useEffect, useState, memo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import CourseList from "../../components/CourseList.jsx";
import "../../styles/VideoPage.css"; // 새로운 외부 CSS 파일 추가
import CourseSidebar from '../../components/Main/CourseSidebar.jsx';
import '../../styles/CourseSidebar.css'; // CourseSidebar 관련 CSS 파일 추가

const MemoizedCourseSidebar = memo(CourseSidebar);

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
        <div className="video-page-container">
            <MemoizedCourseSidebar onCategorySelect={handleCategorySelect} />
            <div className="course-list-container">
                <h2 className="category-title">{selectedCategoryTitle}</h2>
                <CourseList
                    selectedCategory={selectedCategory}
                    currentPage={currentPage}
                    setLoading={setLoading}
                    setTotalCourses={setTotalCourses}
                />
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage <= 1}
                    >
                        이전
                    </button>
                    <span className="pagination-info">페이지 {currentPage} / {Math.ceil(totalCourses / 12)}</span>
                    <button
                        className="pagination-button"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalCourses / 12)))}
                        disabled={currentPage >= Math.ceil(totalCourses / 12)}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Video;