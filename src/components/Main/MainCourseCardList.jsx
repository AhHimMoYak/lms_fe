import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Main/MainCourseList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function MainCourseCardList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // 초기에는 로딩 상태로 설정
    const { fetchData, data } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/all`, "get");
    }, []);

    useEffect(() => {
        if (data) {
            const shuffledCourses = shuffleArray([...data]);
            setCourses(shuffledCourses);
            setLoading(false);
        }
    }, [data]);

    const clickDetailCourse = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const sliderSettings = {
        dots: false, // 아래 점 네비게이션 숨기기
        infinite: true, // 무한 반복 슬라이딩
        speed: 500, // 슬라이딩 전환 속도 (500ms)
        slidesToShow: 4.5, // 한 번에 보여줄 슬라이드 수를 설정
        slidesToScroll: 0.1, // 물 흐르듯 부드럽게 이동하도록 설정 (1보다 작게 설정하여 부드러운 전환)
        autoplay: true, // 자동 슬라이딩 활성화
        autoplaySpeed: 20, // 슬라이딩 간의 시간 간격 (0.02초마다 이동)
        cssEase: "linear", // 부드러운 이동을 위해 linear 이징 효과 사용
        pauseOnHover: false,
        arrows: false, // 좌우 화살표 숨기기
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 0.1, // 여기서도 부드러운 전환 설정
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 0.1, // 여기서도 부드러운 전환 설정
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 0.1, // 여기서도 부드러운 전환 설정
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            {loading ? (
                <div>
                    <p className="loadingText">Loading courses...</p>
                </div>
            ) : (
                <Slider {...sliderSettings} className="course-slider">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="course-main-card"
                            onClick={() => clickDetailCourse(course.id)}
                        >
                            <div
                                className="course-main-card-header"
                                style={{ backgroundColor: getRandomColor() }}
                            ></div>
                            <div className="course-main-card-content">
                                <h3 className="course-main-card-title">{course.title}</h3>
                                <h4 className="course-main-card-tutor">{course.tutor}</h4>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

// 색상을 랜덤으로 선택하기 위한 함수
function getRandomColor() {
    const colors = [
        "#3f51b5",
        "#009688",
        "#f44336",
        "#4caf50",
        "#ff9800",
        "#9c27b0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default MainCourseCardList;
