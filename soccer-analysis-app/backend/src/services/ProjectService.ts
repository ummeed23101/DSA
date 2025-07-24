import { v4 as uuidv4 } from 'uuid';
import { AnalysisProject, PlayerTracker } from '../types';

export class ProjectService {
  private projects: Map<string, AnalysisProject> = new Map();
  private trackers: Map<string, PlayerTracker> = new Map();

  async createProject(projectData: Omit<AnalysisProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnalysisProject> {
    const project: AnalysisProject = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.projects.set(project.id, project);
    return project;
  }

  async getProjectById(id: string): Promise<AnalysisProject | null> {
    return this.projects.get(id) || null;
  }

  async getAllProjects(): Promise<AnalysisProject[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async updateProject(id: string, updateData: Partial<AnalysisProject>): Promise<AnalysisProject | null> {
    const project = this.projects.get(id);
    if (!project) {
      return null;
    }

    const updatedProject = {
      ...project,
      ...updateData,
      updatedAt: new Date()
    };

    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
    
    // Delete associated trackers
    Array.from(this.trackers.values())
      .filter(tracker => {
        const project = Array.from(this.projects.values())
          .find(p => p.trackers.some(t => t.id === tracker.id));
        return !project;
      })
      .forEach(tracker => this.trackers.delete(tracker.id));
  }

  async createTracker(trackerData: Omit<PlayerTracker, 'id' | 'createdAt'>): Promise<PlayerTracker> {
    const tracker: PlayerTracker = {
      ...trackerData,
      id: uuidv4(),
      createdAt: new Date()
    };

    this.trackers.set(tracker.id, tracker);
    return tracker;
  }

  async updateTracker(id: string, updateData: Partial<PlayerTracker>): Promise<PlayerTracker | null> {
    const tracker = this.trackers.get(id);
    if (!tracker) {
      return null;
    }

    const updatedTracker = { ...tracker, ...updateData };
    this.trackers.set(id, updatedTracker);
    return updatedTracker;
  }

  async getTrackersByVideo(videoId: string): Promise<PlayerTracker[]> {
    return Array.from(this.trackers.values())
      .filter(tracker => tracker.videoId === videoId);
  }

  async deleteTracker(id: string): Promise<void> {
    this.trackers.delete(id);
  }
}