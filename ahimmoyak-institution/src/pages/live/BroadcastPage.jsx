import React, { useState, useEffect, useRef } from 'react';
import IVSBroadcastClient from 'amazon-ivs-web-broadcast';
import { Camera, Mic, MicOff, Video, VideoOff, Monitor } from 'lucide-react';

const BroadcastPage = () => {
  const [client, setClient] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMic, setSelectedMic] = useState('');

  const canvasRef = useRef(null);
  const streamConfig = IVSBroadcastClient.STANDARD_LANDSCAPE;

  useEffect(() => {
    initializeClient();
    getDevices();
    setMediaStream()
  }, []);

  const initializeClient = async () => {
    try {
      const broadcastClient = IVSBroadcastClient.create({
        streamConfig: streamConfig,
        ingestEndpoint: '24312cd67dc1.global-contribute.live-video.net'
      });

      setClient(broadcastClient);

      if (canvasRef.current) {
        broadcastClient.attachPreview(canvasRef.current);
      }
    } catch (error) {
      console.error('Failed to create broadcast client:', error);
    }
  };

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(device => device.kind === 'videoinput');
      const audioInputs = devices.filter(device => device.kind === 'audioinput');

      setVideoDevices(videoInputs);
      setAudioDevices(audioInputs);

      if (videoInputs.length) setSelectedCamera(videoInputs[0].deviceId);
      if (audioInputs.length) setSelectedMic(audioInputs[0].deviceId);
    } catch (error) {
      console.error('Failed to get devices:', error);
    }
  };

  const setMediaStream = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedCamera,
          width: { ideal: streamConfig.maxResolution.width },
          height: { ideal: streamConfig.maxResolution.height },
        },
        audio: false,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedMic },
        video: false,
      });

      client.addVideoInputDevice(cameraStream, 'camera', { index: 1 });
      client.addAudioInputDevice(audioStream, 'microphone');
    }catch (error){
      console.error(error);
    }
  }

  const startStream = async () => {
    try {
      await client.startBroadcast('sk_ap-northeast-2_bcfn6G92ZQtV_nm2BbGAVzrEFb1ugDiF1LGjhDeSf4b');
      setIsStreaming(true);
    } catch (error) {
      console.error('Failed to start stream:', error);
    }
  };

  const stopStream = () => {
    try {
      client.stopBroadcast();
      setIsStreaming(false);
      setIsScreenSharing(false);
    } catch (error) {
      console.error('Failed to stop stream:', error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (client.getVideoInputDevice('screen')) {
          client.removeVideoInputDevice('screen');
        }
        client.addVideoInputDevice(screenStream, 'screen', { index: 0 });
        setIsScreenSharing(true);
      } else {
        client.removeVideoInputDevice('screen');
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
    }
  };

  const toggleMic = () => {
    const audioDevice = client.getAudioInputDevice('microphone');
    if (audioDevice) {
      const audioTrack = audioDevice.getAudioTracks()[0];
      audioTrack.enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = () => {
    const videoDevice = client.getVideoInputDevice('camera').source;
    if (videoDevice) {
      const videoTrack = videoDevice.getVideoTracks()[0];
      videoTrack.enabled = !isCameraOn;
      setIsCameraOn(!isCameraOn);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-800 p-4 rounded-lg">
          <div className="flex gap-4">
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Camera</option>
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>

            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Microphone</option>
              {audioDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              onClick={toggleCamera}
              className={`p-2 rounded-lg ${
                isCameraOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } transition-colors`}
            >
              {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button
              onClick={toggleMic}
              className={`p-2 rounded-lg ${
                isMicOn
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } transition-colors`}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-2 rounded-lg ${
                isScreenSharing
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              } transition-colors`}
            >
              <Monitor size={24} />
            </button>

            <button
              onClick={isStreaming ? stopStream : startStream}
              className={`px-4 py-2 rounded-lg font-medium ${
                isStreaming
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              {isStreaming ? "Stop Stream" : "Start Stream"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastPage;