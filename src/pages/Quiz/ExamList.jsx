import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const ExamList = () => {
    const {courseId} = useParams();
    const [examList, setExamList] = useState([]);
    const navigate = useNavigate();

    const fetchExamList = async () => {
        try {
            const response = await axios.get(`https://api.ahimmoyak.click/exam/v1/course/${courseId}`);
            setExamList(response.data.items || response.data);
        } catch (error) {
            console.error("시험 목록을 불러오는 중 오류 발생:", error);
        }
    };

    const deleteExam = async (examId) => {
        try {
            await axios.delete(`https://api.ahimmoyak.click/exam/v1/${examId}`);
            setExamList(examList.filter(exam => exam.id !== examId));
        } catch (error) {
            console.error("시험 삭제 실패:", error);
        }
    };

    useEffect(() => {
        fetchExamList();
    }, [courseId]);

    return (
        <div>
            <h2>코스 {courseId}의 시험 목록</h2>
            <button onClick={() => navigate(`/mypage/${courseId}/exam/create`)}>시험 생성</button>
            {examList.length === 0 ? (
                <p>등록된 시험이 없습니다.</p>
            ) : (
                examList.map((exam) => (
                    <div key={exam.id} className="exam-card">
                        <h3>{exam.title}</h3>
                        <p>{exam.description}</p>
                        <p><strong>상태:</strong> {exam.status}</p>
                        <button onClick={() => navigate(`/mypage/${courseId}/exam/${exam.id}`)}>조회</button>
                        <button onClick={() => navigate(`/mypage/${courseId}/exam/${exam.id}/update`)}>수정</button>
                        <button onClick={() => deleteExam(exam.id)}>삭제</button>
                        {exam.status === "NOT_TAKEN" && (
                            <button onClick={() => navigate(`/mypage/${courseId}/exam/${exam.id}/take`)}>시험 보기</button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ExamList;
