import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { VideoService } from '../services/VideoService';

// Set ffmpeg path
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

const router = express.Router();
const videoService = new VideoService();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/videos'));
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueId}${extension}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'));
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit
  }
});

// Upload video
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoMetadata = await videoService.processVideo(req.file);
    res.json({ success: true, video: videoMetadata });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ error: 'Failed to process video' });
  }
});

// Get video metadata
router.get('/:id', async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Failed to retrieve video' });
  }
});

// List all videos
router.get('/', async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.json(videos);
  } catch (error) {
    console.error('List videos error:', error);
    res.status(500).json({ error: 'Failed to retrieve videos' });
  }
});

// Delete video
router.delete('/:id', async (req, res) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

export { router as videoRoutes };