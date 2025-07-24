# Getting Started

This guide will help you set up and run the Soccer Game Analysis App locally.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- FFmpeg (for video processing - will be installed automatically)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd DSA/soccer-analysis-app
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:3001

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

3. **Open your browser and navigate to http://localhost:3000**

## Using the Application

### 1. Upload a Video
- Drag and drop a video file onto the upload area, or
- Click "Browse Files" to select a video file
- Supported formats: MP4, AVI, MOV, MKV

### 2. Video Analysis Tools

#### Annotations Tab
- **Drawing Tools**: Circle, Arrow, Path, Highlight, Text
- **Style Settings**: Customize colors, stroke width, opacity
- **Quick Actions**: Add annotations at current time
- **Export**: Save annotations as JSON

#### Player Tracking Tab
- **Add Players**: Enter player names and assign team colors
- **Tracking Modes**: Manual or Auto tracking (Mock)
- **Statistics**: View distance traveled, speed metrics
- **Export**: Save tracking data as JSON

### 3. Timeline Features
- **Playback Controls**: Play, pause, seek
- **Markers**: Add labeled markers at specific times
- **Time Navigation**: Jump to specific timestamps
- **Scrubbing**: Click on timeline to navigate

## API Endpoints

### Videos
- `POST /api/videos/upload` - Upload video
- `GET /api/videos` - List videos
- `GET /api/videos/:id` - Get video details
- `DELETE /api/videos/:id` - Delete video

### Annotations
- `POST /api/annotations` - Create annotation
- `GET /api/annotations/video/:videoId` - Get video annotations
- `PUT /api/annotations/:id` - Update annotation
- `DELETE /api/annotations/:id` - Delete annotation

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Building for Production

1. **Build the backend:**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

## Troubleshooting

- **Video upload fails**: Check file format and size (max 500MB)
- **FFmpeg errors**: Ensure FFmpeg is properly installed
- **Port conflicts**: Change ports in package.json if needed
- **CORS issues**: Backend CORS is configured for localhost:3000

## Features Implemented

✅ Video upload with drag-and-drop  
✅ Video playback with Video.js  
✅ Timeline interface with markers  
✅ Drawing tools (Circle, Arrow, Text, etc.)  
✅ Player tracking system  
✅ Export functionality  
✅ Responsive UI design  
✅ RESTful API backend  
✅ TypeScript support  
✅ State management with Zustand  

## Next Steps

- Integration with computer vision libraries for automatic player detection
- Cloud storage integration (AWS S3, Firebase)
- Real-time collaboration features
- Advanced analytics and reporting
- Mobile app development