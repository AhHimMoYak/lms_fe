import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../hooks/api/useAxios.jsx";

import '../styles/CurriculumList.css';

function CurriculumList() {
    const [curriculums, setCurriculums] = useState([]);
    const [course, setCourse] = useState({});
    const {fetchData, data, error} = useAxios();
    const navigate = useNavigate();
    const params = useParams();

    console.log(params.courseId);

    useEffect(() => {
        fetchData(`/course/${params.courseId}`, "get");
    }, [params.courseId]);

    useEffect(() => {
        if (data) {
            setCurriculums(data["curriculumList"]);
            setCourse(data);
        }
    }, [data]);

    const toggleCurriculums = (index) => {
        const newCurriculums = curriculums.map((curriculum, i) => {
            if (i === index) {
                return {...curriculum, isOpen: !curriculum.isOpen};
            }
            return curriculum;
        });
        setCurriculums(newCurriculums);
    };

    const toggleAllCurriculums = (isOpen) => {
        const newCurriculums = curriculums.map((curriculum) => ({
            ...curriculum,
            isOpen: isOpen,
        }));
        setCurriculums(newCurriculums);
    };

    const handleContentClick = (courseId, contentsId) => {
        navigate(`/mypage/course/${courseId}/${contentsId}`);
    };

    return (
        <div className="curriculumBox">
            <div className="curriculum-header">커리큘럼</div>
            <button
                className="toggle-all-button"
                onClick={() =>
                    toggleAllCurriculums(curriculums.some((curriculum) => !curriculum.isOpen))
                }
                disabled={curriculums.length === 0}  // 커리큘럼이 없으면 버튼 비활성화
            >
                {curriculums.every((curriculum) => curriculum.isOpen) ? "모두 닫기" : "모두 열기"}
            </button>
            <table className="curriculum-table">
                <thead>
                <tr className="curriculum-column">
                    <th>No.</th>
                    <th>제목</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {curriculums.map((curriculum, index) => (
                    <Fragment key={index}>
                        <tr className="curriculumTitle" onClick={() => toggleCurriculums(index)}>
                            <td className="curriculum-number"
                                data-icon={curriculum.isOpen ? "▲" : "▼"}>
                                {index + 1}
                            </td>
                            <td className="curriculm-title">{curriculum.title}</td>
                            <td></td>
                        </tr>
                        {curriculum.isOpen &&
                            curriculum.contents.map((contents, idx) => (
                                <tr className="contentsList" key={`${index}-${idx}`}>
                                    <td className="content-number">{idx + 1}</td>
                                    <td
                                        className="content-title"
                                        onClick={() =>
                                            handleContentClick(curriculum.id, contents["contentsId"])
                                        }
                                    >
                                        <button className="play-button">▶</button>
                                        {contents["contentsTitle"]}
                                    </td>
                                    <td className="type">{contents.type}</td>
                                </tr>
                            ))}
                    </Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CurriculumList;
