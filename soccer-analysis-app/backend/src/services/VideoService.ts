import path from 'path';
import fs from 'fs/promises';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';
import { VideoMetadata } from '../types';

export class VideoService {
  private videosData: Map<string, VideoMetadata> = new Map();
  private uploadsDir = path.join(__dirname, '../../uploads');

  constructor() {
    this.ensureUploadDirs();
  }

  private async ensureUploadDirs() {
    try {
      await fs.mkdir(path.join(this.uploadsDir, 'videos'), { recursive: true });
      await fs.mkdir(path.join(this.uploadsDir, 'thumbnails'), { recursive: true });
    } catch (error) {
      console.error('Error creating upload directories:', error);
    }
  }

  async processVideo(file: Express.Multer.File): Promise<VideoMetadata> {
    const videoId = uuidv4();
    
    return new Promise((resolve, reject) => {
      ffmpeg(file.path)
        .ffprobe((err, metadata) => {
          if (err) {
            reject(err);
            return;
          }

          const videoStream = metadata.streams.find(s => s.codec_type === 'video');
          if (!videoStream) {
            reject(new Error('No video stream found'));
            return;
          }

          const videoMetadata: VideoMetadata = {
            id: videoId,
            filename: file.filename,
            originalName: file.originalname,
            duration: metadata.format.duration || 0,
            width: videoStream.width || 0,
            height: videoStream.height || 0,
            fps: this.parseFps(videoStream.r_frame_rate || '0/1'),
            uploadedAt: new Date(),
            fileSize: file.size,
            mimeType: file.mimetype
          };

          this.videosData.set(videoId, videoMetadata);
          
          // Generate thumbnail
          this.generateThumbnail(file.path, videoId);
          
          resolve(videoMetadata);
        });
    });
  }

  private parseFps(frameRate: string): number {
    const [num, den] = frameRate.split('/').map(Number);
    return den ? num / den : 0;
  }

  private async generateThumbnail(videoPath: string, videoId: string): Promise<void> {
    const thumbnailPath = path.join(this.uploadsDir, 'thumbnails', `${videoId}.jpg`);
    
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          count: 1,
          folder: path.join(this.uploadsDir, 'thumbnails'),
          filename: `${videoId}.jpg`,
          timemarks: ['50%']
        })
        .on('end', () => resolve())
        .on('error', (err) => {
          console.error('Thumbnail generation error:', err);
          resolve(); // Don't fail the upload if thumbnail fails
        });
    });
  }

  async getVideoById(id: string): Promise<VideoMetadata | null> {
    return this.videosData.get(id) || null;
  }

  async getAllVideos(): Promise<VideoMetadata[]> {
    return Array.from(this.videosData.values());
  }

  async deleteVideo(id: string): Promise<void> {
    const video = this.videosData.get(id);
    if (video) {
      try {
        // Delete video file
        const videoPath = path.join(this.uploadsDir, 'videos', video.filename);
        await fs.unlink(videoPath);
        
        // Delete thumbnail
        const thumbnailPath = path.join(this.uploadsDir, 'thumbnails', `${id}.jpg`);
        await fs.unlink(thumbnailPath).catch(() => {}); // Ignore if thumbnail doesn't exist
        
        this.videosData.delete(id);
      } catch (error) {
        console.error('Error deleting video files:', error);
        throw error;
      }
    }
  }
}