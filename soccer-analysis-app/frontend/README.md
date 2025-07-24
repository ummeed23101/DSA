# Soccer Analysis App Frontend

React TypeScript frontend for the soccer game analysis application.

## Features

- Video upload with drag-and-drop support
- Video.js powered video player
- Timeline interface with markers
- Drawing and annotation tools (Fabric.js)
- Player tracking interface
- Real-time annotation overlays
- Export functionality

## Components

- `VideoUpload` - File upload component with progress tracking
- `VideoPlayer` - Video.js player with canvas overlay for annotations
- `Timeline` - Premiere Pro-style timeline with markers and scrubbing
- `AnnotationTools` - Drawing tools sidebar (circle, arrow, text, etc.)
- `PlayerTracking` - Player tracking management interface

## State Management

Uses Zustand for lightweight state management:
- Video metadata and current playback state
- Annotations and markers
- Player tracking data
- UI state

## Installation

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Environment

The frontend expects the backend API to be running on `http://localhost:3001`.

## Tech Stack

- React 18 + TypeScript
- Video.js for video playback
- Styled Components for styling
- Zustand for state management
- Axios for API calls
- Fabric.js for canvas drawing (ready for integration)