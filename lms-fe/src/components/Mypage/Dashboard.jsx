import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Mypage/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function Dashboard() {
    const { data, fetchData } = useAxios();
    const navigate = useNavigate();
    const { data: boardData, fetchData: fetchBoardData } = useAxios();
    const limit = 5;
    const userName = "난중에고치기";

    const clickDetailCourse = (courseId) => {
        if (decodeTokenTutor()) {
            navigate(`/education/course/${courseId}`);
        } else {
            navigate(`/mypage/course/${courseId}`);
        }
    };
    const clickDetailBoard = (courseId,type,boardId) => {
        if (decodeTokenTutor()) {
            navigate(`/mypage/course/${courseId}/board/${type}/${boardId}`);
        } else {
            navigate(`/mypage/course/${courseId}/board/${type}/${boardId}`);
        }
    };
    const clickListCourse = () => {
        if (decodeTokenTutor()) {
            navigate("/education/course");
        } else {
            navigate("/mypage/course");
        }
    };
    const clickListQnA = () => {
        if (decodeTokenTutor()) {
            navigate("/education/qna");
        } else {
            navigate("/mypage/qna");
        }
    };

    useEffect(() => {
        fetchData(`/course`, "GET");
        //TODO 교육기관일때와 회사원일때 다르게
    }, []);

    useEffect(() => {
        fetchBoardData(`https://api.ahimmoyak.click/board/v1/user-name/${userName}?limit=${limit}`, "GET");
    }, []);
    console.log(boardData);
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">{decodeTokenTutor() ? "나의 강좌" : "수강 목록"}</h2>
                <button className="more-button" onClick={clickListCourse}>
                    더보기
                </button>
            </div>
            <div className="course-cards-container">
                {data?.slice(0, 4).map((course) => (
                    <div key={course.id} className="course-card" onClick={() => clickDetailCourse(course.id)}>
                        <div className="course-card-header" style={{ backgroundColor: getRandomColor() }}></div>
                        <div className="course-card-body">
                            <h3 className="course-title">{course.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="qna-list-container">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">작성한 QnA</h2>
                    <button className="more-button" onClick={clickListQnA}>
                        더보기
                    </button>
                </div>
                <table className="write-qna-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>코스명</th>
                            <th>제목</th>
                            <th>답변</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardData?.items?.map((board, index) => (
                            <tr key={board.boardId} className="qna-table-row" onClick={() => clickDetailBoard(board.courseId,board.type,board.id)}>
                                <td className="que-idx">{index + 1}</td>
                                <td className="qna-course">{board.course}</td>
                                <td className="qna-title">{board.title}</td>
                                <td className={board.commitCount > 0 ? "qna-answered" : "qna-not-answered"}>
                                    {board.commitCount > 0 ? "완료" : "미답변"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function getRandomColor() {
    const colors = ["#3f51b5", "#009688", "#f44336", "#4caf50", "#ff9800", "#9c27b0"];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default Dashboard;
