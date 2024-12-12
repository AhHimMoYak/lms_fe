import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const MonthlyCourseChart = () => {
    const [selectedSeries, setSelectedSeries] = useState('all');
    const [chartOption, setChartOption] = useState(null);
    const axiosInstance = AxiosManager();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axiosInstance.get(`analysis/api/bar-monthly-courses`);
                setChartOption(response.data);
            } catch (error) {
                console.error('차트 데이터를 가져오는 중 오류 발생:', error);
                alert('차트 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
            }
        };

        fetchChartData();
    }, []);

    useEffect(() => {
        if (!chartOption) {
            return;
        }

        const updatedOption = {
            ...chartOption,
            series: chartOption.series.map((series) => ({
                ...series,
                data:
                    selectedSeries === 'all' || selectedSeries === series.name
                        ? series.data
                        : [],
            })),
        };

        const chartDom = document.getElementById('monthly-course-chart');
        const myChart = echarts.init(chartDom);
        myChart.setOption(updatedOption);

        const handleResize = () => {
            myChart.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, [chartOption, selectedSeries]);

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                {['all', '참여 회사 수', '수강생 수', '진행 중인 강좌'].map((series) => (
                    <label key={series} style={{ marginRight: '10px' }}>
                        <input
                            type="radio"
                            value={series}
                            checked={selectedSeries === series}
                            onChange={(e) => setSelectedSeries(e.target.value)}
                        />
                        {series === 'all' ? '모두 보기' : series}
                    </label>
                ))}
            </div>
            <div id="monthly-course-chart" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default MonthlyCourseChart;
