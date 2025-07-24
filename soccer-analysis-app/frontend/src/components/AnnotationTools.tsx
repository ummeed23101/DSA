import React, { useState } from 'react';
import styled from 'styled-components';
import { useVideoStore } from '../stores/videoStore';

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToolSection = styled.div`
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

const ToolButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? '#4CAF50' : '#404040'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#4CAF50'};
  }
`;

const ColorPicker = styled.input`
  width: 40px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.2rem;
`;

const Slider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background-color: #2d2d2d;
  color: white;
  border: 1px solid #404040;
  padding: 0.3rem;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const AnnotationList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 1rem;
`;

const AnnotationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #2d2d2d;
  margin-bottom: 0.3rem;
  border-radius: 3px;
  font-size: 0.8rem;
`;

const AnnotationTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'circle' | 'arrow' | 'path' | 'highlight' | 'text'>('circle');
  const [strokeColor, setStrokeColor] = useState('#FF5722');
  const [fillColor, setFillColor] = useState('#FF572240');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [opacity, setOpacity] = useState(0.8);
  const [textInput, setTextInput] = useState('');

  const {
    currentVideo,
    currentTime,
    annotations,
    addAnnotation,
    removeAnnotation
  } = useVideoStore();

  const tools = [
    { id: 'circle', label: '⭕ Circle', icon: '⭕' },
    { id: 'arrow', label: '➡️ Arrow', icon: '➡️' },
    { id: 'path', label: '📏 Path', icon: '📏' },
    { id: 'highlight', label: '🟨 Highlight', icon: '🟨' },
    { id: 'text', label: '📝 Text', icon: '📝' }
  ];

  const addAnnotationAtCurrentTime = (type: typeof selectedTool, position: { x: number; y: number }) => {
    if (!currentVideo) return;

    const annotation = {
      videoId: currentVideo.id,
      timestamp: currentTime,
      type,
      position,
      dimensions: type === 'circle' ? { width: 30, height: 30 } : { width: 50, height: 20 },
      style: {
        color: strokeColor,
        strokeWidth,
        fillColor: type === 'highlight' || type === 'circle' ? fillColor : undefined,
        opacity
      },
      text: type === 'text' ? textInput : undefined
    };

    addAnnotation({
      id: `annotation_${Date.now()}`,
      ...annotation,
      createdAt: new Date()
    });

    if (type === 'text') {
      setTextInput('');
    }
  };

  const addQuickAnnotation = () => {
    // Add annotation at center of video (mock position)
    addAnnotationAtCurrentTime(selectedTool, { x: 400, y: 300 });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentAnnotations = annotations.filter(
    annotation => Math.abs(annotation.timestamp - currentTime) < 1
  );

  return (
    <ToolsContainer>
      <ToolSection>
        <SectionTitle>Drawing Tools</SectionTitle>
        <div>
          {tools.map(tool => (
            <ToolButton
              key={tool.id}
              active={selectedTool === tool.id}
              onClick={() => setSelectedTool(tool.id as any)}
            >
              {tool.icon} {tool.label.split(' ')[1]}
            </ToolButton>
          ))}
        </div>
      </ToolSection>

      <ToolSection>
        <SectionTitle>Style Settings</SectionTitle>
        
        <Label>Stroke Color</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ColorPicker
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <Input
            type="text"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>

        {(selectedTool === 'circle' || selectedTool === 'highlight') && (
          <>
            <Label>Fill Color</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ColorPicker
                type="color"
                value={fillColor.slice(0, 7)}
                onChange={(e) => setFillColor(e.target.value + '40')}
              />
              <Input
                type="text"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                style={{ width: '80px' }}
              />
            </div>
          </>
        )}

        <Label>Stroke Width: {strokeWidth}px</Label>
        <Slider
          type="range"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />

        <Label>Opacity: {Math.round(opacity * 100)}%</Label>
        <Slider
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />

        {selectedTool === 'text' && (
          <>
            <Label>Text Content</Label>
            <Input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
            />
          </>
        )}
      </ToolSection>

      <ToolSection>
        <SectionTitle>Quick Actions</SectionTitle>
        <ToolButton onClick={addQuickAnnotation}>
          ➕ Add {tools.find(t => t.id === selectedTool)?.label.split(' ')[1]}
        </ToolButton>
        
        <ToolButton onClick={() => {
          annotations.forEach(annotation => {
            if (Math.abs(annotation.timestamp - currentTime) < 1) {
              removeAnnotation(annotation.id);
            }
          });
        }}>
          🗑️ Clear Current
        </ToolButton>
      </ToolSection>

      {currentAnnotations.length > 0 && (
        <ToolSection>
          <SectionTitle>Current Annotations ({currentAnnotations.length})</SectionTitle>
          <AnnotationList>
            {currentAnnotations.map(annotation => (
              <AnnotationItem key={annotation.id}>
                <span>
                  {annotation.type.toUpperCase()} - {formatTime(annotation.timestamp)}
                  {annotation.text && ` - "${annotation.text}"`}
                </span>
                <button
                  onClick={() => removeAnnotation(annotation.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f44336',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </AnnotationItem>
            ))}
          </AnnotationList>
        </ToolSection>
      )}

      <ToolSection>
        <SectionTitle>Export</SectionTitle>
        <ToolButton onClick={() => {
          // Export annotations as JSON
          const exportData = {
            video: currentVideo,
            annotations: annotations,
            exportTime: new Date().toISOString()
          };
          
          const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
          });
          
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `annotations_${currentVideo?.id || 'export'}.json`;
          link.click();
          URL.revokeObjectURL(url);
        }}>
          💾 Export Annotations
        </ToolButton>
      </ToolSection>
    </ToolsContainer>
  );
};

export default AnnotationTools;