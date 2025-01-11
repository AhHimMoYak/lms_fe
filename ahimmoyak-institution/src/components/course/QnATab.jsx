import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import AxiosManager from "../authentication/AxiosManager.jsx";

const QnATab = () => {
  const [boards, setBoards] = useState([]);
  const { courseId } = useParams();
  const [option, setOption] = useState("all");
  const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]); // 각 페이지의 키들을 저장
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // 현재 페이지 인덱스
  const navigate = useNavigate();
  const axiosInstance = AxiosManager();
  const type = "qna";

  const fetchBoards = async (keyParam = "", reset = false) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
          `board/v1/courses/${courseId}/${type}?${keyParam}`);

      if (response.data && response.data.items) {
        setBoards((prevBoards) =>
            keyParam
                ? [
                  ...prevBoards,
                  ...response.data.items.filter(
                      (item) => !prevBoards.some((board) => board.id === item.id)
                  ),
                ]
                : response.data.items
        );


        const newLastEvaluatedKey = response.data.lastEvaluatedKey || null;
        if (newLastEvaluatedKey && keyParam) {
          setLastEvaluatedKeys((prevKeys) => [...prevKeys, newLastEvaluatedKey]);
        } else {
          setLastEvaluatedKeys([newLastEvaluatedKey]);
        }
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(null, true);
  }, [type, courseId]);

  const handleNextPage = () => {
    if (lastEvaluatedKeys[page]) {
      const keyParam = `&lastEvaluatedKey=${encodeURIComponent(
          JSON.stringify(lastEvaluatedKeys[page])
      )}`;
      setPage((prevPage) => prevPage + 1);
      fetchBoards(keyParam);
    }
  };

  const optionBoards = boards.filter((board) => {
    if (option === "all") return board;
    if (option === "notAnswered") return board.institutionComment === 0;
    return true;
  });

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b relative flex">
        <h2 className="text-lg font-medium">질문게시판</h2>
        <select className='absolute right-3 rounded-lg border-2 p-1' onChange={(e) => setOption(e.target.value)}>
          <option value={'all'}  >전체</option>
          <option value={'notAnswered'} >미답변</option>
        </select>
      </div>
      <div className="divide-y">
        {optionBoards.map(question => (
          <div key={question.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/courses/${courseId}/qna/${question.id}`)}>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{question.title}</h3>
                <p className="text-sm text-gray-500">{question.userName}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{question.createdAt === question.updatedAt
                  ? new Date(question.updatedAt).toISOString().split('T')[0]
                  : `${new Date(question.updatedAt).toISOString().split('T')[0]} (수정됨)`}</div>
                <span className={`text-sm ${question.institutionComment>0 ? 'text-green-600' : 'text-orange-600'}`}>
                {question.institutionComment ? '답변완료' : '미답변'}
              </span>
              </div>
            </div>
          </div>
        ))}
        {loading && <div className="p-4 text-center">로딩 중...</div>}
        {!loading && lastEvaluatedKeys[page] && (
            <button
                onClick={handleNextPage}
                className="p-4 w-full text-center text-blue-600 hover:underline"
            >
              더 보기
            </button>
        )}
      </div>
    </div>
  );
}
export default QnATab;