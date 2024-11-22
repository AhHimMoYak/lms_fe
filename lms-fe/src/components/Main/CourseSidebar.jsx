import React, { useState, useCallback, memo } from "react";
import "../../styles/Main/CourseSidebar.css";

const CourseSidebar = memo(({ onCategorySelect }) => {
    const [categories] = useState([
        { id: 1, title: "전체", value: "ALL" },
        { id: 2, title: "사업관리", value: "BUSINESS_MANAGEMENT" },
        { id: 3, title: "경영·회계·사무", value: "MANAGEMENT_ACCOUNTING_ADMINISTRATIVE_AFFAIRS" },
        { id: 4, title: "금융·보험", value: "FINANCE_INSURANCE" },
        { id: 5, title: "교육·자연·사회과학", value: "EDUCATION_NATURE_EDUCATION_NATURE_SOCIAL_SCIENCE" },
        { id: 6, title: "법률·경찰·소방·교도·국방", value: "LAW_POLICE_FIRE_RELIGION_DEFENSE" },
        { id: 7, title: "보건·의료", value: "HEALTH_MEDICAL_CARE" },
        { id: 8, title: "사회복지·종교", value: "SOCIAL_WELFARE_RELIGION" },
        { id: 9, title: "문화·예술·디자인·방송", value: "CULTURE_ART_DESIGN_BROADCASTING" },
        { id: 10, title: "운전·운송", value: "DRIVING_TRANSPORTATION" },
        { id: 11, title: "영업판매", value: "BUSINESS_SALES" },
        { id: 12, title: "경비·청소", value: "SECURITY_CLEANING" },
        { id: 13, title: "이용·숙박·여행·오락·스포츠", value: "UTILIZING_ACCOMMODATION_TRAVEL_ENTERTAINMENT_SPORTS" },
        { id: 14, title: "음식서비스", value: "FOOD_SERVICE" },
        { id: 15, title: "건설", value: "CONSTRUCTION" },
        { id: 16, title: "기계", value: "MACHINERY" },
        { id: 17, title: "재료", value: "MATERIALS" },
        { id: 18, title: "화학·바이오", value: "CHEMICAL_BIO" },
        { id: 19, title: "섬유·의복", value: "TEXTILE_CLOTHING" },
        { id: 20, title: "전기·전자", value: "ELECTRICAL_ELECTRONIC" },
        { id: 21, title: "정보통신", value: "INFORMATION_COMMUNICATION" },
        { id: 22, title: "식품가공", value: "FOOD_PROCESSING" },
        { id: 23, title: "인쇄·목재·가구·공예", value: "PRINTED_WOOD_FURNITURE_CRAFTS" },
        { id: 24, title: "환경·에너지·안전", value: "ENVIRONMENTAL_ENERGY_SAFETY" },
        { id: 25, title: "농림어업", value: "AGRICULTURE_FORESTRY_FISHERIES" },
    ]);

    const [isExpanded, setIsExpanded] = useState(true);

    const handleCategoryClick = useCallback(
        (value, title) => {
            onCategorySelect(value, title);
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        [onCategorySelect]
    );

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div>
            <div className={`course-sidebar ${isExpanded ? "course-expanded" : "collapsed"}`}>

                {isExpanded && (
                    <>
                        <h2 className="course-category-title">카테고리</h2>
                        <div className="course-category-container">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.value, category.title)}
                                    className="course-category-button"
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="course-toggle-button" onClick={toggleSidebar}>
                {isExpanded ? "▲" : "▼"}
            </div>
        </div>
    );
});

export default CourseSidebar;

