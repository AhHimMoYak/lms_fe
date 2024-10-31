import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 훅 가져오기
import useAxios from "../../hooks/api/useAxios.jsx";
import "/src/styles/Main/VideoExplain.css";

function VideoExplain() {
    const { data, error, fetchData, isLoading } = useAxios(); // isLoading 추가
    const { courseId } = useParams();
    const [activeCurriculum, setActiveCurriculum] = useState(null);

    // API 호출
    useEffect(() => {
        fetchData(`/course/${courseId}`, "get");
    }, [courseId]);

    // API 응답 데이터 로깅
    useEffect(() => {
        if (data) {
            console.log("API response:", data); // 응답 데이터 구조 확인
        }
    }, [data]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleCurriculum = (index) => {
        setActiveCurriculum((prevIndex) =>
            prevIndex === index ? null : index
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>데이터를 불러올 수 없습니다.</div>;
    }

    return (
        <div className="container">
            <div className="lecture-info">
                <div className="lecture-card">
                    <div className="lecture-details">
                        <h2>{data.title}</h2>
                        <p>{data.tutor} 강사</p>
                    </div>
                </div>
                <button className="course-provide-button"> 수강신청 </button>
            </div>

            <div className="lecture-details-section">
                <div className="section-header">
                    <h2>교육 소개</h2>
                </div>
                <div className="course-tabs">
                    <button onClick={() => scrollToSection("learning-goal")}>
                        소개
                    </button>
                    <button onClick={() => scrollToSection("chapter-info")}>
                        커리큘럼
                    </button>
                    <button onClick={() => scrollToSection("instructor-intro")}>
                        강사진 소개
                    </button>
                    <button
                        onClick={() => scrollToSection("completion-criteria")}
                    >
                        평가
                    </button>
                </div>

                <div id="learning-goal" className="learning-goal">
                    <h3>- 소개</h3>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>강의명</th>
                                <td>{data.title}</td>
                            </tr>
                            <tr>
                                <th>강사명</th>
                                <td>{data.tutor}</td>
                            </tr>
                            <tr>
                                <th>교육 소개</th>
                                <td>{data.introduction}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="chapter-info" className="chapter-info">
                    <h3>- 커리큘럼</h3>
                    {data.curriculumList && data.curriculumList.length > 0 ? (
                        data.curriculumList.map((curriculum, index) => (
                            <div
                                key={curriculum.id}
                                className="curriculum-section"
                            >
                                <div
                                    className="section-header"
                                    onClick={() => toggleCurriculum(index)}
                                >
                                    <h4>{curriculum.title}</h4>
                                    <p className="curriculum-detail-toggle">
                                        {activeCurriculum === index ? "▼" : "▶"}
                                    </p>
                                </div>
                                {activeCurriculum === index && (
                                    <div className="section-content">
                                        {curriculum.contentList.map(
                                            (content) => {
                                                return (
                                                    <div key={content.id}>
                                                        <span>
                                                            {content.id}{" "}
                                                            {content.title}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        )}
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
