import { v4 as uuidv4 } from 'uuid';
import { Annotation, TimelineMarker } from '../types';

export class AnnotationService {
  private annotations: Map<string, Annotation> = new Map();
  private markers: Map<string, TimelineMarker> = new Map();

  async createAnnotation(annotationData: Omit<Annotation, 'id' | 'createdAt'>): Promise<Annotation> {
    const annotation: Annotation = {
      ...annotationData,
      id: uuidv4(),
      createdAt: new Date()
    };

    this.annotations.set(annotation.id, annotation);
    return annotation;
  }

  async getAnnotationsByVideo(videoId: string): Promise<Annotation[]> {
    return Array.from(this.annotations.values())
      .filter(annotation => annotation.videoId === videoId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async updateAnnotation(id: string, updateData: Partial<Annotation>): Promise<Annotation | null> {
    const annotation = this.annotations.get(id);
    if (!annotation) {
      return null;
    }

    const updatedAnnotation = { ...annotation, ...updateData };
    this.annotations.set(id, updatedAnnotation);
    return updatedAnnotation;
  }

  async deleteAnnotation(id: string): Promise<void> {
    this.annotations.delete(id);
  }

  async createMarker(markerData: Omit<TimelineMarker, 'id' | 'createdAt'>): Promise<TimelineMarker> {
    const marker: TimelineMarker = {
      ...markerData,
      id: uuidv4(),
      createdAt: new Date()
    };

    this.markers.set(marker.id, marker);
    return marker;
  }

  async getMarkersByVideo(videoId: string): Promise<TimelineMarker[]> {
    return Array.from(this.markers.values())
      .filter(marker => marker.videoId === videoId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async updateMarker(id: string, updateData: Partial<TimelineMarker>): Promise<TimelineMarker | null> {
    const marker = this.markers.get(id);
    if (!marker) {
      return null;
    }

    const updatedMarker = { ...marker, ...updateData };
    this.markers.set(id, updatedMarker);
    return updatedMarker;
  }

  async deleteMarker(id: string): Promise<void> {
    this.markers.delete(id);
  }
}