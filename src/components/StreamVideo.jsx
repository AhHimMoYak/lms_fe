import AuthManger from "../hooks/api/AuthManger";
import useAxios from "../hooks/api/useAxios";
import { useEffect, useState } from 'react';



function StreamVideo() {
    const { fetchData, data, error } = useAxios();
    const { Register }= AuthManger();


    return(
        <>
            <div className="stream-container">

            <div className="video-container">
                <video className="video-player" controls>
                    <source src="your-streaming-url-here" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="info-container">
                <div className="stream-info">
                    <h2>실시간으로 자바에 대해서 배워보기</h2>
                    <p>심종연 강사</p>
                    <p>Viewers: 123</p>
                </div>
            </div>

            </div>
        </>
    );
}

export default StreamVideo;