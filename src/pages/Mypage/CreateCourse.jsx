import { useState } from "react";
import useAxios from "/src/hooks/api/useAxios";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
    const { fetchData } = useAxios();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        beginDate: '',
        endDate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 시작 날짜와 종료 날짜가 빈 문자열인지 확인
        if (!formData.beginDate || !formData.endDate) {
            alert("시작 날짜와 종료 날짜는 필수입니다.");
            return;
        }

        try {
            const courseResponse = await fetchData("/course", "post", {
                title: formData.title,
                introduction: formData.introduction,
                beginDate: new Date(formData.beginDate),
                endDate: new Date(formData.endDate)
            }, "application/json");

            if (courseResponse && courseResponse.data) {
                alert("코스가 성공적으로 생성되었습니다.");
                navigate("/courses"); // 코스 생성 후 이동할 경로 설정
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("코스 생성에 실패했습니다. 다시 시도해주세요.");
            } else {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">코스 제목: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="introduction">코스 소개: </label>
                <textarea
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="beginDate">시작 날짜: </label>
                <input
                    type="date"
                    id="beginDate"
                    name="beginDate"
                    value={formData.beginDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="endDate">종료 날짜: </label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">코스 생성</button>
            </form>
        </>
    );
}

export default CreateCourse;