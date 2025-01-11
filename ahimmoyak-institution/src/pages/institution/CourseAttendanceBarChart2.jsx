import { useEffect, useState } from "react";
import * as echarts from "echarts";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CourseAttendanceChart = () => {
    const [options, setOptions] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courses, setCourses] = useState([]); // 강좌 목록 저장
    const axiosInstance  = AxiosManager();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get(
                    `analysis/api/bar-company-attendances?list=true`
                ); // 강좌 목록 가져오기
                setCourses(response.data); // 강좌 목록 설정
            } catch (error) {
                console.error("Failed to fetch course list:", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            axiosInstance
                .get(`analysis/api/bar-company-attendances?courseName=${selectedCourse}`)
                .then((response) => {
                    console.log("API Response:", response.data); // 응답 데이터 확인
                    setOptions(response.data);
                })
                .catch((error) => {
                    console.error("API Request Error:", error);
                });
        }
    }, [selectedCourse]);


    useEffect(() => {
        if (options) {
            const chartDom = document.getElementById("course-attendance-chart");
            const myChart = echarts.init(chartDom);
            myChart.setOption(options);

            const handleResize = () => {
                myChart.resize();
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                myChart.dispose();
            };
        }
    }, [options]);

    return (
        <div>
            <select
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
                defaultValue=""
            >
                <option value="" disabled>
                    강좌를 선택하세요
                </option>
                {courses.map((course) => (
                    <option key={course.courseName} value={course.courseName}>
                        {course.courseName}
                    </option>
                ))}
            </select>
            <div id="course-attendance-chart" style={{ width: "90%", height: "500px" }}></div>
        </div>
    );
};

export default CourseAttendanceChart;
