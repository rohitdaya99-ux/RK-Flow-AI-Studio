export interface TimelineInfo {
  connected: boolean;
  projectName: string;
  sequenceName: string;
  videoTracks: number;
  audioTracks: number;
  frameSize: { width: number; height: number } | null;
  timebase: number | null;
}

export class PremiereService {
  async getTimelineInfo(): Promise<TimelineInfo> {
    const PPRO = (window as any).PPRO;

    if (!PPRO?.Project) {
      return {
        connected: false,
        projectName: "",
        sequenceName: "",
        videoTracks: 0,
        audioTracks: 0,
        frameSize: null,
        timebase: null,
      };
    }

    try {
      const project = await PPRO.Project.getActiveProject();

      if (!project) {
        return {
          connected: true,
          projectName: "",
          sequenceName: "",
          videoTracks: 0,
          audioTracks: 0,
          frameSize: null,
          timebase: null,
        };
      }

      const sequence = await project.getActiveSequence();

      if (!sequence) {
        return {
          connected: true,
          projectName: project.name ?? "",
          sequenceName: "",
          videoTracks: 0,
          audioTracks: 0,
          frameSize: null,
          timebase: null,
        };
      }

      return {
        connected: true,
        projectName: project.name ?? "",
        sequenceName: sequence.name ?? "",
        videoTracks: await sequence.getVideoTrackCount(),
        audioTracks: await sequence.getAudioTrackCount(),
        frameSize: await sequence.getFrameSize(),
        timebase: await sequence.getTimebase(),
      };
    } catch (e) {
      console.error(e);

      return {
        connected: false,
        projectName: "",
        sequenceName: "",
        videoTracks: 0,
        audioTracks: 0,
        frameSize: null,
        timebase: null,
      };
    }
  }
}

export const premiereService = new PremiereService();
