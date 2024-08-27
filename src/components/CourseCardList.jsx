import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/api/useAxios.jsx';
import CourseCard from '../components/CourseCard';
import '../styles/CourseCardList.css'; // CSS 파일을 스타일링에 사용
import Pagination from '@mui/material/Pagination'; // MUI에서 제공하는 페이지네이션 컴포넌트

const CourseCardList = ({ category }) => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const { fetchData, data } = useAxios();

    useEffect(() => {
        if (category) {
            setLoading(true);
            fetchData(`/course?categoryNum=${category}&page=${currentPage}&size=5`, 'get');
        }
    }, [category, currentPage]);

    useEffect(() => {
        if (data && data.content) {
            setCourses(data.content);
            setTotalPages(data.totalPages); // API에서 총 페이지 수를 받는다고 가정
            setLoading(false);
        }
    }, [data]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="CourseList">
            {loading ? (
                <p>로딩 중...</p>
            ) : courses.length > 0 ? (
                <>
                    <div className="CourseCardContainer">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                image={course.imagePath}
                                title={course.title}
                                tutorName={course.tutorName}
                            />
                        ))}
                    </div>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{ marginTop: '20px' }}
                    />
                </>
            ) : (
                <p>해당 카테고리의 코스가 존재하지 않습니다.</p>
            )}
        </div>
    );
};

export default CourseCardList;
