import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useVideoStore } from '../stores/videoStore';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1a1a1a;
  border: 2px dashed #404040;
  margin: 2rem;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #4CAF50;
  }

  &.dragover {
    border-color: #4CAF50;
    background-color: rgba(76, 175, 80, 0.1);
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #666;
`;

const UploadText = styled.div`
  font-size: 1.2rem;
  color: #999;
  text-align: center;
  margin-bottom: 2rem;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 300px;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    background-color: #4CAF50;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 1rem;
  text-align: center;
`;

const VideoUpload: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const { setCurrentVideo } = useVideoStore();

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:3001/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      if (response.data.success) {
        setCurrentVideo(response.data.video);
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));

    if (videoFile) {
      handleFileUpload(videoFile);
    } else {
      setError('Please upload a valid video file.');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <UploadContainer
      className={isDragOver ? 'dragover' : ''}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadIcon>🎬</UploadIcon>
      <UploadText>
        {isUploading
          ? `Uploading... ${uploadProgress}%`
          : 'Drag and drop a video file here, or click to browse'}
      </UploadText>
      
      {!isUploading && (
        <>
          <UploadButton
            onClick={() => document.getElementById('video-input')?.click()}
          >
            Browse Files
          </UploadButton>
          
          <FileInput
            id="video-input"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
        </>
      )}

      {isUploading && <ProgressBar progress={uploadProgress} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploadContainer>
  );
};

export default VideoUpload;