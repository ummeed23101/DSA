import { create } from 'zustand';

// Local type definitions for the frontend
export interface VideoMetadata {
  id: string;
  filename: string;
  originalName: string;
  duration: number;
  width: number;
  height: number;
  fps: number;
  uploadedAt: Date;
  fileSize: number;
  mimeType: string;
}

export interface TimelineMarker {
  id: string;
  videoId: string;
  timestamp: number;
  label: string;
  description?: string;
  color: string;
  createdAt: Date;
}

export interface Annotation {
  id: string;
  videoId: string;
  timestamp: number;
  type: 'circle' | 'arrow' | 'path' | 'highlight' | 'text';
  position: {
    x: number;
    y: number;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  style: {
    color: string;
    strokeWidth: number;
    fillColor?: string;
    opacity: number;
  };
  text?: string;
  path?: Array<{ x: number; y: number }>;
  createdAt: Date;
}

export interface PlayerTracker {
  id: string;
  videoId: string;
  playerId: string;
  playerName: string;
  teamColor: string;
  positions: Array<{
    timestamp: number;
    x: number;
    y: number;
    confidence?: number;
  }>;
  isActive: boolean;
  createdAt: Date;
}

export interface AnalysisProject {
  id: string;
  name: string;
  description?: string;
  videoId: string;
  markers: TimelineMarker[];
  annotations: Annotation[];
  trackers: PlayerTracker[];
  createdAt: Date;
  updatedAt: Date;
}

interface VideoStore {
  currentVideo: VideoMetadata | null;
  currentProject: AnalysisProject | null;
  annotations: Annotation[];
  markers: TimelineMarker[];
  trackers: PlayerTracker[];
  currentTime: number;
  isPlaying: boolean;
  
  // Actions
  setCurrentVideo: (video: VideoMetadata | null) => void;
  setCurrentProject: (project: AnalysisProject | null) => void;
  setAnnotations: (annotations: Annotation[]) => void;
  setMarkers: (markers: TimelineMarker[]) => void;
  setTrackers: (trackers: PlayerTracker[]) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  addAnnotation: (annotation: Annotation) => void;
  addMarker: (marker: TimelineMarker) => void;
  addTracker: (tracker: PlayerTracker) => void;
  updateAnnotation: (id: string, updates: Partial<Annotation>) => void;
  updateMarker: (id: string, updates: Partial<TimelineMarker>) => void;
  updateTracker: (id: string, updates: Partial<PlayerTracker>) => void;
  removeAnnotation: (id: string) => void;
  removeMarker: (id: string) => void;
  removeTracker: (id: string) => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  currentVideo: null,
  currentProject: null,
  annotations: [],
  markers: [],
  trackers: [],
  currentTime: 0,
  isPlaying: false,

  setCurrentVideo: (video) => set({ currentVideo: video }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setAnnotations: (annotations) => set({ annotations }),
  setMarkers: (markers) => set({ markers }),
  setTrackers: (trackers) => set({ trackers }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  addAnnotation: (annotation) => set((state) => ({
    annotations: [...state.annotations, annotation]
  })),

  addMarker: (marker) => set((state) => ({
    markers: [...state.markers, marker]
  })),

  addTracker: (tracker) => set((state) => ({
    trackers: [...state.trackers, tracker]
  })),

  updateAnnotation: (id, updates) => set((state) => ({
    annotations: state.annotations.map(a => a.id === id ? { ...a, ...updates } : a)
  })),

  updateMarker: (id, updates) => set((state) => ({
    markers: state.markers.map(m => m.id === id ? { ...m, ...updates } : m)
  })),

  updateTracker: (id, updates) => set((state) => ({
    trackers: state.trackers.map(t => t.id === id ? { ...t, ...updates } : t)
  })),

  removeAnnotation: (id) => set((state) => ({
    annotations: state.annotations.filter(a => a.id !== id)
  })),

  removeMarker: (id) => set((state) => ({
    markers: state.markers.filter(m => m.id !== id)
  })),

  removeTracker: (id) => set((state) => ({
    trackers: state.trackers.filter(t => t.id !== id)
  }))
}));