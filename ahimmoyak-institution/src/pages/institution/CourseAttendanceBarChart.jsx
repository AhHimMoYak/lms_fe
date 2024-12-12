import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CourseAttendanceChart = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [rawCourseData, setRawCourseData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const chart = "horizontal-bar";
    const fileName = "company-attendance-data";
    const axiosInstance  = AxiosManager();


    useEffect(() => {
        const fetchData = () => {
            axiosInstance.get(`analysis/api/echart/${chart}/${fileName}`)
                .then(response => {
                    const data = response.data || [];
                    setRawCourseData(data);
                })
                .catch(error => {
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                });
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (selectedCourse && rawCourseData.length > 0) {
            const selectedCourseData = rawCourseData.find(course => course.courseName === selectedCourse);
            if (selectedCourseData) {
                const processedData = selectedCourseData.companies.map(company => ({
                    companyName: company.companyName,
                    endDate: company.endDate,
                    attendanceRate: ((company.completedStudents / company.enrolledStudents) * 100).toFixed(2) // 출석율(퍼센트)
                }));
                setChartData(processedData);
            }
        }
    }, [selectedCourse, rawCourseData]);

    useEffect(() => {
        const chartDom = document.getElementById('course-attendance-chart');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
                title: {
                    text: `${selectedCourse ? `${selectedCourse}의 회사별 출석율` : '강좌를 선택하세요'}`,
                    left: 'center',
                    top: '5%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        lineHeight: 24,
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return `${params.name} (종료일: ${params.data.endDate}): ${params.value}%`;
                    },
                },
                grid: {
                    left: '25%',
                    right: '10%',
                    top: '20%',
                    bottom: '10%',
                },
                xAxis: {
                    type: 'value',
                    name: '출석율 (%)',
                    max: 100,
                },
                yAxis: {
                    type: 'category',
                    data: chartData.map(company => company.companyName),
                    name: '회사명',
                    nameGap: 30,
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0,
                    },
                },
                series: [
                    {
                        name: '출석율',
                        type: 'bar',
                        data: chartData.map((company) => ({
                            value: company.attendanceRate,
                            endDate: company.endDate,
                            itemStyle: {
                                color: company.attendanceRate <= 50 ? 'red' : `#8faadc`,
                            },
                        })),
                        label: {
                            show: true,
                            position: 'insideRight',
                            formatter: '{c}%',
                        },
                    },
                ],
            };

            myChart.setOption(option);

            const handleResize = () => {
                myChart.resize();
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                myChart.dispose();
            };
        }
    }, [chartData, selectedCourse]);

    return (
        <div>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <select
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        cursor: 'pointer'
                    }}
                    defaultValue=""
                >
                    <option value="" disabled>강좌를 선택하세요</option>
                    {rawCourseData.map(course => (
                        <option key={course.courseName} value={course.courseName}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
            </div>
            <div id="course-attendance-chart" style={{ width: '90%', height: '500px' }}></div>
        </div>
    );
};

export default CourseAttendanceChart;