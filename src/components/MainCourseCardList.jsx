import React, { useEffect, useState } from "react";
import useAxios from "../hooks/api/useAxios.jsx";
import CourseCard from "./CourseCard.jsx";
import "../styles/CourseCardList.css";
import Pagination from "@mui/material/Pagination";
import { Box, Typography, CircularProgress } from "@mui/material";

const CourseCardList = () => {
  const category = 1;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchData, data } = useAxios();

  useEffect(() => {
    setCourses([]);
    setLoading(true);
  }, [category]);

  useEffect(() => {
    if (category) {
      setLoading(true);
      fetchData(`/course/main?categoryNum=${category}&size=6`, "get");
    }
  }, [category]);

  useEffect(() => {
    if (data) {
      setCourses(data);
      setLoading(false);
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box className="CourseList">
      {loading ? (
        <Box className="LoadingContainer">
          <CircularProgress />
          <Typography sx={{ marginLeft: "15px" }}>
            Loading courses...
          </Typography>
        </Box>
      ) : courses.length > 0 ? (
        <>
          <Box className="CourseCardContainer">
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

export default CourseCardList;
