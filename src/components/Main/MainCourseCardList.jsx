import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import CourseCard from "./CourseCard";
import "../../styles/Main/CourseCardList.css";
import "../../styles/Main/MainCourseList.css";
import { Box, Typography, CircularProgress } from "@mui/material";

const MainCourseCardList = () => {
    const category = 1;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchData, data } = useAxios();

    const size = 6;

    useEffect(() => {
        setCourses([]);
        setLoading(true);
    }, [category]);

    useEffect(() => {
        if (category) {
            setLoading(true);
            fetchData(
                `/course/preview?categoryNum=${category}&size=${size}`,
                "get"
            );
        }
    }, [category]);

    useEffect(() => {
        if (data) {
            setCourses(data);
            setLoading(false);
        }
    }, [data]);

    return (
        <Box className="MainCourseList">
            {loading ? (
                <Box className="LoadingContainer">
                    <CircularProgress />
                    <Typography className="loadingText">
                        Loading courses...
                    </Typography>
                </Box>
            ) : courses.length > 0 ? (
                <>
                    <Box className="MainCourseCardContainer">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                image={course.imagePath}
                                title={course.title}
                                tutorName={course.tutorName}
                            />
                        ))}
                    </Box>
                </>
            ) : (
                <Typography className="NoCoursesText">
                    No courses available in this category.
                </Typography>
            )}
        </Box>
    );
};

export default MainCourseCardList;
