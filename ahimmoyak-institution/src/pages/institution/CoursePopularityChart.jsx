import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CoursePopularityChart = () => {
    const [coursePopularityData, setCoursePopularityData] = useState([]);
    const [selectedDataType, setSelectedDataType] = useState('students'); // 기본값: 'students'
    const chart = "basic-line";
    const fileName = "course-tot-data";
    const axiosInstance  = AxiosManager();

    useEffect(() => {
        const fetchData = () => {
            axiosInstance.get(`analysis/api/echart/${chart}/${fileName}`)
                .then(response => {
                    const data = response.data || [];
                    setCoursePopularityData(data);
                })
                .catch(error => {
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                });
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (coursePopularityData.length === 0) return;

        const sortedData = [...coursePopularityData].sort((a, b) => {
            return selectedDataType === 'students'
                ? b.numberOfStudents - a.numberOfStudents
                : b.numberOfCompanies - a.numberOfCompanies;
        });

        const top3Courses = sortedData.slice(0, 3);
        const totalCourses = coursePopularityData.length;

        const chartDom = document.getElementById('course-popularity-chart');
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: `강좌 인기 순위 (${selectedDataType === 'students' ? '학생 수' : '회사 수'} 기준) - 총 강좌 수: ${totalCourses}개`,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    const unit = selectedDataType === 'students' ? '명' : '개';
                    return `${params.name}: ${params.value}${unit}`;
                }
            },
            legend: {
                data: [`${selectedDataType === 'students' ? '학생 수' : '회사 수'} 기준 상위 3개 코스`],
                bottom: '0'
            },
            xAxis: {
                type: 'category',
                data: ['1등', '2등', '3등'],
                axisLabel: {
                    interval: 0,
                    rotate: 0
                }
            },
            yAxis: {
                type: 'value',
                name: `${selectedDataType === 'students' ? '학생 수 (명)' : '회사 수 (개)'}`,
                axisLabel: {
                    formatter: `{value} ${selectedDataType === 'students' ? '명' : '개'}`
                }
            },
            series: [
                {
                    name: `${selectedDataType === 'students' ? '학생 수' : '회사 수'} 기준 상위 3개 코스`,
                    data: top3Courses.map(course => ({
                        value: selectedDataType === 'students' ? course.numberOfStudents : course.numberOfCompanies,
                        name: course.courseName,
                    })),
                    type: 'line',
                    itemStyle: {
                        color: selectedDataType === 'students' ? '#5470c6' : '#d94e5d'
                    },
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        width: 2
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: `{b}: {c}${selectedDataType === 'students' ? '명' : '개'}`
                    }
                }
            ]
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
    }, [coursePopularityData, selectedDataType]);

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="radio"
                        name="dataType"
                        value="students"
                        checked={selectedDataType === 'students'}
                        onChange={() => setSelectedDataType('students')}
                    />
                    학생 수 기준
                </label>
                <label>
                    <input
                        type="radio"
                        name="dataType"
                        value="companies"
                        checked={selectedDataType === 'companies'}
                        onChange={() => setSelectedDataType('companies')}
                    />
                    회사 수 기준
                </label>
            </div>
            <div id="course-popularity-chart" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default CoursePopularityChart;
