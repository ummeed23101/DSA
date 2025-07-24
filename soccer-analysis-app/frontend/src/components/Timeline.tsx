import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { VideoMetadata } from '../stores/videoStore';
import { useVideoStore } from '../stores/videoStore';

const TimelineContainer = styled.div`
  padding: 1rem;
  background-color: #2d2d2d;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  margin: 0;
  color: #ffffff;
`;

const TimeDisplay = styled.div`
  color: #4CAF50;
  font-family: monospace;
  font-size: 1rem;
`;

const TimelineTrack = styled.div`
  position: relative;
  height: 60px;
  background-color: #1a1a1a;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  border: 1px solid #404040;
`;

const ProgressBar = styled.div<{ width: string }>`
  height: 100%;
  background-color: rgba(76, 175, 80, 0.3);
  width: ${props => props.width};
  border-radius: 4px;
  transition: width 0.1s ease;
`;

const PlayHead = styled.div<{ position: string }>`
  position: absolute;
  top: 0;
  left: ${props => props.position};
  width: 2px;
  height: 100%;
  background-color: #4CAF50;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 12px;
    height: 12px;
    background-color: #4CAF50;
    border-radius: 50%;
  }
`;

const Marker = styled.div<{ position: string; color: string }>`
  position: absolute;
  top: 0;
  left: ${props => props.position};
  width: 3px;
  height: 100%;
  background-color: ${props => props.color};
  cursor: pointer;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -4px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid ${props => props.color};
  }
  
  &:hover::after {
    content: attr(data-label);
    position: absolute;
    top: -30px;
    left: -20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 20;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const ControlButton = styled.button`
  background-color: #404040;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #4CAF50;
  }

  &.active {
    background-color: #4CAF50;
  }
`;

const TimeInput = styled.input`
  background-color: #1a1a1a;
  color: white;
  border: 1px solid #404040;
  padding: 0.3rem;
  border-radius: 3px;
  width: 80px;
  font-family: monospace;
`;

const MarkerInput = styled.input`
  background-color: #1a1a1a;
  color: white;
  border: 1px solid #404040;
  padding: 0.3rem;
  border-radius: 3px;
  margin: 0 0.5rem;
`;

const MarkerList = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-top: 1rem;
`;

const MarkerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  background-color: #1a1a1a;
  margin-bottom: 0.2rem;
  border-radius: 3px;
  font-size: 0.8rem;
`;

interface TimelineProps {
  video: VideoMetadata;
}

const Timeline: React.FC<TimelineProps> = ({ video }) => {
  const {
    currentTime,
    setCurrentTime,
    markers,
    addMarker,
    removeMarker
  } = useVideoStore();

  const [markerLabel, setMarkerLabel] = useState('');
  const [jumpToTime, setJumpToTime] = useState('0:00');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 0;
  };

  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * video.duration;
    setCurrentTime(newTime);
  }, [video.duration, setCurrentTime]);

  const addMarkerAtCurrentTime = () => {
    if (markerLabel.trim()) {
      const marker = {
        videoId: video.id,
        timestamp: currentTime,
        label: markerLabel.trim(),
        color: '#FF5722'
      };
      
      addMarker({
        id: `marker_${Date.now()}`,
        ...marker,
        createdAt: new Date()
      });
      
      setMarkerLabel('');
    }
  };

  const jumpToTimeHandler = () => {
    const time = parseTime(jumpToTime);
    if (time >= 0 && time <= video.duration) {
      setCurrentTime(time);
    }
  };

  const progressPercentage = (currentTime / video.duration) * 100;
  const playHeadPosition = `${progressPercentage}%`;

  return (
    <TimelineContainer>
      <TimelineHeader>
        <TimelineTitle>Timeline</TimelineTitle>
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(video.duration)}
        </TimeDisplay>
      </TimelineHeader>

      <TimelineTrack onClick={handleTimelineClick}>
        <ProgressBar width={`${progressPercentage}%`} />
        <PlayHead position={playHeadPosition} />
        
        {markers.map(marker => {
          const markerPosition = (marker.timestamp / video.duration) * 100;
          return (
            <Marker
              key={marker.id}
              position={`${markerPosition}%`}
              color={marker.color}
              data-label={marker.label}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTime(marker.timestamp);
              }}
            />
          );
        })}
      </TimelineTrack>

      <Controls>
        <div>
          <TimeInput
            value={jumpToTime}
            onChange={(e) => setJumpToTime(e.target.value)}
            placeholder="0:00"
          />
          <ControlButton onClick={jumpToTimeHandler}>
            Jump
          </ControlButton>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MarkerInput
            value={markerLabel}
            onChange={(e) => setMarkerLabel(e.target.value)}
            placeholder="Marker label"
            onKeyPress={(e) => e.key === 'Enter' && addMarkerAtCurrentTime()}
          />
          <ControlButton onClick={addMarkerAtCurrentTime}>
            Add Marker
          </ControlButton>
        </div>

        <ControlButton onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
          ⏪ -10s
        </ControlButton>
        
        <ControlButton onClick={() => setCurrentTime(Math.min(video.duration, currentTime + 10))}>
          +10s ⏩
        </ControlButton>
      </Controls>

      {markers.length > 0 && (
        <MarkerList>
          {markers
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(marker => (
              <MarkerItem key={marker.id}>
                <span>
                  {formatTime(marker.timestamp)} - {marker.label}
                </span>
                <div>
                  <button
                    onClick={() => setCurrentTime(marker.timestamp)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4CAF50',
                      cursor: 'pointer',
                      marginRight: '0.5rem'
                    }}
                  >
                    Go
                  </button>
                  <button
                    onClick={() => removeMarker(marker.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f44336',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </MarkerItem>
            ))}
        </MarkerList>
      )}
    </TimelineContainer>
  );
};

export default Timeline;