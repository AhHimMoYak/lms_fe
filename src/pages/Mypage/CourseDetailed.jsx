import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Mypage/CourseDetailed.css";
import { Download, Play } from "react-feather";

function CourseDetailed() {
    const { data, fetchData } = useAxios();
    const { data: contentData, fetchData: contentFetchData } = useAxios();
    const { courseId } = useParams();
    const [curriculumId, setCurriculumId] = useState(null);
    const [contentId, setContentId] = useState(null);
    const [contentType, setcontentType] = useState(null);
    const [activeCurriculum, setActiveCurriculum] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData(`/course/${courseId}`, "get");
    }, [courseId]);

    const toggleCurriculum = (index) => {
        setActiveCurriculum((prevState) => (prevState.includes(index) ? prevState.filter((i) => i !== index) : [...prevState, index]));
    };

    console.log(data);

    const clickContent = ({ curriculumId, contentId, contentType }) => {
        setCurriculumId(curriculumId);
        setContentId(contentId);
        setcontentType(contentType);
    };

    useEffect(() => {
        console.log(curriculumId);
        if (curriculumId && contentId) {
            console.log(curriculumId);
            contentFetchData(`course/${curriculumId}/curriculum/${curriculumId}/contents/${contentId}`, "get");
        }
    }, [curriculumId, contentId]);

    useEffect(() => {
        if (contentData) {
            console.log(contentData.fileInfo);
            if (contentType === "MATERIAL") {
                const downloadLink = document.createElement("a");
                downloadLink.href = `http://localhost:8080/file/material/${contentData.fileInfo}`; // 서버의 파일 URL
                downloadLink.download = "meterial"; // 파일명 지정 (서버에서 받은 파일명 사용 가능)

                // a 태그 클릭 이벤트 트리거로 다운로드 시작
                document.body.appendChild(downloadLink);
                downloadLink.click();

                // 다운로드 후 a 태그 제거
                document.body.removeChild(downloadLink);

                //navigate(`/pdf?info=${contentData.fileInfo}`);
            }
            if (contentType === "VIDEO") {
                navigate(`/stream/video?info=${contentData.fileInfo}`);
            }
        }
    }, [contentData]);

    if (!data) {
        return <p>No course data available.</p>;
    }

    return (
        <div className="course-detail-container">
            <div className="course-details">
                <h2>{data.title}</h2>
                <p>{data.tutor} 강사</p>
            </div>
            <div id="chapter-infomation" className="chapter-infomation">
                {data.curriculumList && data.curriculumList.length > 0 ? (
                    <table className="curriculum-detail">
                        <thead>
                            <tr>
                                <th>과정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.curriculumList.map((curriculum, index) => (
                                <React.Fragment key={curriculum.id}>
                                    <tr key={curriculum.id} onClick={() => toggleCurriculum(index)} className="curriculum-title">
                                        <td>
                                            <div className="curriculum-title-wrapper">
                                                <span>{curriculum.title}</span>
                                                <span className="curriculum-show">{activeCurriculum.includes(index) ? " ▼" : " ▶"}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {activeCurriculum.includes(index) && (
                                        <tr className="curriculum-content-show">
                                            <td>
                                                {curriculum.contentList.map((content) => (
                                                    <div key={content.id} className="item-content">
                                                        <span className="item-content-title">{content.title}</span>
                                                        <span className="item-content-link">
                                                            {content.type === "MATERIAL" ? (
                                                                <Download
                                                                    onClick={() =>
                                                                        clickContent({
                                                                            curriculumId: curriculum.id,
                                                                            contentId: content.id,
                                                                            contentType: content.type,
                                                                        })
                                                                    }
                                                                />
                                                            ) : content.type === "VIDEO" ? (
                                                                <Play
                                                                    onClick={() =>
                                                                        clickContent({
                                                                            curriculumId: curriculum.id,
                                                                            contentId: content.id,
                                                                            contentType: content.type,
                                                                        })
                                                                    }
                                                                />
                                                            ) : null}{" "}
                                                        </span>
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>커리큘럼 정보가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default CourseDetailed;
