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
    path?: Array<{
        x: number;
        y: number;
    }>;
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
export interface ExportOptions {
    format: 'mp4' | 'avi' | 'json' | 'pdf';
    includeAnnotations: boolean;
    includeTrackers: boolean;
    timeRange?: {
        start: number;
        end: number;
    };
    quality: 'low' | 'medium' | 'high';
}
//# sourceMappingURL=types.d.ts.map