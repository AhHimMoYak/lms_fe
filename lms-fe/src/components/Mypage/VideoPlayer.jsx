import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ReactPlayer from "react-player";
import useAxios from "../../hooks/api/useAxios.jsx";
import Header from "../Header.jsx";

export default function VideoPlayer() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const info = queryParams.get("info");

    const [isPlaying, setIsPlaying] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (info) {
            setUrl(`http://localhost:8080/files/videos/${info}`);
        }
    }, [info]);

    return (
        <div>
            <Header/>
            <ReactPlayer className="player" url={url} controls={true} playing={isPlaying} width="100%" height="87.6vh" />
        </div>
    );
}
