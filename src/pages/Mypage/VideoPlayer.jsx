import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ReactPlayer from "react-player";
import useAxios from "../../hooks/api/useAxios";

export default function VideoPlayer() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const info = queryParams.get("info");

    const [isPlaying, setIsPlaying] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (info) {
            setUrl(`http://localhost:8080/file/video/${info}`);
        }
    }, [info]);

    return (
        <div>
            <ReactPlayer className="player" url={url} controls={true} playing={isPlaying} width="100vw" height="100vh" />
        </div>
    );
}
