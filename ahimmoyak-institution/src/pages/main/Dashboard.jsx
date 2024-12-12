import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Users, Building2, Bell } from "lucide-react";
import axios from "axios";
import CompanyGrid from "../institution/CompanyGrid.jsx";
import CompanyAttendanceGrid from "../institution/CompanyAttendanceGrid.jsx";
import CourseProvideGrid from "../institution/CourseProvideGrid.jsx";
import CourseEvaluationGrid from "../institution/CourseEvaluationGrid.jsx";
import StorageCapacity from "../institution/StorageCapacity.jsx";
import QuarterPieChart2 from "../institution/QuarterPieChart2.jsx";
import CourseAttendanceBarChart2 from "../institution/CourseAttendanceBarChart2.jsx";
import CoursePopularityChart2 from "../institution/CoursePopularityChart2.jsx";
import MonthlyCourseChart2 from "../institution/MonthlyCourseChart2.jsx";

const Card = ({ children }) => (
    <div className="bg-white rounded-lg shadow p-6">{children}</div>
);

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const courseDetailsRef = useRef(null);
    const evaluationTableRef = useRef(null);

    const handleCourseClick = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:8081/v1/institutions/dashboard?userId=3")
            .then((response) => {
                const {
                    totalCourse,
                    totalCourseProvide,
                    totalEnrollment,
                    totalProgressCourseProvide,
                    progressCourseProvideList,
                } = response.data;

                setStats([
                    { title: "총 코스", value: totalCourse, icon: BookOpen },
                    { title: "코스제공 수", value: totalCourseProvide, icon: Building2 },
                    { title: "총 수강생", value: totalEnrollment, icon: Users },
                    { title: "진행 중 코스", value: totalProgressCourseProvide, icon: Bell },
                ]);

                setCourses(
                    progressCourseProvideList.map((course) => ({
                        name: course.courseTitle,
                        duration: `${course.period}일`,
                        providingCount: course.companyProvided,
                    }))
                );

                setLoading(false);
            })
            .catch((error) => {
                console.error("대시보드 데이터 로드 실패:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">로딩 중...</div>;
    }

    return (
        <div>
            <header className="bg-white shadow">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">대시보드</h2>
                </div>
            </header>
            <main className="p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <Icon className="h-8 w-8 text-gray-400" />
                                </div>
                            </Card>
                        );
                    })}
                    <button
                        onClick={() => handleCourseClick(evaluationTableRef)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        강좌 보기
                    </button>
                </div>

                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold">코스 현황</h2>
                        <button
                            onClick={() => handleCourseClick(courseDetailsRef)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            테이블 데이터 보기
                        </button>
                    </div>
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <div key={course.name} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{course.name}</p>
                                    <p className="text-sm text-gray-500">기간: {course.duration}</p>
                                </div>
                                <span className="text-sm text-blue-600">{course.providingCount}개사 제공중</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <div className="grid grid-cols-1 gap-8">
                    <StorageCapacity/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <h2 className="text-lg font-bold mb-4">월별 통계</h2>
                        <MonthlyCourseChart2 />
                    </Card>
                    <Card>
                        <h2 className="text-lg font-bold mb-4">분기별 통계</h2>
                        <QuarterPieChart2 />
                    </Card>
                </div>

                <Card>
                    <h2 className="text-lg font-bold mb-4">코스 통계</h2>
                    <CoursePopularityChart2 />
                </Card>

                <Card>
                    <h2 className="text-lg font-bold mb-4">출석율</h2>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex-1">
                            <h3 className="text-md font-bold mb-2">회사별 총 출석율</h3>
                            <CompanyAttendanceGrid />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-md font-bold mb-2">코스별 회사 출석율</h3>
                            <CourseAttendanceBarChart2 />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div ref={courseDetailsRef}>
                        <h2 className="text-lg font-bold mb-4">진행중인 코스 운영 현황 - 데이터 테이블</h2>
                        <CourseProvideGrid />
                        <h2 className="text-lg font-bold mt-8 mb-4">체결된 회사 정보 - 데이터 테이블</h2>
                        <CompanyGrid />
                    </div>
                </Card>

                <Card>
                    <div ref={evaluationTableRef}>
                        <h2 className="text-lg font-bold mb-4">총 코스 - 데이터 테이블</h2>
                        <CourseEvaluationGrid />
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;
