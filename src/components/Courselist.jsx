import {useState, useEffect} from 'react';
import Slider from 'react-slick';
import '../styles/Courselist.css';
import useAxios from "../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";

function Courselist() {
    const [courses, setCourses] = useState([]);
    const {fetchData, data} = useAxios();
    const showMaxCnt = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("/enrollment/course", "get");
    },[]);

    useEffect(() => {
        if (Array.isArray(data)) {
            setCourses(data);
        }
    }, [data]);
    const handleTitleClick = (id) => {
        navigate(`/mypage/course/${id}`,{
            state :{
                courseId:id
            }
        });
    };
    const sliderSettings = {
        infinite: false,
        slidesToShow: showMaxCnt,
        slidesToScroll: 1,
        draggable: courses.length > showMaxCnt,
    };

    return (
        <div className="slider-container">
            <Slider {...sliderSettings}>
                {courses.map((course, index) => (
                    <a href="#"
                         onClick={(e)=> {
                             e.preventDefault();
                             handleTitleClick(course["courseId"]);}} key={index} className="card no-image">
                        {course.imagePath ? (
                            <div>
                                <img className="course_image" src={course.imagePath}/>
                                <div className="text-container">
                                    <h3 className="image_title">{course.title}</h3>
                                </div>
                                <div className="instructor-container">
                                    <h3 className="image_instructor">{course.instructor}</h3>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-container">
                                    <h3 className="image_title">{course.title}</h3>
                                </div>
                                <div className="instructor-container">
                                    <h3 className="image_instructor">{course["instructor"]}</h3>
                                </div>
                            </div>
                        )}
                    </a>
                ))}
            </Slider>
        </div>
    );
}

export default Courselist;
