import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import AxiosManager from "../components/authentication/AxiosManager.jsx";

const MonthlyCourseChart = () => {
    const [selectedSeries, setSelectedSeries] = useState('all');
    const [monthlyCourseData, setMonthlyCourseData] = useState([]);
    const fileName = "monthly-course-data";
    const chart= "basic-bar"
    const axiosInstance  = AxiosManager();

    useEffect(() => {
        const fetchData = () => {
            axiosInstance.get(`analysis/api/echart/${chart}/${fileName}`)
                .then(response => {
                    const data = response.data || [];
                    setMonthlyCourseData(data);
                })
                .catch(error => {
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (monthlyCourseData.length === 0) {
            return;
        }

        const chartDom = document.getElementById('monthly-course-chart');
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: '월별 회사 및 수강생 수, 진행 중인 강좌',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    return params.map(param => `${param.seriesName}: ${param.value}${param.seriesName === '수강생 수' ? '명' : '개'}`).join('<br/>');
                }
            },
            legend: {
                data: ['참여 회사 수', '수강생 수', '진행 중인 강좌'],
                bottom: '0'
            },
            xAxis: [
                {
                    type: 'category',
                    data: monthlyCourseData.map(data => data.month),
                    axisLabel: {
                        interval: 0,
                        rotate: 0
                    }
                }
            ],
            yAxis: {
                type: 'value',
                name: '수강생 수 및 강좌 수'
            },
            series: [
                {
                    name: '참여 회사 수',
                    data: selectedSeries === 'all' || selectedSeries === '참여 회사 수' ? monthlyCourseData.map(data => data.numberOfCompanies) : [],
                    type: 'bar',
                    itemStyle: {
                        color: '#5470c6'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}개'
                    }
                },
                {
                    name: '수강생 수',
                    data: selectedSeries === 'all' || selectedSeries === '수강생 수' ? monthlyCourseData.map(data => data.numberOfStudents) : [],
                    type: 'bar',
                    itemStyle: {
                        color: '#91cc75'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}명'
                    }
                },
                {
                    name: '진행 중인 강좌',
                    data: selectedSeries === 'all' || selectedSeries === '진행 중인 강좌' ? monthlyCourseData.map(data => data.ongoingCourses) : [],
                    type: 'bar',
                    itemStyle: {
                        color: '#ee6666'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}개'
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
    }, [monthlyCourseData, selectedSeries]);

    const handleSeriesChange = (event) => {
        setSelectedSeries(event.target.value);
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={selectedSeries === 'all'}
                        onChange={handleSeriesChange}
                    />
                    모두 보기
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        value="참여 회사 수"
                        checked={selectedSeries === '참여 회사 수'}
                        onChange={handleSeriesChange}
                    />
                    참여 회사 수
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        value="수강생 수"
                        checked={selectedSeries === '수강생 수'}
                        onChange={handleSeriesChange}
                    />
                    수강생 수
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        value="진행 중인 강좌"
                        checked={selectedSeries === '진행 중인 강좌'}
                        onChange={handleSeriesChange}
                    />
                    진행 중인 강좌
                </label>
            </div>
            <div id="monthly-course-chart" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default MonthlyCourseChart;