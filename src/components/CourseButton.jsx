import {useEffect, useState} from "react";
import '../styles/CourseButton.css';
import useAxios from "../hooks/api/useAxios.jsx";

const CourseButton = ({onSelectCourse}) => {
    const [buttonNames, setButtonNames] = useState([]);
    const {fetchData, data, error} = useAxios();

    useEffect(() => {
        fetchData("/category", "get");
    }, []);

    useEffect(() => {
        if (Array.isArray(data)) {
            setButtonNames(data);
        }
    }, [data]);

    const handleClick = (index) => {
        const selectedCourse = buttonNames[index] || {categoryNumber: 'Unknown', title: 'Unknown'};
        onSelectCourse(selectedCourse);
    };


    return (
        <div className="CourseButton">
            {buttonNames.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`course-button`}
                >
                    {item.title}
                </button>

            ))
            }
        </div>
    );
};

export default CourseButton;
