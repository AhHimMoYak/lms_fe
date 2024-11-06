import { useState } from "react";
import { Axios } from "/src/authentication/axios/Axios";
import "../../styles/MediaUpload.css";

function MediaUpload({ courseId, curriculumId }) {
    const [idx, setIdx] = useState(0);
    const axiosInstance = Axios();
    const [formData, setFormData] = useState({
        contents: [],
    });

    const handleSubmit = async (e, contentIndex) => {
        e.preventDefault();
        if (!curriculumId) {
            console.log(curriculumId);
            alert("커리큘럼 ID가 유효하지 않습니다.");
            return;
        }

        const content = formData.contents[contentIndex];
        const multipartData = new FormData();
        if (content.file) {
            multipartData.append("file", content.file);
        }
        multipartData.append("type", content.type);
        multipartData.append("title", content.title);

        const endpoint = content.type === "VIDEO" || content.type === "MATERIAL"
            ? `/course/${courseId}/curriculum/${curriculumId}/contents`
            : `/course/${courseId}/curriculum/${curriculumId}/contents/quiz`;

        try {
            await axiosInstance.post(endpoint, multipartData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("업로드가 성공적으로 완료되었습니다.");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("인증되지 않았습니다. 로그인 후 다시 시도하세요.");
            } else if (error.response && error.response.status === 413) {
                alert("파일 크기가 너무 큽니다. 더 작은 파일을 업로드하세요.");
            } else if (error.response && error.response.status === 405) {
                alert("잘못된 요청입니다. 서버에서 이 메소드가 허용되지 않습니다.");
            } else {
                alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleUpload = (e, contentIndex) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            contents: prevState.contents.map((content, index) =>
                index === contentIndex ? { ...content, file } : content
            ),
        }));
    };

    const handleSelectChange = (e, contentIndex) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            contents: prevState.contents.map((content, index) =>
                index === contentIndex ? { ...content, type: value } : content
            ),
        }));
    };

    const handleTitleChange = (e, contentIndex) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            contents: prevState.contents.map((content, index) =>
                index === contentIndex ? { ...content, title: value } : content
            ),
        }));
    };

    const handleAddContent = () => {
        setFormData(prevState => ({
            ...prevState,
            contents: [
                ...prevState.contents,
                { idx: idx, title: '', type: '', file: null },
            ],
        }));
        setIdx(prevIdx => prevIdx + 1); // Increment idx for unique values
    };

    return (
        <div className="content-container">
            <button className="add-button" onClick={handleAddContent}>컨텐츠 추가 +</button>
            {formData.contents.map((content, contentIndex) => (
                <div key={content.idx} className="content-item">
                    <form
                        name="contents"
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmit(e, contentIndex)}
                        className="content-form"
                    >
                        <label htmlFor={`type-${contentIndex}`}>콘텐츠 유형 선택: </label>
                        <select
                            id={`type-${contentIndex}`}
                            value={content.type}
                            className="input-select"
                            onChange={(e) => handleSelectChange(e, contentIndex)}
                            required
                        >
                            <option value="" disabled>
                                옵션을 선택하세요
                            </option>
                            <option value="VIDEO">비디오</option>
                            <option value="MATERIAL">자료</option>
                            <option value="QUIZ">퀴즈</option>
                        </select>

                        <input
                            type="text"
                            name="title"
                            placeholder="제목 입력"
                            value={content.title}
                            onChange={(e) => handleTitleChange(e, contentIndex)}
                            required
                            className="input-title"
                        />
                        <div className="title-upload-container">
                            <input
                                type="file"
                                name="file"
                                accept="video/mp4,video/x-m4v,application/pdf"
                                className="input-file"
                                onChange={(e) => handleUpload(e, contentIndex)}
                            />
                            <button type="submit" className="submit-content-button">업로드</button>
                        </div>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default MediaUpload;
