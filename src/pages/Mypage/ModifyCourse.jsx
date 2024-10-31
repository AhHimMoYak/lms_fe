import { useEffect, useState } from "react";
import useAxios from "/src/hooks/api/useAxios";
import { useNavigate, useParams } from "react-router-dom";

function ModifyCourse() {
    const { data, fetchData } = useAxios();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        introduction: "",
        beginDate: "",
        endDate: "",
    });

    useEffect(() => {
        fetchData(`/course/${courseId}`, "GET");
    }, [courseId]);

    useEffect(() => {
        if (data && data.title) {
            setFormData({
                title: data.title,
                category: data.category,
                introduction: data.introduction,
                beginDate: data.beginDate,
                endDate: data.endDate,
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.beginDate || !formData.endDate) {
            alert("시작 날짜와 종료 날짜는 필수입니다.");
            return;
        }
        fetchData(`/course/${courseId}`, "patch", {
            title: formData.title,
            introduction: formData.introduction,
            category: formData.category,
            beginDate: new Date(formData.beginDate),
            endDate: new Date(formData.endDate),
        }).then(() => {
            alert("코스가 성공적으로 수정되었습니다.");
            navigate(`/mypage/courses`);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="course-post-container">
            <h2 className="title">코스 수정</h2>
            <form onSubmit={handleSubmit} className="course-post-form">
                <input
                    className="input-field"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    id="introduction"
                    name="introduction"
                    className="textarea-field"
                    placeholder="소개"
                    value={formData.introduction}
                    onChange={handleChange}
                    required
                />
                <select
                    className="input-field"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">카테고리 선택</option>
                    <option value="ALL">전체</option>
                    <option value="BUSINESS_MANAGEMENT">사업관리</option>
                    <option value="MANAGEMENT_ACCOUNTING_ADMINISTRATIVE_AFFAIRS">경영·회계·사무</option>
                    <option value="FINANCE_INSURANCE">금융·보험</option>
                    <option value="EDUCATION_NATURE_EDUCATION_NATURE_SOCIAL_SCIENCE">교육·자연·사회과학</option>
                    <option value="LAW_POLICE_FIRE_RELIGION_DEFENSE">법률·경찰·소방·교도·국방</option>
                    <option value="HEALTH_MEDICAL_CARE">보건·의료</option>
                    <option value="SOCIAL_WELFARE_RELIGION">사회복지·종교</option>
                    <option value="CULTURE_ART_DESIGN_BROADCASTING">문화·예술·디자인·방송</option>
                    <option value="DRIVING_TRANSPORTATION">운전·운송</option>
                    <option value="BUSINESS_SALES">영업판매</option>
                    <option value="SECURITY_CLEANING">경비·청소</option>
                    <option value="UTILIZING_ACCOMMODATION_TRAVEL_ENTERTAINMENT_SPORTS">이용·숙박·여행·오락·스포츠</option>
                    <option value="FOOD_SERVICE">음식서비스</option>
                    <option value="CONSTRUCTION">건설</option>
                    <option value="MACHINERY">기계</option>
                    <option value="MATERIALS">재료</option>
                    <option value="CHEMICAL_BIO">화학·바이오</option>
                    <option value="TEXTILE_CLOTHING">섬유·의복</option>
                    <option value="ELECTRICAL_ELECTRONIC">전기·전자</option>
                    <option value="INFORMATION_COMMUNICATION">정보통신</option>
                    <option value="FOOD_PROCESSING">식품가공</option>
                    <option value="PRINTED_WOOD_FURNITURE_CRAFTS">인쇄·목재·가구·공예</option>
                    <option value="ENVIRONMENTAL_ENERGY_SAFETY">환경·에너지·안전</option>
                    <option value="AGRICULTURE_FORESTRY_FISHERIES">농림어업</option>
                </select>
                <label htmlFor="beginDate">시작 날짜: </label>
                <input
                    type="date"
                    id="beginDate"
                    name="beginDate"
                    className="input-date"
                    value={formData.beginDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="endDate">종료 날짜: </label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="input-date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-total-button">
                    수정
                </button>
            </form>
        </div>
    );
}

export default ModifyCourse;
