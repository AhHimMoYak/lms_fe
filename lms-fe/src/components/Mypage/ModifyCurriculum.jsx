import {useEffect, useState} from "react";
import useAxios from "/src/hooks/api/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import "/src/styles/ModifyCurriculum.css";

function ModifyCurriculum({curriculumId}) {
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [formData, setFormData] = useState({
        title: "",
    });

    useEffect(() => {
        if (data && data.title) {
            setFormData({title: data.title});
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            alert("제목은 필수입니다.");
            return;
        }
        fetchData(`/course/${courseId}/curriculum/${curriculumId}`, "PATCH", {
            title: formData.title,
        }).then(() => {
            alert("커리큘럼이 성공적으로 수정되었습니다.");
            window.location.href = `/education/course/${courseId}`;
            
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="curriculum-modify-container">
            <h2 className="title">커리큘럼 수정</h2>
            <form onSubmit={handleSubmit} className="curriculum-modify-form">
                <input
                    className="input-field"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-total-button">
                    수정
                </button>
            </form>
        </div>
    );
}

export default ModifyCurriculum;
