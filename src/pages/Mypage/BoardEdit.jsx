import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Mypage/QnAEdit.css";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function BoardEdit() {
    const { boardId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { data, fetchData } = useAxios();
    const { data: updateData, fetchData: updateFetchData } = useAxios();
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/v1/board/${boardId}/${state.createdAt}`, "GET");
        console.log(data);
    }, [boardId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestDto = {
            title: title,
            content: content,
        };
        updateFetchData(`https://api.ahimmoyak.click/v1/board/courseProvide/${boardId}/${state.createdAt}`, "PATCH", requestDto);
    };

    const handleList = () => {
        if (decodeTokenTutor()) {
            navigate(`/test`);
        } else {
            navigate(`/test`);
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
                navigate(`/test/${boardId}`,{state:{createdAt: updateData.createdAt}});
            }

            else{
                navigate(`/test/${boardId}`,{state:{createdAt: updateData.createdAt}});
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
