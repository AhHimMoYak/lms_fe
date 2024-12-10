import { Building2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Provide = () => {
    const [courses, setCourses] = useState([{ provides: [] }]); // 원본 데이터
    const [filteredCourses, setFilteredCourses] = useState([{ provides: [] }]); // 필터링된 데이터
    const [searchQuery, setSearchQuery] = useState(""); // 검색어
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/v1/institutions?userId=3`)
            .then((response) => {
                const mappedData = response.data.courseDetailResponseDtoList.reduce((acc, provide) => {
                    let course = acc.find((c) => c.courseId === provide.courseId);

                    if (!course) {
                        course = {
                            courseId: provide.courseId,
                            courseTitle: provide.courseTitle,
                            provides: [],
                        };
                        acc.push(course);
                    }

                    course.provides.push({
                        id: provide.courseProvideId,
                        company: provide.companyName,
                        startDate: provide.beginDate,
                        endDate: provide.endDate,
                        student: provide.attendeeCount,
                        status: provide.state,
                    });

                    return acc;
                }, []);
                setCourses(mappedData); // 원본 데이터 저장
                setFilteredCourses(mappedData); // 초기 상태로 필터링 데이터 설정
            })
            .catch((error) => {
                console.log("오류", error);
            });
    }, []);

    // 검색어가 변경될 때 필터링 수행
    useEffect(() => {
        if (!searchQuery) {
            setFilteredCourses(courses); // 검색어가 없으면 원본 데이터 전체 표시
            return;
        }

        const filtered = courses.map((course) => ({
            ...course,
            provides: course.provides.filter((provide) =>
                provide.company.toLowerCase().includes(searchQuery.toLowerCase()) || // 회사 이름 필터링
                course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) // 과정 이름 필터링
            ),
        })).filter((course) => course.provides.length > 0); // 제공 항목이 없는 과정은 제거

        setFilteredCourses(filtered);
    }, [searchQuery, courses]);

    return (
        <>
            <header className="bg-white shadow">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">교육제공관리</h2>
                </div>
            </header>
            <div className="p-8 max-w-5xl mx-auto space-y-6">
                {/* 검색 입력 필드 */}
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="검색어를 입력하세요 (회사명, 과정명)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {filteredCourses.map((course) => (
                    <div key={course.courseId} className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="text-lg font-medium">{course.courseTitle}</h2>
                        </div>
                        <div className="divide-y">
                            {course.provides.map((provide) => (
                                <div
                                    key={provide.id}
                                    onClick={() => navigate(`/provide/${provide.id}`)}
                                    className="p-4 hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                <h3 className="font-medium">{provide.company}</h3>
                                                <span
                                                    className={`text-sm px-2 py-1 rounded ${
                                                        provide.status === "진행중"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                                >
                          {provide.status}
                        </span>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {provide.startDate} ~ {provide.endDate}
                                                <span className="ml-3">수강생 {provide.student}명</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Provide;
