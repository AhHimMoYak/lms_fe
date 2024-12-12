import { useEffect, useState } from "react";
import * as echarts from "echarts";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const QuarterlyStatisticsChart = () => {
    const [options, setOptions] = useState(null);
    const axiosInstance  = AxiosManager();
    useEffect(() => {
        const fetchChartOptions = async () => {
            try {
                const response = await axiosInstance.get(
                    "/analysis/api/pie-quarter" // Lambda의 API 엔드포인트
                );

                const updatedOptions = response.data;

                // tooltip.formatter를 문자열에서 함수로 변환
                if (
                    updatedOptions.tooltip &&
                    typeof updatedOptions.tooltip.formatter === "string"
                ) {
                    updatedOptions.tooltip.formatter = new Function(
                        "params",
                        updatedOptions.tooltip.formatter
                            .replace("function (params) {", "")
                            .replace(/}$/, "")
                    );
                } else {
                    console.warn("tooltip.formatter is not a string or is missing.");
                }

                setOptions(updatedOptions);
            } catch (error) {
                console.error("Error fetching chart options:", error);
            }
        };

        fetchChartOptions();
    }, []);

    useEffect(() => {
        if (options) {
            const chartDom = document.getElementById("quarterly-statistics-chart");
            if (!chartDom) {
                console.error("Chart DOM element not found!");
                return;
            }

            const myChart = echarts.init(chartDom);

            // 옵션이 제대로 설정되었는지 디버깅
            console.log("ECharts options:", options);
            myChart.setOption(options);

            // 창 크기 조정 핸들러
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
            {options ? (
                <div
                    id="quarterly-statistics-chart"
                    style={{ width: "90%", height: "500px" }}
                ></div>
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default QuarterlyStatisticsChart;
