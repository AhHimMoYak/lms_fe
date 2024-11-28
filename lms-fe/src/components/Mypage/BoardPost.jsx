import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Mypage/Board.css";

function BoardPost() {
    const {courseId,type} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {data, fetchData} = useAxios();
    const {data:courseData, fetchData:courseFetchData} = useAxios();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestDTO = {
            institutionId : courseData.institutionId,
            courseId : courseId,
            userName:"난중에고치기",
            type:type,
            title: title,
            content: content,
            course:  courseData.title,
        };
        fetchData(`https://api.ahimmoyak.click/board/v1/courses`, "POST", requestDTO);
    };
    useEffect(() => {
        courseFetchData(`http://localhost:8080/api/v1/courses/${courseId}/details`,"GET");
    }, []);

    useEffect(() => {
        if (data) {
            alert("글 작성 성공!");
            navigate(`/mypage/course/${courseId}/board/${type}`);
        }
    }, [data]);

    const handleList = () => {
        navigate(`/mypage/course/${courseId}/board/${type}`);
        // navigate(`/education/course/${courseProvideId}/board/${type}`);  // TODO 교육기간
    }


    return (
        <div className="board-container">
            <div className='board-post-title'>Q&A 게시물 작성</div>
            <form className="board-form" onSubmit={handleSubmit}>
                <div className="title-box">
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="board-content-container">
                    <textarea
                        className="board-content-box"
                        placeholder="내용을 입력해주세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="board-submit-button">
                    작성완료
                </button>
                <button className="qna-back-button" onClick={handleList}>
                    목록
                </button>
            </form>
        </div>
    );
}

export default BoardPost;
