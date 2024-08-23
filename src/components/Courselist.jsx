import {useState, useEffect} from 'react';
import Slider from 'react-slick';
import '../styles/Courselist.css';
import javaImage from '../assets/java사진.jpg';

// 테스트용 데이터
const testCourses = [
    {title: '강의1', instructor: '강사이름1', image: javaImage},
    {title: '강의2', instructor: '강사이름2', image: javaImage},
    {title: '강의3', instructor: '강사이름3', image: null},
    {title: '강의4', instructor: '강사이름4', image: javaImage},
    {title: '강의5', instructor: '강사이름5', image: null},
    {title: '강의6', instructor: '강사이름6', image: null},
];

function Courselist() {
    const [courses, setCourses] = useState([]);
    const showMaxCnt = 5;

    useEffect(() => {
        const getCourses = async () => {
            try {
                const courses = testCourses;
                setCourses(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        getCourses();
    }, []);

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
                                    <h3 className="image_instructor">{course.instructor}</h3>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-container">
                                    <h3 className="image_title">{course.title}</h3>
                                    <h3 className="image_instructor">{course.instructor}</h3>
                                </div>
                            </>
                        )
                        }
                    </div>
                ))}
            </Slider>
        </div>
    )
        ;
}

export default Courselist;
