import AuthManger from "../hooks/api/AuthManger";
import useAxios from "../hooks/api/useAxios";
import { useEffect, useState } from 'react';
import VideoPlayer from "./VideoPlayer.jsx";



function StreamVideo() {
    const { fetchData, data, error } = useAxios();
    const { Register }= AuthManger();


    return(
        <>

            <div className="video-container">
                {/*<video className="video-player" controls>*/}
                {/*    <source src="http://172.16.10.251:8085/hls/2_hd1080.m3u8" type="video/m3u8" />*/}
                {/*    Your browser does not support the video tag.*/}
                {/*</video>*/}
                <VideoPlayer src="http://172.16.10.251:8085/hls/2_hd1080.m3u8" type="m3u8" />
            </div>

        </>
    );
}

export default StreamVideo;