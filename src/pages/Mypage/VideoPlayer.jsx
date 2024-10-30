import { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import useAxios from "../../hooks/api/useAxios";

export default function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [info, setInfo] = useState(null);
    const [url, setUrl] = useState("");
    const { data, error, fetchData } = useAxios();

    useEffect(() => {
        fetchData("course/1/curriculum/1/contents/451", "get");
    }, []);

    useEffect(() => {
        if (data) {
            console.log(data.fileInfo);
            setInfo(data.fileInfo);
        }
    }, [data]);

    useEffect(() => {
        if (info) {
            setUrl(`http://localhost:8080/file/video/${info}`);
        }
    }, [info]);

    return (
        <div>
            <ReactPlayer
                className="player"
                url={url}
                controls={true}
                playing={isPlaying}
                width="100vw"
                height="100vh"
            />
        </div>
    );
}
