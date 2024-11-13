import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Mypage/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function Dashboard() {
    const { data, fetchData } = useAxios();
    const navigate = useNavigate();
    const { data: qnaBoardData, fetchData: fetchBoardData } = useAxios();

    const clickDetailCourse = (courseId) => {
        if (decodeTokenTutor()) {
            navigate(`/education/course/${courseId}`);
        } else {
            navigate(`/mypage/course/${courseId}`);
        }
    };
    const clickDetailBoard = (courseId, courseBoardId) => {
        if (decodeTokenTutor()) {
            navigate(`/education/course/${courseId}/qna/${courseBoardId}`);
        } else {
            navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
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
    }, []);

    useEffect(() => {
        fetchBoardData("/board/qna", "GET");
    }, []);

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
                        {qnaBoardData?.slice(0, 5).map((qna, index) => (
                            <tr key={qna.boardId} className="qna-table-row" onClick={() => clickDetailBoard(qna.courseId, qna.boardId)}>
                                <td className="que-idx">{index + 1}</td>
                                <td className="qna-course">{qna.courseTitle}</td>
                                <td className="qna-title">{qna.title}</td>
                                <td className={qna.commitCount > 0 ? "qna-answered" : "qna-not-answered"}>
                                    {qna.commitCount > 0 ? "완료" : "미답변"}
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
