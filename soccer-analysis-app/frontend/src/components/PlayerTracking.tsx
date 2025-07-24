import React, { useState } from 'react';
import styled from 'styled-components';
import { useVideoStore } from '../stores/videoStore';

const TrackingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled.div`
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #404040;
`;

const SectionTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: #4CAF50;
  font-size: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  background-color: ${props => 
    props.variant === 'danger' ? '#f44336' : 
    props.variant === 'primary' ? '#4CAF50' : '#404040'
  };
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  background-color: #2d2d2d;
  color: white;
  border: 1px solid #404040;
  padding: 0.3rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const Select = styled.select`
  background-color: #2d2d2d;
  color: white;
  border: 1px solid #404040;
  padding: 0.3rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const TrackerList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const TrackerItem = styled.div<{ active: boolean; teamColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.active ? '#2d2d2d' : '#1a1a1a'};
  margin-bottom: 0.3rem;
  border-radius: 3px;
  border-left: 4px solid ${props => props.teamColor};
  font-size: 0.9rem;
`;

const TrackerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TrackerActions = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const PathVisualization = styled.div`
  background-color: #2d2d2d;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
  min-height: 100px;
  position: relative;
  border: 1px solid #404040;
`;

const teamColors = [
  '#FF5722', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', 
  '#FF9800', '#795548', '#607D8B', '#E91E63', '#009688'
];

