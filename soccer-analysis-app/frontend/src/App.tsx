import React, { useState } from 'react';
import styled from 'styled-components';
import VideoUpload from './components/VideoUpload';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import AnnotationTools from './components/AnnotationTools';
import PlayerTracking from './components/PlayerTracking';
import { useVideoStore } from './stores/videoStore';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
`;

const Header = styled.header`
  background-color: #2d2d2d;
  padding: 1rem;
  border-bottom: 1px solid #404040;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const VideoSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #404040;
`;

const ToolsSection = styled.div`
  flex: 1;
  background-color: #252525;
  padding: 1rem;
  overflow-y: auto;
`;

const TimelineSection = styled.div`
  height: 200px;
  background-color: #2d2d2d;
  border-top: 1px solid #404040;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #4CAF50;
`;

function App() {
  const { currentVideo } = useVideoStore();
  const [activeTab, setActiveTab] = useState<'annotations' | 'tracking'>('annotations');

  return (
    <AppContainer>
      <Header>
        <Title>⚽ Soccer Game Analysis</Title>
      </Header>
      
      <MainContent>
        <VideoSection>
          {!currentVideo ? (
            <VideoUpload />
          ) : (
            <VideoPlayer video={currentVideo} />
          )}
        </VideoSection>
        
        <ToolsSection>
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('annotations')}
              style={{
                backgroundColor: activeTab === 'annotations' ? '#4CAF50' : '#404040',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                marginRight: '0.5rem',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Annotations
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              style={{
                backgroundColor: activeTab === 'tracking' ? '#4CAF50' : '#404040',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Player Tracking
            </button>
          </div>
          
          {activeTab === 'annotations' ? (
            <AnnotationTools />
          ) : (
            <PlayerTracking />
          )}
        </ToolsSection>
      </MainContent>
      
      {currentVideo && (
        <TimelineSection>
          <Timeline video={currentVideo} />
        </TimelineSection>
      )}
    </AppContainer>
  );
}

export default App;