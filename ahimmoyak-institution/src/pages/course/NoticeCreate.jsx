import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const NoticeCreate = () => {
  const [notice, setNotice] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const {courseId} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직
    navigate(-1);
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block mb-2 font-medium">제목</label>
            <input
              type="text"
              value={notice.title}
              onChange={e => setNotice({...notice, title: e.target.value})}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">내용</label>
            <textarea
              value={notice.content}
              onChange={e => setNotice({...notice, content: e.target.value})}
              className="w-full border rounded-lg p-2 h-64"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              등록
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NoticeCreate;