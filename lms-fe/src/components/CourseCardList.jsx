import React, { useEffect, useState } from "react";
import useAxios from "../hooks/api/useAxios.jsx";
import CourseCard from "../components/CourseCard";
import "../styles/CourseCardList.css";
import Pagination from "@mui/material/Pagination";
import { Box, Typography, CircularProgress } from "@mui/material";

const CourseCardList = ({ category }) => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { fetchData, data } = useAxios();

  useEffect(() => {
    setCourses([]);
    setCurrentPage(1);
    setTotalPages(1);
    setLoading(true);
  }, [category]);

  useEffect(() => {
    if (category) {
      console.log("category : " + category);
      setLoading(true);
      fetchData(
        `/course/main?categoryNum=${category}&page=${currentPage}&size=8`,
        "get"
      );
    }
  }, [category, currentPage]);

  useEffect(() => {
    if (data && data.content) {
      setCourses(data.content);
      setTotalPages(data.totalPages);
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
          <Box className="PaginationContainer">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
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
