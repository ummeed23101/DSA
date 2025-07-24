# Soccer Game Analysis App

A comprehensive application for soccer coaches and managers to analyze game footage with advanced video annotation and player tracking capabilities.

## Features

- **Video Upload & Playback**: Upload soccer game videos with timeline-based controls
- **Timeline Interface**: Premiere Pro-style timeline with scrubbing, markers, and precise control
- **Drawing & Annotation Tools**: Add circles, arrows, paths, and highlights on video frames
- **Player Tracking**: 2D/3D player trackers with movement visualization and path analysis
- **Export & Sharing**: Export annotated clips and generate analysis reports

## Tech Stack

- **Frontend**: React.js + TypeScript
- **Video Processing**: Video.js for video rendering and manipulation
- **Drawing Tools**: Fabric.js for canvas-based annotations
- **State Management**: Zustand for lightweight state management
- **Backend**: Node.js with Express
- **Database**: MongoDB for storing annotations and metadata
- **File Storage**: Local file system with option for cloud storage

## Project Structure

```
soccer-analysis-app/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express backend
├── shared/           # Shared types and utilities
└── docs/             # Documentation
```

## Getting Started

1. Install dependencies for both frontend and backend
2. Start the backend server
3. Start the frontend development server
4. Upload a video and start analyzing!

## Development

See individual README files in frontend/ and backend/ directories for specific setup instructions.