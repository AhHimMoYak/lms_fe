import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Employee/QnAContainer.css";

function QnAEdit() {
    const location = useLocation();
    const {courseBoardId} = location.state || {};
    const {courseId} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/courseBoard/${courseId}/QNA?courseBoardId=${courseBoardId}`, "GET");

    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestDTO = {
            title: title,
            content: content
        };
        fetchData(`/courseBoard/${courseId}?courseBoardId=${courseBoardId}`, "PATCH", requestDTO);
    }

    useEffect(() => {
        if (data && data.msg) {
            navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
            alert(data.msg);
        }
    }, [data]);

    if (!data) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="qna-container">
            <h2>Q&A 게시물 수정</h2>
            <form className="qna-form" onSubmit={handleSubmit}>
                <div className="title-box">
                    <input
                        type="text"
                        defaultValue={data.title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="content-container">
                    <textarea
                        className="content-box"
                        defaultValue={data.content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    작성완료
                </button>
            </form>
        </div>
    );
}

export default QnAEdit;
