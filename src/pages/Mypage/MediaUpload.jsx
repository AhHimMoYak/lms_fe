import { useState } from "react";
import { Axios } from "/src/authentication/axios/Axios";
import { useParams } from "react-router-dom";

function MediaUpload() {
    const { courseId, curriculumId } = useParams();
    const axiosInstance = Axios();
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        file: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!curriculumId) {
            alert("커리큘럼 ID가 유효하지 않습니다.");
            return;
        }

        const multipartData = new FormData();

        if (formData.file) {
            multipartData.append("file", formData.file);
        }
        multipartData.append("type", formData.type);
        multipartData.append("title", formData.title);

        const endpoint = formData.type === "VIDEO" || formData.type === "MATERIAL"
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

    const handleUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            file: file
        }));
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            type: value
        }));
    };

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            title: value
        }));
    };

    return (
        <>
            <form
                name="contents"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <label htmlFor="type">콘텐츠 유형 선택: </label>
                <select
                    id="type"
                    value={formData.type}
                    onChange={handleSelectChange}
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
                    type="file"
                    name="file"
                    accept="video/mp4,video/x-m4v,application/pdf"
                    onChange={handleUpload}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="제목 입력"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                />

                <button type="submit">업로드</button>
            </form>
        </>
    );
}

export default MediaUpload;