const PlayerTracking: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [selectedTeamColor, setSelectedTeamColor] = useState(teamColors[0]);
  const [trackingMode, setTrackingMode] = useState<'manual' | 'auto'>('manual');
  const [isTracking, setIsTracking] = useState(false);

  const {
    currentVideo,
    currentTime,
    trackers,
    addTracker,
    updateTracker,
    removeTracker
  } = useVideoStore();

  const createNewTracker = () => {
    if (!currentVideo || !playerName.trim()) return;

    const playerId = `player_${Date.now()}`;
    const tracker = {
      videoId: currentVideo.id,
      playerId,
      playerName: playerName.trim(),
      teamColor: selectedTeamColor,
      positions: [{
        timestamp: currentTime,
        x: 400, // Default center position
        y: 300,
        confidence: trackingMode === 'manual' ? 1.0 : 0.8
      }],
      isActive: true
    };

    addTracker({
      id: `tracker_${Date.now()}`,
      ...tracker,
      createdAt: new Date()
    });

    setPlayerName('');
  };

  const toggleTrackerActive = (trackerId: string) => {
    const tracker = trackers.find(t => t.id === trackerId);
    if (tracker) {
      updateTracker(trackerId, { isActive: !tracker.isActive });
    }
  };

  const addPositionToTracker = (trackerId: string, x: number, y: number) => {
    const tracker = trackers.find(t => t.id === trackerId);
    if (tracker) {
      const newPosition = {
        timestamp: currentTime,
        x,
        y,
        confidence: trackingMode === 'manual' ? 1.0 : 0.8
      };

      const updatedPositions = [...tracker.positions, newPosition];
      updateTracker(trackerId, { positions: updatedPositions });
    }
  };

  const getTrackerAtCurrentTime = (trackerId: string) => {
    const tracker = trackers.find(t => t.id === trackerId);
    if (!tracker) return null;

    const position = tracker.positions.find(
      pos => Math.abs(pos.timestamp - currentTime) < 0.5
    );

    return position ? { ...tracker, currentPosition: position } : null;
  };

  const calculatePlayerStats = (trackerId: string) => {
    const tracker = trackers.find(t => t.id === trackerId);
    if (!tracker || tracker.positions.length < 2) return null;

    const positions = tracker.positions.sort((a, b) => a.timestamp - b.timestamp);
    let totalDistance = 0;
    let maxSpeed = 0;

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];
      
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
      
      const timeDiff = curr.timestamp - prev.timestamp;
      const speed = timeDiff > 0 ? distance / timeDiff : 0;
      
      totalDistance += distance;
      maxSpeed = Math.max(maxSpeed, speed);
    }

    return {
      totalDistance: Math.round(totalDistance),
      maxSpeed: Math.round(maxSpeed),
      averageSpeed: positions.length > 1 ? Math.round(totalDistance / (positions[positions.length - 1].timestamp - positions[0].timestamp)) : 0,
      dataPoints: positions.length
    };
  };

  const exportTrackingData = () => {
    if (!currentVideo) return;

    const exportData = {
      video: currentVideo,
      trackers: trackers.map(tracker => ({
        ...tracker,
        stats: calculatePlayerStats(tracker.id)
      })),
      exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `player_tracking_${currentVideo.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeTrackers = trackers.filter(t => t.isActive);

  return (
    <TrackingContainer>
      <Section>
        <SectionTitle>Add New Player</SectionTitle>
        
        <Label>Player Name</Label>
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name..."
        />

        <Label>Team Color</Label>
        <Select
          value={selectedTeamColor}
          onChange={(e) => setSelectedTeamColor(e.target.value)}
        >
          {teamColors.map(color => (
            <option key={color} value={color} style={{ backgroundColor: color }}>
              {color}
            </option>
          ))}
        </Select>

        <Label>Tracking Mode</Label>
        <Select
          value={trackingMode}
          onChange={(e) => setTrackingMode(e.target.value as 'manual' | 'auto')}
        >
          <option value="manual">Manual Tracking</option>
          <option value="auto">Auto Tracking (Mock)</option>
        </Select>

        <Button variant="primary" onClick={createNewTracker}>
          ➕ Add Player Tracker
        </Button>
      </Section>

      <Section>
        <SectionTitle>Active Trackers ({activeTrackers.length})</SectionTitle>
        
        <TrackerList>
          {trackers.map(tracker => {
            const stats = calculatePlayerStats(tracker.id);
            const currentPos = getTrackerAtCurrentTime(tracker.id);
            
            return (
              <TrackerItem
                key={tracker.id}
                active={tracker.isActive}
                teamColor={tracker.teamColor}
              >
                <TrackerInfo>
                  <strong>{tracker.playerName}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>
                    {stats ? `${stats.dataPoints} points, ${stats.totalDistance}px distance` : 'No tracking data'}
                  </span>
                  {currentPos && (
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>
                      Current: ({Math.round(currentPos.currentPosition.x)}, {Math.round(currentPos.currentPosition.y)})
                    </span>
                  )}
                </TrackerInfo>
                
                <TrackerActions>
                  <button
                    onClick={() => toggleTrackerActive(tracker.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: tracker.isActive ? '#4CAF50' : '#999',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    {tracker.isActive ? '👁️' : '👁️‍🗨️'}
                  </button>
                  
                  <button
                    onClick={() => removeTracker(tracker.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f44336',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </TrackerActions>
              </TrackerItem>
            );
          })}
        </TrackerList>

        {trackers.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
            No player trackers created yet
          </div>
        )}
      </Section>

      {activeTrackers.length > 0 && (
        <Section>
          <SectionTitle>Player Statistics</SectionTitle>
          
          {activeTrackers.map(tracker => {
            const stats = calculatePlayerStats(tracker.id);
            if (!stats) return null;
            
            return (
              <div key={tracker.id} style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#2d2d2d', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ color: tracker.teamColor }}>{tracker.playerName}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>
                    {stats.dataPoints} tracking points
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div>Distance: {stats.totalDistance}px</div>
                  <div>Max Speed: {stats.maxSpeed}px/s</div>
                  <div>Avg Speed: {stats.averageSpeed}px/s</div>
                  <div>Duration: {formatTime(tracker.positions[tracker.positions.length - 1].timestamp - tracker.positions[0].timestamp)}</div>
                </div>
              </div>
            );
          })}
        </Section>
      )}

      <Section>
        <SectionTitle>Tracking Controls</SectionTitle>
        
        <Button
          variant={isTracking ? 'danger' : 'primary'}
          onClick={() => setIsTracking(!isTracking)}
        >
          {isTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
        </Button>

        <Button onClick={() => {
          // Clear all tracking data
          trackers.forEach(tracker => removeTracker(tracker.id));
        }}>
          🗑️ Clear All Trackers
        </Button>

        <Button onClick={exportTrackingData}>
          💾 Export Tracking Data
        </Button>
      </Section>

      {activeTrackers.length > 0 && (
        <Section>
          <SectionTitle>Path Visualization</SectionTitle>
          <PathVisualization>
            <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              📊 Interactive path visualization would be rendered here
              <br />
              <small>Showing movement paths for {activeTrackers.length} active players</small>
            </div>
          </PathVisualization>
        </Section>
      )}
    </TrackingContainer>
  );
};

export default PlayerTracking;