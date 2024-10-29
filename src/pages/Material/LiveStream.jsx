import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Chatting from "../../components/Material/Chatting";
import VideoPlayer from "../../components/Material/VideoPlayer";
import HLSPlayer from "../../components/Material/HLSPlayer";
import useAxios from "../../hooks/api/useAxios.jsx";

import "../../styles/Material/LiveStream.css";

function LiveStream() {
    const liveUrl = "http://172.16.10.251:8085/hls/";

    const {
        fetchData: fetchLiveInfo,
        data: liveInfo,
        error: liveInfoError,
    } = useAxios();
    useEffect(() => {
        fetchLiveInfo(`/live/${streamKey}`, "get");
    }, []);

    // const query = new URLSearchParams(useLocation().search);
    // const content = query.get(content);
    const { streamKey } = useParams();

    const navigate = useNavigate();
    const handleNavigateToCourse = () =>
        navigate(`/mypage/course/${liveInfo.courseId}`);

    const [chatOpen, setChatOpen] = useState(true);
    const [viewer, setViewer] = useState(0);

    if (liveInfo) console.log(liveInfo);

    return (
        <div
            style={{
                backgroundColor: "purple",
            }}
            className="stream-page"
        >
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
                        </div>
                    ) : (
                        <div className="stream-info">
                            <h2>페이지 로딩중...</h2>
                            <p>Viewers: 123</p>
                        </div>
                    )}
                </div>
            </div>

            <Chatting setViewer={setViewer} />
        </div>
    );
}

export default LiveStream;
