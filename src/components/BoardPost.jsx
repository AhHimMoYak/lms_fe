import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useAxios from "../hooks/api/useAxios.jsx";
import "../styles/Mypage/Board.css";

function BoardPost() {
    const {courseProvideId, type} = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const {data, fetchData} = useAxios();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestDTO = {
            institutionId: "2",
            courseProvideId: courseProvideId,
            userName: "난중에고치기",
            type: type,
            title: title,
            content: content,
            files: files.map(file => ({
                fileName: file.name,
                fileContent: file.content,
                fileType: file.type
            }))
        };

        fetchData(`https://api.ahimmoyak.click/board/v1/courseProvide`, "POST", requestDTO);
    };

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        const filePromises = selectedFiles.map(async (file) => {
            const fileContent = await fileToBase64(file);
            return {
                name: file.name,
                content: fileContent.split(',')[1], // base64 content only
                type: file.type
            };
        });
        const filesWithContent = await Promise.all(filePromises);
        setFiles(filesWithContent);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (data) {
            alert("글 작성 성공!");
            navigate(`/mypage/course/${courseProvideId}/board/${type}`);
        }
    }, [data]);

    const handleList = () => {
        navigate(`/mypage/course/${courseProvideId}/board/${type}`);
    };

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
                <div className="file-upload-container">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
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
