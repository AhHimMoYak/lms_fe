import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/api/useAxios.jsx";
import "../styles/Mypage/Board.css";
import { decodeTokenTutor } from "../authentication/decodeTokenTutor.jsx";

function BoardEdit() {
    const { courseProvideId, boardId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [filesToDelete, setFilesToDelete] = useState([]);
    const { data, fetchData } = useAxios();
    const { data: updateData, fetchData: updateFetchData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`https://api.ahimmoyak.click/board/v1/${boardId}`, "GET");
    }, [boardId]);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
            setExistingFiles(
                (data.s3Urls || []).map((url, index) => ({
                    url,
                    key: data.s3Keys[index]
                }))
            );
        }
    }, [data]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleDeleteFile = (fileKey) => {
        setFilesToDelete([...filesToDelete, fileKey]);
        setExistingFiles(existingFiles.filter((file) => file.key !== fileKey));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filesWithBase64 = await Promise.all(
            files.map(async (file) => ({
                fileName: file.name,
                fileType: file.type,
                fileContent: await fileToBase64(file)
            }))
        );

        const requestDto = {
            title: title,
            content: content,
            files: filesWithBase64,
            deleteKeys: filesToDelete
        };
        updateFetchData(`https://api.ahimmoyak.click/board/v1/courseProvide/${boardId}`, "PATCH", requestDto);
    };

    const handleList = () => {
        navigate(`/mypage/course/${courseProvideId}/board/${data.type}`);
    };

    useEffect(() => {
        if (updateData) {
            alert("수정되었습니다.");
            navigate(`/mypage/course/${courseProvideId}/board/${data.type}/${boardId}`);
        }
    }, [updateData]);

    if (!data) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="qna-container">
            <h2>Q&A 게시물 수정</h2>
            <form className="board-form" onSubmit={handleSubmit}>
                <div className="title-box">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <textarea className="content-box" value={content} onChange={(e) => setContent(e.target.value)} required />
                <div className="file-upload">
                    <label htmlFor="fileInput">파일 업로드:</label>
                    <input type="file" id="fileInput" multiple onChange={handleFileChange} />
                </div>
                <div className="existing-files">
                    <h4>기존 파일:</h4>
                    {existingFiles.map((file, index) => (
                        <div key={index} className="file-item">
                            <a href={file.url} target="_blank" rel="noopener noreferrer">{`파일 ${index + 1}`}</a>
                            <button type="button" onClick={() => handleDeleteFile(file.key)}>삭제</button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="qna-submit-button">
                    작성완료
                </button>
                <button type="button" className="qna-back-button" onClick={handleList}>
                    취소
                </button>
            </form>
        </div>
    );
}

export default BoardEdit;
