import { useEffect, useState } from "react";
import * as echarts from "echarts";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const CoursePopularityChart = () => {
    const [selectedDataType, setSelectedDataType] = useState("students"); // 기본값
    const [chartOptions, setChartOptions] = useState(null); // 외부 옵션 JSON
    const axiosInstance = AxiosManager();

    useEffect(() => {
        const fetchChartOptions = async () => {
            try {
                const response = await axiosInstance.get(
                    `analysis/api/line-course-popularity?type=${selectedDataType}`
                );
                const updatedOptions = response.data;

                // Handle tooltip.formatter dynamically
                if (updatedOptions.tooltip) {
                    updatedOptions.tooltip.formatter = (params) => {
                        const data = params.data; // Access additional data directly from params
                        return `
                            월: ${params.name}<br/>
                            코스명: ${data.courseName}<br/>
                            수강생 수: ${data.numberOfStudents}명<br/>
                            회사 수: ${data.numberOfCompanies}개
                        `;
                    };
                }

                // Update series.label to show course names
                if (updatedOptions.series && updatedOptions.series[0]) {
                    updatedOptions.series[0].label = {
                        show: true,
                        position: "top",
                        formatter: (params) => params.data.courseName, // Display course name
                    };

                    // Set line color based on selected data type
                    updatedOptions.series[0].lineStyle = {
                        width: 2,
                        color: selectedDataType === "students" ? "#5470C6" : "#91CC75", // Blue for students, green for companies
                    };
                }

                // Set dynamic Y-axis label with units
                updatedOptions.yAxis = {
                    ...updatedOptions.yAxis,
                    name: selectedDataType === "students" ? "명수 (명)" : "갯수 (개)",
                    axisLabel: {
                        formatter: (value) =>
                            selectedDataType === "students"
                                ? `${value}명` // Add "명" for student count
                                : `${value}개`, // Add "개" for company count
                    },
                };

                setChartOptions(updatedOptions);
            } catch (error) {
                console.error("Error fetching chart options:", error);
            }
        };

        fetchChartOptions();
    }, [selectedDataType]);

    useEffect(() => {
        if (!chartOptions) {
            console.warn("Chart options are not available yet");
            return;
        }

        const chartDom = document.getElementById("course-popularity-chart");
        if (!chartDom) {
            console.error("Chart DOM element not found");
            return;
        }

        const myChart = echarts.init(chartDom);
        myChart.setOption(chartOptions);

        const handleResize = () => {
            myChart.resize();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            myChart.dispose();
        };
    }, [chartOptions]);

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <label style={{ marginRight: "10px" }}>
                    <input
                        type="radio"
                        name="dataType"
                        value="students"
                        checked={selectedDataType === "students"}
                        onChange={() => setSelectedDataType("students")}
                    />
                    학생 수 기준
                </label>
                <label>
                    <input
                        type="radio"
                        name="dataType"
                        value="companies"
                        checked={selectedDataType === "companies"}
                        onChange={() => setSelectedDataType("companies")}
                    />
                    회사 수 기준
                </label>
            </div>
            <div id="course-popularity-chart" style={{ width: "100%", height: "400px" }}></div>
        </div>
    );
};

export default CoursePopularityChart;
