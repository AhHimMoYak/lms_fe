import useAxios from "../../hooks/api/useAxios.jsx";
import { useEffect } from "react";
import "../../styles/Employee/Dashboard.css";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    // useAxios 훅에서 제공하는 데이터와 fetchData 함수를 가져옴
    const { data, fetchData } = useAxios();
    const { data:qnaBoardData,fetchData:fetchBoardData}=useAxios();
    const navigate = useNavigate();
    useEffect(() => {
        // Spring Boot 컨트롤러의 @GetMapping("/myPage")에 맞는 URL로 요청 보냄
        fetchData(`/course/myPage?page=1&size=4`, "GET");
    }, []);

    useEffect(() => {
        fetchBoardData('/courseBoard/myBoard',"GET")
    }, []);

    useEffect(() => {
        if(data){
            console.log(data.content)
        }
    }, []);

    const clickDetailCourse =()=>{
        navigate('')
    }
    const clickDetailBoard =()=>{
        navigate('')
    }
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">대시보드</h2>
            <div className="course-cards-container">
                {data?.content?.map((course) => (
                    <div key={course.id} className="course-card" onClick={clickDetailCourse}>
                        <div className="course-card-header" style={{backgroundColor: getRandomColor()}}></div>
                        <div className="course-card-body">
                            <h3 className="course-title">{course.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="qna-list-container">
                <h2 className="qna-list-title">Q&A 게시물</h2>
                <table className="write-qna-table">
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>코스명</th>
                        <th>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {qnaBoardData?.boards?.map((qna) => (
                        <tr key={qna.boardId} className="qna-table-row" onClick={clickDetailBoard}>
                            <td className="qna-title">{qna.title}</td>
                            <td className="qna-author">{qna.username}</td>
                            <td className="qna-course">{qna.courseName}</td>
                            <td className="qna-created">{new Date(qna.createdAt).toISOString().split("T")[0]}</td>
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
