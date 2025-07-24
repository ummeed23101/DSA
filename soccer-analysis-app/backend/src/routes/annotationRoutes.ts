import express from 'express';
import { AnnotationService } from '../services/AnnotationService';

const router = express.Router();
const annotationService = new AnnotationService();

// Create annotation
router.post('/', async (req, res) => {
  try {
    const annotation = await annotationService.createAnnotation(req.body);
    res.json(annotation);
  } catch (error) {
    console.error('Create annotation error:', error);
    res.status(500).json({ error: 'Failed to create annotation' });
  }
});

// Get annotations for video
router.get('/video/:videoId', async (req, res) => {
  try {
    const annotations = await annotationService.getAnnotationsByVideo(req.params.videoId);
    res.json(annotations);
  } catch (error) {
    console.error('Get annotations error:', error);
    res.status(500).json({ error: 'Failed to retrieve annotations' });
  }
});

// Update annotation
router.put('/:id', async (req, res) => {
  try {
    const annotation = await annotationService.updateAnnotation(req.params.id, req.body);
    if (!annotation) {
      return res.status(404).json({ error: 'Annotation not found' });
    }
    res.json(annotation);
  } catch (error) {
    console.error('Update annotation error:', error);
    res.status(500).json({ error: 'Failed to update annotation' });
  }
});

// Delete annotation
router.delete('/:id', async (req, res) => {
  try {
    await annotationService.deleteAnnotation(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete annotation error:', error);
    res.status(500).json({ error: 'Failed to delete annotation' });
  }
});

// Create marker
router.post('/markers', async (req, res) => {
  try {
    const marker = await annotationService.createMarker(req.body);
    res.json(marker);
  } catch (error) {
    console.error('Create marker error:', error);
    res.status(500).json({ error: 'Failed to create marker' });
  }
});

// Get markers for video
router.get('/markers/video/:videoId', async (req, res) => {
  try {
    const markers = await annotationService.getMarkersByVideo(req.params.videoId);
    res.json(markers);
  } catch (error) {
    console.error('Get markers error:', error);
    res.status(500).json({ error: 'Failed to retrieve markers' });
  }
});

export { router as annotationRoutes };