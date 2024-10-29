import { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Mypage/CourseDetailed.css";

function CourseDetailed() {
    const { data, fetchData } = useAxios();
    const { courseId } = useParams();
    const [activeCurriculum, setActiveCurriculum] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData(`/course/${courseId}`, "get");
    }, [courseId]);

    const toggleCurriculum = (index) => {
        setActiveCurriculum((prevState) =>
            prevState.includes(index)
                ? prevState.filter((i) => i !== index)
                : [...prevState, index]
        );
    };

    const clickContent = () => {
        navigate("/mypage/course"); //임시
    };

    if (!data) {
        return <p>No course data available.</p>;
    }

    return (
        <div className="course-detail-container">
            <div className="course-details">
                <h2>{data.title}</h2>
                <p>{data.tutorName} 강사</p>
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
                                <>
                                    <tr
                                        key={curriculum.id}
                                        onClick={() => toggleCurriculum(index)}
                                        className="curriculum-title"
                                    >
                                        <td>
                                            <div className="curriculum-title-wrapper">
                                                <span>{curriculum.title}</span>
                                                <span className="curriculum-show">
                                                    {activeCurriculum.includes(
                                                        index
                                                    )
                                                        ? " ▼"
                                                        : " ▶"}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    {activeCurriculum.includes(index) && (
                                        <tr className="curriculum-content-show">
                                            <td>
                                                {curriculum.contentList.map(
                                                    (content) => (
                                                        <div
                                                            key={content.id}
                                                            className="item-content"
                                                            onClick={
                                                                clickContent
                                                            }
                                                        >
                                                            <span className="item-content-title">
                                                                {content.title}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </>
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
