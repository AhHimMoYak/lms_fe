import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AddLiveModal from "./AddLiveModal.jsx";
import axios from "axios";

const LiveStreamTab = ({provideInfo}) => {

  const [isAddLive, setIsAddLive] = useState(false);
  const navigate = useNavigate();

  const [liveList, setLiveList] = useState([
  ]);

  const fetchLiveList = () => {
    console.log("course" + provideInfo.courseTitle)
    axios
      .get(`https://api.ahimmoyak.click/live/v1/list/${provideInfo.provideId}`)
      .then((response) => {
        setLiveList(response.data.items)
      })
      .catch((error) => {
        console.error('데이터 로드 실패:', error);
      });
  }

  useEffect(() => {
    fetchLiveList()
  }, []);

  const [newLive, setNewLive] = useState({
    title: "",
    period: "",
    instructor: "",
    course: provideInfo.courseTitle,
    courseProvideId: provideInfo.provideId,
    startTime: "",
    endTime: "",
  });

  const handleLiveSubmit = async () => {
    const response = await axios.post('https://api.ahimmoyak.click/live/v1', newLive);
    setIsAddLive(false);
    setNewLive({
      title: "",
      period: "",
      instructor: "",
      course: provideInfo.courseTitle,
      courseProvideId: provideInfo.provideId,
      startTime: "",
      endTime: "",
    });
    fetchLiveList();
  }

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">라이브 방송</h2>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg" onClick={() => setIsAddLive(true)}>
          방송 예약
        </button>
      </div>
      <div className="divide-y">
        {liveList.map(stream => (
          <div key={stream.id} className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/live/${stream.id}`)}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{stream.title}</h3>
                <p className="text-sm text-gray-500">{stream.date}</p>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${
                stream.status === '예정' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {new Date(stream.startTime).toLocaleString()}
            </span>
            </div>
          </div>
        ))}
      </div>
      {isAddLive && <AddLiveModal onClose={() => setIsAddLive(false)} newLive={newLive} setNewLive={setNewLive} onAdd={handleLiveSubmit} />}
    </div>
  );
}
export default LiveStreamTab;