import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { registerIVSTech, registerIVSQualityPlugin } from 'amazon-ivs-player';
import EventEmitter from 'events';

if (!global.EventEmitter) {
  global.EventEmitter = EventEmitter;
}

const DEFAULT_STREAM = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";

const IVSPlayer = ({streamUrl}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const techRegistered = useRef(false);
  // const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    // Initialize only once
    if (!techRegistered.current) {
      try {
        // Register IVS tech
        registerIVSTech(videojs, {
          wasmWorker: '/amazon-ivs-wasmworker.min.js',
          wasmBinary: '/amazon-ivs-wasmworker.min.wasm'
        });
        registerIVSQualityPlugin(videojs);
        techRegistered.current = true;
      } catch (error) {
        console.error('Error registering IVS tech:', error);
      }
    }

    // Create player instance
    const createPlayer = () => {
      if (!videoRef.current || playerRef.current) return;

      try {
        const videoElement = videoRef.current;
        const player = videojs(videoElement, {
          techOrder: ['AmazonIVS'],
          controls: true,
          fluid: true,
          html5: {
            nativeAudioTracks: false,
            nativeVideoTracks: false
          }
        });

        player.ready(() => {
          console.log('Player ready');
          try {
            const ivsPlayer = player.getIVSPlayer();

            // Set up event handlers
            const PlayerState = player.getIVSEvents().PlayerState;
            ivsPlayer.addEventListener(PlayerState.PLAYING, () => {
              console.log('Player State - PLAYING');
            });

            // Enable quality plugin
            player.enableIVSQualityPlugin();

            // Set initial settings
            player.volume(0.5);

            // Load stream
            setTimeout(() => {
              player.src(streamUrl);
            }, 0);

          } catch (error) {
            console.error('Error setting up IVS player after ready:', error);
          }
        });

        playerRef.current = player;
      } catch (error) {
        console.error('Error creating player:', error);
      }
    };

    // Ensure DOM is ready before creating player
    if (document.readyState === 'complete') {
      createPlayer();
    } else {
      window.addEventListener('load', createPlayer);
      return () => window.removeEventListener('load', createPlayer);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (error) {
          console.error('Error disposing player:', error);
        }
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (streamUrl && playerRef.current) {
      playerRef.current.src(streamUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/*<form*/}
      {/*  onSubmit={handleSubmit}*/}
      {/*  className="mb-4 text-center"*/}
      {/*>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="Enter .m3u8 URL"*/}
      {/*    value={streamUrl}*/}
      {/*    onChange={(e) => setStreamUrl(e.target.value)}*/}
      {/*    className="px-4 py-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
      {/*  />*/}
      {/*  <button*/}
      {/*    type="submit"*/}
      {/*    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
      {/*  >*/}
      {/*    Load*/}
      {/*  </button>*/}
      {/*</form>*/}

      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
        />
      </div>
    </div>
  );
};

export default IVSPlayer;