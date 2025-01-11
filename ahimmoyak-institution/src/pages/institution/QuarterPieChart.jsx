import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const aggregateQuarterlyData = (data) => {
    const quarters = [
        { name: "1분기", months: [0, 1, 2] },
        { name: "2분기", months: [3, 4, 5] },
        { name: "3분기", months: [6, 7, 8] },
        { name: "4분기", months: [9, 10, 11] }
    ];
    return quarters.map((quarter) => {
        const aggregated = quarter.months.reduce(
            (acc, monthIndex) => {
                acc.numberOfCompanies += data[monthIndex].numberOfCompanies;
                acc.numberOfStudents += data[monthIndex].numberOfStudents;
                acc.ongoingCourses += data[monthIndex].ongoingCourses;
                return acc;
            },
            { name: quarter.name, numberOfCompanies: 0, numberOfStudents: 0, ongoingCourses: 0 }
        );
        return aggregated;
    });
};

const QuarterlyCoursePieChart = () => {
    const fileName = "monthly-course-data";
    const chart = "basic-pie";
    const [quarterlyData, setQuarterlyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosInstance  = AxiosManager();

    useEffect(() => {
        const fetchData = () => {
            axiosInstance.get(`analysis/api/echart/${chart}/${fileName}`)
                .then(response => {
                    const data = response.data || [];
                    const aggregatedData = aggregateQuarterlyData(data);
                    setQuarterlyData(aggregatedData);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (loading || error || quarterlyData.length === 0) return;

        const chartDom = document.getElementById("quarterly-course-pie-chart");
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: "분기별 데이터 통계",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: function (params) {
                    const quarter = quarterlyData.find((q) => q.name === params.name);
                    return `
                    <strong>${params.name}</strong><br/>
                    참여 회사 수: ${quarter.numberOfCompanies}개<br/>
                    수강생 수: ${quarter.numberOfStudents}명 (${params.percent}%)<br/>
                    진행 중인 강좌: ${quarter.ongoingCourses}개
                `;
                },
            },
            legend: {
                orient: "horizontal",
                bottom: "0",
                data: quarterlyData.map((data) => data.name),
            },
            series: [
                {
                    name: "분기별 통계",
                    type: "pie",
                    radius: "50%",
                    data: quarterlyData.map((quarter) => ({
                        value: quarter.numberOfStudents,
                        name: quarter.name,
                    })),
                    label: {
                        show: true,
                        formatter: '{b}: {c}명 ({d}%)',
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };

        myChart.setOption(option);

        const handleResize = () => {
            myChart.resize();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            myChart.dispose();
        };
    }, [quarterlyData, loading, error]);


    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>에러 발생: {error}</p>;

    return <div id="quarterly-course-pie-chart" style={{ width: "100%", height: "500px" }}></div>;
};

export default QuarterlyCoursePieChart;