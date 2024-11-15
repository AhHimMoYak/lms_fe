import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import useAxios from "../hooks/api/useAxios.jsx";
import "../styles/Mypage/QnADetailed.css";

function BoardPost() {
    const {type} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();
    const {state} = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestDTO = {
            institutionId : "2",
            courseProvideId : state.courseProvideId.toString(),
            userName:"난중에고치기",
            type:state.type,
            title: title,
            content: content
        };
        console.log(state.type);
        fetchData(`https://api.ahimmoyak.click/board/v1/courseProvide`, "POST", requestDTO);
    };

    useEffect(() => {
        if (data) {
            alert("글 작성 성공!");
            navigate(`/test`,{state:{courseProvideId: state.courseProvideId, type:state.type}});

        }
    }, [data]);

    const handleList = () => {
        navigate(`/test`,{state:{courseProvideId: state.courseProvideId, type:state.type}});
    }


    return (
        <div className="qna-container">
            <div className='qna-post-title'>Q&A 게시물 작성</div>
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
                <button type="submit" className="qna-submit-button">
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
