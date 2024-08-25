import {useState, useEffect} from 'react';
import Slider from 'react-slick';
import '../styles/Courselist.css';
import useAxios from "../hooks/api/useAxios.jsx";

function Courselist() {
    const [courses, setCourses] = useState([]);
    const {fetchData, data} = useAxios();
    const showMaxCnt = 5;

    useEffect(() => {
        fetchData("/enrollment/course", "get");
    }, []);

    useEffect(() => {
        console.log(data);
        if (Array.isArray(data)) {
            setCourses(data);
        }
    }, [data]);


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
                    <div key={index} className="card no-image">
                        {course.image ? (
                            <>
                                <img className="course_image" src={course.image}/>
                                <div className="text-container">
                                    <h3 className="image_title">{course.title}</h3>
                                </div>
                                <div className="instructor-container">
                                    <h3 className="image_instructor">{course["instructor"]}</h3>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-container">
                                    <h3 className="image_title">{course.title}</h3>
                                </div>
                                <div className="instructor-container">
                                    <h3 className="image_instructor">{course["instructor"]}</h3>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Courselist;
