import {Clock, PlayCircle} from "lucide-react";
import React, {useState} from "react";

const ContentVideoViewer = ({content}) => {

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-4">
      {/* 비디오 플레이어 */}
      <div className="relative bg-black aspect-video rounded-lg overflow-hidden">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <PlayCircle className="w-12 h-12 text-white"/>
            </button>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            비디오 재생 중...
          </div>
        )}
      </div>

      {/* 비디오 정보 */}
      <div className="flex items-center text-gray-500">
        <Clock className="w-4 h-4 mr-1"/>
        <span>{content.duration}</span>
      </div>
    </div>
  )
}

export default ContentVideoViewer;