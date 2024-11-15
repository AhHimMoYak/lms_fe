import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/api/useAxios.jsx";
import "../styles/Mypage/Board.css";
import { decodeTokenTutor } from "../authentication/decodeTokenTutor.jsx";

function BoardEdit() {
    const { courseProvideId, boardId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { data, fetchData } = useAxios();
    const { data: updateData, fetchData: updateFetchData } = useAxios();
    const navigate = useNavigate();


    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}`, "GET");
        console.log(data);
    }, [boardId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestDto = {
            title: title,
            content: content,
        };
        updateFetchData(`https://api.ahimmoyak.click/board/v1/courseProvide/${boardId}`, "PATCH", requestDto);
    };

    const handleList = () => {
        if (decodeTokenTutor()) {
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
        } else {
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
        }
    };

    useEffect(() => {
        if(data){
            console.log(data);
            setTitle(data.title);
            setContent(data.content);
        }
    }, [data]);

    useEffect(() => {
        if (updateData) {
            alert("수정되었습니다.");
            if(decodeTokenTutor()){
                navigate(`/mypage/course/${courseProvideId}/board/${data.type}/${boardId}`);
            }

            else{
                navigate(`/mypage/course/${courseProvideId}/${data.type}/board/${boardId}`);
            }
        }
    }, [updateData]);

    if (!data) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="qna-container">
          <h2>Q&A 게시물 수정</h2>
            <form className="qna-form" onSubmit={handleSubmit}>
                <div className="title-box">
                <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                    <textarea className="content-box" defaultValue={content}
                          onChange={(e) => setContent(e.target.value)} required/>
                <button type="submit" className="qna-submit-button">
                    작성완료
                </button>
                <button className="qna-back-button" onClick={handleList}>
                    취소
                </button>
            </form>
        </div>
    );
}

export default BoardEdit;