import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Employee/QnAPost.css";

function QnAPost() {
    const {courseId} = useParams(); // URL에서 courseId 추출
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {fetchData} = useAxios();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 서버로 전송할 요청 DTO
        const requestDTO = {
            title: title,
            content: content
        };

        try {
            // 데이터 전송 (useAxios 사용)
            await fetchData(`/courseBoard/QNA/${courseId}`, "POST", requestDTO);
            // 데이터 전송이 성공하면 게시물 리스트 페이지로 이동
            navigate(`/mypage/course/${courseId}/qna/questions`);
        } catch (error) {
            console.error("게시물 작성 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <div className="qna-post-container">
            <div className="qna-post-title">Q&A 게시물 작성</div>
            <form className="qna-post-form" onSubmit={handleSubmit}>
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
