import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Main/MainCourseList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useNavigate} from "react-router-dom";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function MainCourseCardList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const {fetchData, data} = useAxios();
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
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 0.15,
        autoplay: true,
        autoplaySpeed: 15,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 0.1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 0.1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 0.1,
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
                        <>
                            <div
                                key={course.id}
                                className="course-main-card"
                                onClick={() => clickDetailCourse(course.id)}
                            >
                                <div
                                    className="course-main-card-header"
                                    style={{backgroundColor: getRandomColor()}}
                                ></div>
                                <div className="course-main-card-content">
                                    <h3 className="course-main-card-title">{course.title}</h3>
                                    <h4 className="course-main-card-tutor">{course.tutor}</h4>
                                </div>
                            </div>
                            <div></div>
                        </>
                    ))}
                </Slider>
            )}
        </div>
    );
}

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
