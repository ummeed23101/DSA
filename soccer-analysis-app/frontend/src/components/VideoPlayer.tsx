import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { VideoMetadata } from '../stores/videoStore';
import { useVideoStore } from '../stores/videoStore';

const PlayerContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CanvasOverlay = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
`;

const PlayerControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 20;
`;

const ControlButton = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

interface VideoPlayerProps {
  video: VideoMetadata;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<any>(null);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  
  const { 
    currentTime, 
    setCurrentTime, 
    setIsPlaying,
    annotations,
    trackers 
  } = useVideoStore();

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      // Initialize Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: false,
        width: '100%',
        height: 'auto',
        sources: [{
          src: `http://localhost:3001/uploads/videos/${video.filename}`,
          type: video.mimeType
        }]
      });

      // Listen to player events
      playerRef.current.on('timeupdate', () => {
        const time = playerRef.current.currentTime();
        setCurrentTime(time);
      });

      playerRef.current.on('play', () => {
        setIsPlaying(true);
      });

      playerRef.current.on('pause', () => {
        setIsPlaying(false);
      });

      playerRef.current.on('loadedmetadata', () => {
        updateCanvasSize();
      });

      playerRef.current.ready(() => {
        updateCanvasSize();
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [video]);

  const updateCanvasSize = () => {
    if (canvasRef.current && videoRef.current) {
      const videoElement = videoRef.current;
      const rect = videoElement.getBoundingClientRect();
      
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
      canvasRef.current.style.width = `${rect.width}px`;
      canvasRef.current.style.height = `${rect.height}px`;
    }
  };

  const drawAnnotations = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw annotations for current time
    const currentAnnotations = annotations.filter(
      annotation => Math.abs(annotation.timestamp - currentTime) < 0.5
    );

    currentAnnotations.forEach(annotation => {
      ctx.save();
      ctx.strokeStyle = annotation.style.color;
      ctx.lineWidth = annotation.style.strokeWidth;
      ctx.globalAlpha = annotation.style.opacity;

      if (annotation.style.fillColor) {
        ctx.fillStyle = annotation.style.fillColor;
      }

      switch (annotation.type) {
        case 'circle':
          const radius = annotation.dimensions?.width || 20;
          ctx.beginPath();
          ctx.arc(annotation.position.x, annotation.position.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          if (annotation.style.fillColor) {
            ctx.fill();
          }
          break;

        case 'arrow':
          // Simple arrow implementation
          const endX = annotation.position.x + (annotation.dimensions?.width || 50);
          const endY = annotation.position.y + (annotation.dimensions?.height || 0);
          
          ctx.beginPath();
          ctx.moveTo(annotation.position.x, annotation.position.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Arrow head
          const headLength = 10;
          const angle = Math.atan2(endY - annotation.position.y, endX - annotation.position.x);
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
          break;

        case 'text':
          ctx.fillStyle = annotation.style.color;
          ctx.font = '16px Arial';
          ctx.fillText(annotation.text || '', annotation.position.x, annotation.position.y);
          break;
      }

      ctx.restore();
    });

    // Draw player trackers
    const currentTrackers = trackers.filter(tracker => tracker.isActive);
    currentTrackers.forEach(tracker => {
      const position = tracker.positions.find(
        pos => Math.abs(pos.timestamp - currentTime) < 0.5
      );

      if (position) {
        ctx.save();
        ctx.fillStyle = tracker.teamColor;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        // Draw player circle
        ctx.beginPath();
        ctx.arc(position.x, position.y, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw player name
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(tracker.playerName, position.x, position.y - 20);

        ctx.restore();
      }
    });
  };

  useEffect(() => {
    drawAnnotations();
  }, [currentTime, annotations, trackers]);

  useEffect(() => {
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAnnotationMode = () => {
    setIsAnnotationMode(!isAnnotationMode);
  };

  const exportFrame = () => {
    if (canvasRef.current && videoRef.current) {
      // Create a new canvas with video frame + annotations
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d');
      
      if (exportCtx && videoRef.current) {
        exportCanvas.width = videoRef.current.videoWidth;
        exportCanvas.height = videoRef.current.videoHeight;
        
        // Draw video frame
        exportCtx.drawImage(videoRef.current, 0, 0);
        
        // Draw annotations (scaled)
        const scaleX = exportCanvas.width / canvasRef.current.width;
        const scaleY = exportCanvas.height / canvasRef.current.height;
        exportCtx.scale(scaleX, scaleY);
        exportCtx.drawImage(canvasRef.current, 0, 0);
        
        // Download
        const link = document.createElement('a');
        link.download = `analysis_frame_${currentTime.toFixed(2)}s.png`;
        link.href = exportCanvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <PlayerContainer>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        data-setup="{}"
      />
      
      <CanvasOverlay
        ref={canvasRef}
        style={{ pointerEvents: isAnnotationMode ? 'auto' : 'none' }}
      />
      
      <PlayerControls>
        <ControlButton onClick={toggleAnnotationMode}>
          {isAnnotationMode ? '🎯 Exit Annotation' : '✏️ Annotate'}
        </ControlButton>
        <ControlButton onClick={exportFrame}>
          📸 Export Frame
        </ControlButton>
      </PlayerControls>
    </PlayerContainer>
  );
};

export default VideoPlayer;