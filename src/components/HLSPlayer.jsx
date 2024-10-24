import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(-1); // -1: 자동 선택

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      // 화질 목록 가져오기
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setQualityLevels(hls.levels);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setSelectedQuality(data.level);
      });

      setHlsInstance(hls);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, [src]);

  // 실시간 유지 - 최신 시점으로 자동 이동
  useEffect(() => {
    const keepLive = () => {
      if (hlsInstance && videoRef.current) {
        const liveSyncPosition = hlsInstance.liveSyncPosition;
        if (videoRef.current.currentTime < liveSyncPosition - 0.5) {
          videoRef.current.currentTime = liveSyncPosition;
        }
      }
    };

    const intervalId = setInterval(keepLive, 500); // 0.5초마다 최신 시점으로 이동

    return () => clearInterval(intervalId);
  }, [hlsInstance]);

  return (
    <div>
      {/* 비디오 요소에서 기본 재생바 숨김 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="video-player"
      />
    </div>
  );
};

export default HLSPlayer;
