import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import AxiosManager from "../../components/authentication/AxiosManager.jsx";

const QnA = () => {
    const [myQna, setMyQna] = useState([]); // 게시글 리스트
    const [username, setUsername] = useState(""); // 사용자 이름
    const axiosInstance = AxiosManager();
    const isInstitution = true; // 강사 여부
    const navigate = useNavigate();
    const [option, setOption] = useState("all");

    // 사용자 정보를 가져오는 함수
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(`auth/v1/info`);
                setUsername(response.data.username); // 사용자 이름 설정
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };
        fetchUserInfo();
    }, []);

    // 게시글과 댓글 데이터를 함께 가져오는 함수
    useEffect(() => {
        const fetchMyQna = async () => {
            if (!username) return;

            try {
                // 게시글 데이터 가져오기
                const response = await axiosInstance.get(
                    `board/v1/student/${username}`
                );
                console.log(response);
                const posts = response.data.items || [];
                const qnaWithComments = await Promise.all(
                    posts.map(async (post) => {
                        try {
                            // 댓글 데이터 가져오기
                            const commentResponse = await axiosInstance.get(
                                `board/v1/${post.id}/comments?isInstitution=${isInstitution}`);
                            return {
                                ...post,
                                comments: commentResponse.data.items || [],
                            };
                        } catch (error) {
                            console.error(`Failed to fetch comments for post ${post.id}:`, error);
                            return {
                                ...post,
                                comments: [],
                            };
                        }
                    })
                );

                setMyQna(qnaWithComments); // 게시글과 댓글 데이터를 통합하여 저장
            } catch (error) {
                console.error("Failed to fetch QnA data:", error);
            }
        };

        fetchMyQna();
    }, [username]);

    const clickQna = (courseId,qnaId)=>{
        navigate(`/course/${courseId}/qna/${qnaId}`);
    }

    const optionMyQna = myQna.filter((qna) => {
        if (option === "all") return qna;
        if (option === "Answered") return qna.institutionComment > 0;
        if (option === "notAnswered") return qna.institutionComment === 0;
        return true;
    });

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">나의 질의응답</h2>
                <select className='absolute right-3 rounded-lg border-2 p-1'
                        onChange={(e) => setOption(e.target.value)}>
                    <option value={'all'}>전체</option>
                    <option value={'Answered'}>답변</option>
                    <option value={'notAnswered'}>미답변</option>
                </select>
            </div>

            <div className="space-y-4">
                {optionMyQna.map((question) => (
                    <div key={question.id} className="bg-white rounded-lg shadow p-4"
                         onClick={() => clickQna(question.courseId, question.id)}>
                        <h3 className="font-semibold text-lg mb-2">{question.title}</h3>
                        <p className="text-gray-600 mb-4">{question.content}</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">{question.createdAt}</span>
                            <span
                                className={`px-3 py-1 rounded ${
                                    question.institutionComment > 0
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                {question.institutionComment > 0 ? "답변 완료" : "답변 대기중"}
              </span>
                        </div>
                        {question.comments && question.comments.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded">
                                <h4 className="font-semibold mb-2">답변</h4>
                                {question.comments.map((comment) => (
                                    <div key={comment.id} className="mb-2">
                                        {comment.content}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {myQna.length === 0 && !username && (
                    <div className="text-center text-gray-500">질문 데이터를 불러오는 중입니다...</div>
                )}
            </div>
        </div>
    );
};

export default QnA;
