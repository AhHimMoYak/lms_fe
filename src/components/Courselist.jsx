import {useState, useEffect} from 'react';
import Slider from 'react-slick';
import '../styles/Courselist.css';

// 테스트용 데이터
const testCourses = [
    {title: '강의1', instructor: '강사이름1'},
    {title: '강의2', instructor: '강사이름1'},
    {title: '강의3', instructor: '강사이름1'},
    {title: '강의4', instructor: '강사이름1'},
    {title: '강의5', instructor: '강사이름1'},
    {title: '강의6', instructor: '강사이름1'},
    {title: '강의7', instructor: '강사이름1'},

];

function Courselist() {
    const [courses, setCourses] = useState([]);
    const showMaxCnt = 5;

    useEffect(() => {
        const getCourses = async () => {
            try {
                // API 호출 대신 하드코딩된 데이터 사용
                const courses = testCourses;
                setCourses(courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        getCourses()
    }, []);

    const sliderSettings = {
        infinite: false,
        centerPadding: '60px',
        slidesToShow: showMaxCnt,
        slidesToScroll: 1,
        draggable: courses.length>showMaxCnt,
    };

    return (
        <div className="slider-container">
            <Slider {...sliderSettings}>
                {courses.map((course, index) => (
                    <div key={index} className="card">
                        <h3>{course.title}</h3>
                        <h3>{course.instructor}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Courselist;
