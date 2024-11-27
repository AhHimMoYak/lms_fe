import { useEffect, useState } from 'react';
import useAxios from '/src/hooks/api/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/CreateCurriculum.css";

function CreateCurriculum() {
    const { courseId } = useParams();
    const { data, fetchData } = useAxios();
    const { data: curriculumData, fetchData: curriculumFetchData } = useAxios();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        curriculums: []
    });

    useEffect(() => {
        curriculumFetchData(`http://localhost:8080/api/v1/courses/${courseId}/details`, "get");
    }, [courseId]);

    useEffect(() => {
        if (data) {
            setFormData(prevState => ({
                ...prevState,
                curriculums: [
                    ...prevState.curriculums,
                    { idx: prevState.curriculums.length + 1, title: prevState.title, curriculumId: data.curriculumId, contentList: [] },
                ],
                title: '',
            }));
        }
    }, [data]);

    useEffect(() => {
        if (curriculumData && curriculumData.curriculumList) {
            setFormData(prevState => ({
                ...prevState,
                curriculums: curriculumData.curriculumList.map(curriculum => ({
                    idx: curriculum.id,
                    title: curriculum.title,
                    curriculumId: curriculum.id,
                    contentList: curriculum.contentList || [], // Ensure contentList exists
                })),
            }));
        }
    }, [curriculumData]);

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            title: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIdx = formData.curriculums.length + 1;
        fetchData(`/courses/${courseId}/curriculums`, "post", {
            title: formData.title,
            idx: newIdx
        });
    };

    const clickToMoveCreateCurriculum = (curriculumId) => {
        navigate(`/education/manage/courses/${courseId}/curriculums/${curriculumId}/contents`);
    };

    const clickToMove = () => {
        navigate(`/education/course/${courseId}`);
    };

    return (
        <div className="curriculum-container">
            <h2 className="curriculum-input">커리큘럼 등록</h2>
            <form onSubmit={handleSubmit} className="curriculum-post-form">
                <input
                    type="text"
                    id="title"
                    className="input-title-field"
                    placeholder="커리큘럼 제목"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                />
                <button type="submit" className="curriculum-submit">등록</button>
            </form>
            <h3>생성한 커리큘럼</h3>
            <div className="curriculums-list">
                {formData.curriculums.map((curriculum, index) => (
                    <div key={index} className="curriculum-item">
                        <button
                            className="collapsible"
                            onClick={() => {
                                const content = document.getElementById(`content-${index}`);
                                if (content) {
                                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                                }
                            }}
                        >
                            {curriculum.title}
                        </button>
                        <div id={`content-${index}`} className="content" style={{ display: 'none' }}>
                            {curriculum.contentList.map((content) => (
                                <div key={content.id} className="item-content">
                                    <span className="item-content-title">{content.title}</span>
                                </div>
                            ))}
                            <button className="create-curriculum-button"
                                    onClick={() => clickToMoveCreateCurriculum(curriculum.curriculumId)}>
                                컨텐츠 생성
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="exit-create-course" onClick={clickToMove}>완료</button>
        </div>
    );
}

export default CreateCurriculum;
