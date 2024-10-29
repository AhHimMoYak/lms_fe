import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Mypage/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { data, fetchData } = useAxios();
    const { data: qnaBoardData, fetchData: fetchBoardData } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`/course/myPage?page=1&size=4`, "GET");
    }, []);

    useEffect(() => {
        fetchBoardData("/courseBoard/myBoard", "GET");
    }, []);

    useEffect(() => {
        if (qnaBoardData) {
            console.log(qnaBoardData.boards.courseId);
        }
    }, []);

    const clickDetailCourse = (courseId) => {
        navigate(`/mypage/course/${courseId}`);
    };
    const clickDetailBoard = (courseId, courseBoardId) => {
        navigate(`/mypage/course/${courseId}/qna/${courseBoardId}`);
    };
    const clickListCourse = () => {
        navigate("/mypage/applied");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">대시보드</h2>
                <button className="more-button" onClick={clickListCourse}>
                    더보기
                </button>
            </div>
            <div className="course-cards-container">
                {data?.content?.map((course) => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => clickDetailCourse(course.id)}
                    >
                        <div
                            className="course-card-header"
                            style={{ backgroundColor: getRandomColor() }}
                        ></div>
                        <div className="course-card-body">
                            <h3 className="course-title">{course.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="qna-list-container">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">작성한 QnA</h2>
                </div>
                <table className="write-qna-table">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>코스명</th>
                            <th>작성일</th>
                            <th>답변</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qnaBoardData?.boards?.map((qna) => (
                            <tr
                                key={qna.boardId}
                                className="qna-table-row"
                                onClick={() =>
                                    clickDetailBoard(qna.courseId, qna.boardId)
                                }
                            >
                                <td className="qna-title">{qna.title}</td>
                                <td className="qna-course">{qna.courseName}</td>
                                <td className="qna-created">
                                    {
                                        new Date(qna.createdAt)
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </td>
                                <td
                                    className={
                                        qna.commitCount > 0
                                            ? "qna-answered"
                                            : "qna-not-answered"
                                    }
                                >
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
    const colors = [
        "#3f51b5",
        "#009688",
        "#f44336",
        "#4caf50",
        "#ff9800",
        "#9c27b0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default Dashboard;
