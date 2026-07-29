export interface TimelineClip {
  id: string;
  name: string;
  track: number;
  start: number;
  end: number;
  duration: number;
  selected: boolean;
}

export interface TimelineData {
  sequenceName: string;
  fps: number;
  duration: number;
  videoTracks: number;
  audioTracks: number;
  clips: TimelineClip[];
}

export class TimelineEngine {
  private timeline: TimelineData = {
    sequenceName: "",
    fps: 25,
    duration: 0,
    videoTracks: 0,
    audioTracks: 0,
    clips: []
  };

  load(data: TimelineData) {
    this.timeline = data;
  }

  getTimeline() {
    return this.timeline;
  }

  getSelectedClips() {
    return this.timeline.clips.filter(c => c.selected);
  }

  getClipById(id: string) {
    return this.timeline.clips.find(c => c.id === id);
  }

  getTrack(track: number) {
    return this.timeline.clips.filter(c => c.track === track);
  }

  clear() {
    this.timeline.clips = [];
  }
}

export const timelineEngine = new TimelineEngine();