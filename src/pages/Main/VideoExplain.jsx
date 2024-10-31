import {useState, useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import useAxios from "../../hooks/api/useAxios.jsx";
import "/src/styles/Main/VideoExplain.css";

function VideoExplain() {
    const {data: courseData, error, fetchData: fetchCourseData, isLoading} = useAxios();
    const {data: enrollId, fetchData: fetchEnrollId} = useAxios();
    const {data: enrollment, error: enrollmentError, fetchData: fetchEnrollment} = useAxios();

    const {courseId} = useParams();
    const [activeCurriculum, setActiveCurriculum] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState();

    useEffect(() => {
        fetchCourseData(`/course/${courseId}`, "get");
    }, [courseId]);

    useEffect(() => {
        if (courseData) {
            fetchEnrollId(`/course/${courseId}/enrollId`, "GET");
            console.log("API response:", courseData);
        }
    }, [courseData]);

    useEffect(() => {
        if (enrollId) {
            setIsEnrolled(enrollId.id !== null);
        }
    }, [enrollId]);

    useEffect(() => {
        if (enrollmentError) {
            alert(`${enrollmentError.response.data}. 담당자에게 문의해주세요`);
        }
    }, [enrollmentError]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({behavior: "smooth"});
        }
    };

    const toggleCurriculum = (index) => {
        setActiveCurriculum((prevIndex) =>
            prevIndex === index ? null : index
        );
    };

    const handleEnrollmentToggle = useCallback(() => {
        if (isEnrolled) {
            if (window.confirm("수강신청을 취소하시겠습니까?")) {
                fetchEnrollment(`/course/${courseId}/enroll`, "DELETE");
                setIsEnrolled(false);
            }
        } else {
            if (window.confirm("수강신청을 하시겠습니까?")) {
                fetchEnrollment(`/course/${courseId}/enroll`, "GET");
                setIsEnrolled(true);
            }
        }
    }, [isEnrolled, courseId, fetchEnrollment]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!courseData) {
        return <div>데이터를 불러올 수 없습니다.</div>;
    }

    const enrollmentPeriod = new Date(courseData.endDate).setHours(23, 59, 59, 999) >= new Date();

    return (
        <div className="container">
            <div className="lecture-info">
                <div className="lecture-card">
                    <div className="lecture-details">
                        <h2>{courseData.title}</h2>
                        <p>{courseData.tutor} 강사</p>
                    </div>
                </div>
                {enrollmentPeriod ? (
                    <button className="course-provide-button" onClick={handleEnrollmentToggle}>
                        {isEnrolled ? "수강 취소" : "수강 신청"}
                    </button>
                ) : (
                    <div className="course-provide-button-disabled">
                        수강신청 기간이 아닙니다
                    </div>
                )}
            </div>

            <div className="lecture-details-section">
                <div className="section-header">
                    <h2>교육 소개</h2>
                </div>
                <div className="course-tabs">
                    <button onClick={() => scrollToSection("learning-goal")}>소개</button>
                    <button onClick={() => scrollToSection("chapter-info")}>커리큘럼</button>
                    <button onClick={() => scrollToSection("completion-criteria")}>평가</button>
                </div>

                <div id="learning-goal" className="learning-goal">
                    <h3>- 소개</h3>
                    <table className="info-table">
                        <tbody>
                        <tr>
                            <th>강의명</th>
                            <td>{courseData.title}</td>
                        </tr>
                        <tr>
                            <th>강사명</th>
                            <td>{courseData.tutor}</td>
                        </tr>
                        <tr>
                            <th>교육 소개</th>
                            <td>{courseData.introduction}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div id="chapter-info" className="chapter-info">
                    <h3>- 커리큘럼</h3>
                    {courseData.curriculumList && courseData.curriculumList.length > 0 ? (
                        courseData.curriculumList.map((curriculum, index) => (
                            <div key={curriculum.id} className="curriculum-section">
                                <div className="section-header" onClick={() => toggleCurriculum(index)}>
                                    <h4>{curriculum.title}</h4>
                                    <p className="curriculum-detail-toggle">
                                        {activeCurriculum === index ? "▼" : "▶"}
                                    </p>
                                </div>
                                {activeCurriculum === index && (
                                    <div className="section-content">
                                        {curriculum.contentList.map((content) => {
                                            return (
                                                <div key={content.id}>
                                                    <span>
                                                        {content.id} {content.title}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>커리큘럼 정보가 없습니다.</p>
                    )}
                </div>

                <div id="completion-criteria" className="completion-criteria">
                    <h3>- 평가</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>항목</th>
                            <th>배점(%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>시험</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>퀴즈</td>
                            <td>50</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VideoExplain;
