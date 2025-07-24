# Soccer Analysis App Backend

RESTful API backend for the soccer game analysis application.

## Features

- Video upload and processing with FFmpeg
- Video metadata extraction
- Annotation management
- Player tracking data storage
- Project management
- File serving for uploaded videos

## API Endpoints

### Videos
- `POST /api/videos/upload` - Upload a video file
- `GET /api/videos/:id` - Get video metadata
- `GET /api/videos` - List all videos
- `DELETE /api/videos/:id` - Delete a video

### Annotations
- `POST /api/annotations` - Create annotation
- `GET /api/annotations/video/:videoId` - Get annotations for video
- `PUT /api/annotations/:id` - Update annotation
- `DELETE /api/annotations/:id` - Delete annotation

### Projects
- `POST /api/projects` - Create analysis project
- `GET /api/projects/:id` - Get project
- `GET /api/projects` - List all projects
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Installation

```bash
npm install
npm run build
npm start
```

## Development

```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `UPLOAD_DIR` - Directory for uploaded files (default: ./uploads)

## File Structure

- `/src/routes` - API route handlers
- `/src/services` - Business logic services
- `/src/middleware` - Express middleware
- `/uploads` - Uploaded video files and thumbnails