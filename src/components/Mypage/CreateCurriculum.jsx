import {useEffect, useState} from 'react';
import useAxios from '/src/hooks/api/useAxios';
import {useNavigate, useParams} from 'react-router-dom';
import MediaUpload from "./MediaUpload.jsx";
import "../../styles/CreateCurriculum.css"

function CreateCurriculum() {
    const {courseId} = useParams();
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        idx:'',
        curriculums:[]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIdx = formData.curriculums.length + 1;
         fetchData(`/course/${courseId}/curriculum`, "post",
            {
                title: formData.title,
                idx: newIdx
            });
    }

    const clickToMove = () => {
        navigate(`/education/course/${courseId}`);
    }

    useEffect(() => {
        if (data) {
            console.log(data);
            setFormData((prevState) => ({
                ...prevState,
                curriculums: [
                    ...prevState.curriculums,
                    {idx: prevState.curriculums.length + 1, title: prevState.title,curriculumId: data},
                ],
                title: '',
            }));
        }
    }, [data]);

    const handleTitleChange = (e) => {
        const {value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            title: value
        }));
    };

    return (
        <div className="curriculum-container">
            <h2 className="curriculum-input">커리큘럼 등록</h2>
            <form onSubmit={handleSubmit} className="curriculum-post-form">
                <input
                    type="text"
                    id="title"
                    className="input-title-field"
                    placeholder={`커리큘럼 제목`}
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                /><button type="submit" className="curriculum-submit">등록</button>
            </form>
            <h3>생성한 커리큘럼</h3>
            <div>
                {formData.curriculums.map((curriculum, index) => (
                    <div key={index}>
                        <button className="collapsible" onClick={() => {
                            const content = document.getElementById(`content-${index}`);
                            if (content.style.display === 'block') {
                                content.style.display = 'none';
                            } else {
                                content.style.display = 'block';
                            }
                        }}> {curriculum.title}</button>
                        <div id={`content-${index}`} className="content" style={{display: 'none'}}>
                            <MediaUpload courseId={courseId} curriculumId={curriculum.curriculumId}/>
                        </div>
                    </div>
                ))}
            </div>
            <button className="exit-create-course" onClick={clickToMove}>완료</button>
        </div>
    );
}

export default CreateCurriculum;
