import {useState} from 'react';
import useAxios from '/src/hooks/api/useAxios';
import {useParams} from 'react-router-dom';

function CreateCurriculum() {
    const {courseId} = useParams();
    const {fetchData} = useAxios();
    const [formData, setFormData] = useState({
        title: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchData(`/course/${courseId}/curriculum`, "post", {title: formData.title}, "application/json");
            if (response && response.data) {
                setMessage('커리큘럼 등록 성공');
                setFormData({title: ''});
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('커리큘럼 등록에 실패했습니다. 다시 시도해주세요.');
            } else {
                setMessage('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleTitleChange = (e) => {
        const {value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            title: value
        }));
    };

    return (
        <div>
            <h2>커리큘럼 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">커리큘럼 제목:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <button type="submit">등록</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateCurriculum;
