import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Chatting from "../../components/Material/Chatting";
import VideoPlayer from "../../components/Material/VideoPlayer";
import HLSPlayer from "../../components/Material/HLSPlayer";
import useAxios from "../../hooks/api/useAxios.jsx";
import { Client } from "@stomp/stompjs";

import "../../styles/Material/LiveStream.css";
import {decodeToken} from "../../authentication/decodeToken.jsx";
import Modal from "../../components/Modal.jsx";
import { decodeTokenTutor } from "../../authentication/decodeTokenTutor.jsx";

function LiveStream() {
    const liveUrl = "http://172.16.10.251:8085/hls/";
    const websocketUrl = 'ws://172.16.11.71:8080/ws';

    const { fetchData: fetchLiveInfo, data: liveInfo } = useAxios();

    useEffect(() => {
        fetchLiveInfo(`/live/${streamKey}`, "get");
    }, []);

    // const query = new URLSearchParams(useLocation().search);
    // const content = query.get(content);
    const { streamKey } = useParams();

    const navigate = useNavigate();
    const handleNavigateToCourse = () => navigate(`/mypage/course/${liveInfo.courseId}`);

    const [chatOpen, setChatOpen] = useState(true);
    const [viewer, setViewer] = useState(0);

    const stompRef = useRef(null);
    useEffect(() => {
        stompRef.current = new Client({
            brokerURL: websocketUrl,
            onConnect: () => {console.log("websocket 연결됨")},
            onStompError: (frame) => {console.error("websocket 연결실패" + frame)},
            connectHeaders: {Authorization: localStorage.getItem("access")}
        });
        stompRef.current.activate();
        return () => {
            if (stompRef.current) stompRef.current.deactivate();
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalId, setModalId] = useState(null);

    const openModal = (event) => {
        setModalId(event.target.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="stream-page">
            <div className="stream-container">
                <div className="video-container">
                    {/*<VideoPlayer url={liveUrl} streamKey={streamKey} type="m3u8" />*/}
                    <HLSPlayer src={`${liveUrl}${streamKey}.m3u8`} />
                </div>
                <div className="info-container">
                    {liveInfo ? (
                        <div className="stream-info">
                            <p>
                                <a onClick={handleNavigateToCourse} href="">
                                    {liveInfo.course}
                                </a>
                            </p>
                            <h2>{liveInfo.title}</h2>
                            <p>{liveInfo.instructor}</p>
                            <p>Viewers: 123</p>

                            {decodeTokenTutor() ? (
                                <div>
                                    <button className="open-modal-button" id="send" onClick={openModal}>
                                        퀴즈 목록 및 전송 모달
                                    </button>
                                    {/* {isModalOpen && <Modal closeModal={closeModal} buttonId={modalId} />} */}
                                    <button className="open-modal-button" id="participation" onClick={openModal}>
                                        정답률 보는 모달
                                    </button>
                                    {isModalOpen && <Modal closeModal={closeModal} buttonId={modalId} />}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                      <div className="stream-info">
                          <h2>페이지 로딩중...</h2>
                          <p>Viewers: 123</p>
                      </div>
                    )}
                </div>
            </div>
            <Chatting setViewer={setViewer} liveId={streamKey} stompClient={stompRef.current}/>
        </div>
    );
}

export default LiveStream;
