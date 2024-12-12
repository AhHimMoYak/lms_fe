import React, { useState, useRef, useEffect } from 'react';
import Broadcast from "../../components/live/Broadcast.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";

const LivePage = () => {

  const {liveId} = useParams();

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "John", message: "안녕하세요!", time: "10:00" },
    { id: 2, user: "Jane", message: "강의 잘 들을게요!", time: "10:01" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef(null);
  const broadcastContainerRef = useRef(null);
  const [chatHeight, setChatHeight] = useState("600px");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.ahimmoyak.click/live/v1/${liveId}/channel`)
      .then((response) => {
        setChannel(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('데이터 로드 실패:', error);
      });
  }, []);

  useEffect(() => {
    const updateChatHeight = () => {
      if (broadcastContainerRef.current) {
        const height = broadcastContainerRef.current.getBoundingClientRect().height;
        setChatHeight(`${height}px`);
      }
    };

    updateChatHeight();
    window.addEventListener('resize', updateChatHeight);
    return () => window.removeEventListener('resize', updateChatHeight);
  }, [channel]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, {
      id: Date.now(),
      user: "나",
      message: chatInput,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatInput('');
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">라이브 스트리밍</h2>
        </div>
      </header>
      <div className="bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex gap-4">
            {/* 왼쪽: 방송 화면 + 정보 */}
            {channel && (
              <div className="flex-grow" ref={broadcastContainerRef}>
                {/* 방송 화면 */}
                <Broadcast
                  ingestEndpoint={channel.ingestEndpoint}
                  streamKey={channel.streamKey}
                />

                {/* 방송 정보 */}
                <div className="bg-white rounded-lg shadow-md p-6 -mt-1">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{channel.title}</h1>
                    <p className="mb-2">
                      <span className="font-semibold">시작:</span> {new Date(channel.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <p className="mb-2">
                        <span className="font-semibold">강사:</span> {channel.instructor}
                      </p>
                      <p>
                        <span className="font-semibold">코스:</span> {channel.course}
                      </p>
                    </div>
                    <div className="text-right">
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 오른쪽: 채팅창 */}
            <div
              className="w-96 bg-white rounded-lg shadow-md flex flex-col"
              style={{height: chatHeight}}
            >
              {/* 채팅 헤더 */}
              <div className="p-4 border-b">
                <h2 className="font-bold">실시간 채팅</h2>
              </div>

              {/* 채팅 메시지 영역 */}
              <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-2"
              >
                {chatMessages.map(msg => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">{msg.user}</span>
                        <span className="text-gray-500 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 채팅 입력 영역 */}
              <div className="border-t bg-gray-50">
                <form onSubmit={handleSendMessage} className="p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="메시지를 입력하세요"
                      className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors min-w-14"
                    >
                      전송
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivePage;
