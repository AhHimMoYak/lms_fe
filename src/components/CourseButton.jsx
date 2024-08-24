// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import '../styles/CourseButton.css';
import useAxios from "../hooks/api/useAxios.jsx";

const CourseButton = () => {

    const [buttonNames, setButtonNames] = useState([]);
    const { fetchData , data , error } = useAxios();

    useEffect(() => {
        fetchData("/category", "get");

    }, []);

    const handleClick = (index) => {
        setSelectedButton(index);
    };

    useEffect(() => {
        if (Array.isArray(data)) {
            setButtonNames(data);
        }
    }, [data]);


    const [selectedButton, setSelectedButton] = useState(null);


    return (
        <div className="CourseButton">

            { buttonNames.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`course-button ${selectedButton === index ? 'selected' : ''}`}
                    >
                        {item.title}
                    </button>

    ))
            };
        </div>
    );
};



export default CourseButton;
