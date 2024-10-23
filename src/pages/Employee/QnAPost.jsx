import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Employee/QnAContainer.css";

function QnAPost() {
    const {courseId} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestDTO = {
            title: title,
            content: content
        };

        fetchData(`/courseBoard/QNA/${courseId}`, "POST", requestDTO);
    };

    useEffect(() => {
        if (data && data.msg) {
            navigate(`/mypage/course/${courseId}/qna/questions`);
            alert(data.msg);
        }
    }, [data]);


    return (
        <div className="qna-container">
            <h2>Q&A 게시물 작성</h2>
            <form className="qna-form" onSubmit={handleSubmit}>
                <div className="title-box">
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="content-container">
                    <textarea
                        className="content-box"
                        placeholder="내용을 입력해주세요"
                        value={content}
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

export default QnAPost;
