import React, { useState, useCallback, memo } from "react";
import "../../styles/Main/CourseSidebar.css";

const CourseSidebar = memo(({ onCategorySelect }) => {
    const [categories] = useState([
        { id: 1, title: "전체" },
        { id: 2, title: "사업관리" },
        { id: 3, title: "경영·회계·사무" },
        { id: 4, title: "금융·보험" },
        { id: 5, title: "교육·자연·사회과학" },
        { id: 6, title: "법률·경찰·소방·교도·국방" },
        { id: 7, title: "보건·의료" },
        { id: 8, title: "사회복지·종교" },
        { id: 9, title: "문화·예술·디자인·방송" },
        { id: 10, title: "운전·운송" },
        { id: 11, title: "영업판매" },
        { id: 12, title: "경비·청소" },
        { id: 13, title: "이용·숙박·여행·오락·스포츠" },
        { id: 14, title: "음식서비스" },
        { id: 15, title: "건설" },
        { id: 16, title: "기계" },
        { id: 17, title: "재료" },
        { id: 18, title: "화학·바이오" },
        { id: 19, title: "섬유·의복" },
        { id: 20, title: "전기·전자" },
        { id: 21, title: "정보통신" },
        { id: 22, title: "식품가공" },
        { id: 23, title: "인쇄·목재·가구·공예" },
        { id: 24, title: "환경·에너지·안전" },
        { id: 25, title: "농림어업" },
    ]);

    const handleCategoryClick = useCallback(
        (id, title) => {
            onCategorySelect(id, title); // 카테고리 선택 이벤트 호출 (제목도 함께 전달)
            window.scrollTo({ top: 0, behavior: "smooth" }); // 화면을 맨 위로 스크롤
        },
        [onCategorySelect]
    );

    return (
        <div className="sidebar">
            <h2 className="category-title">카테고리</h2>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() =>
                        handleCategoryClick(category.id, category.title)
                    } // 카테고리 클릭 이벤트
                    className="category-button"
                >
                    {category.title}
                </button>
            ))}
        </div>
    );
});

export default CourseSidebar;
