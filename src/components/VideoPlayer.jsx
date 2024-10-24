import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ url, streamKey, type }) => {
  const videoRef = useRef();

  console.log(streamKey)

  useEffect(() => {
    if (type === 'm3u8' && Hls.isSupported()) {
      const hls = new Hls();
      hls.config.lowLatencyMode = true;
      hls.loadSource(`${url}${streamKey}_hd1080.m3u8`);
      hls.attachMedia(videoRef.current);

    }
  }, [url, streamKey, type]);

  return type === 'm3u8' ? (
    <video ref={videoRef} controls className="video-player"/>
  ) : (
    <video ref={videoRef} src={`${url}${streamKey}_hd1080.m3u8`} controls className="video-player"/>
  );
};

export default VideoPlayer;