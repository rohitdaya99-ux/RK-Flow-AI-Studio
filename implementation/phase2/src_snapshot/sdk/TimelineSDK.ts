export interface RKClip {
  name: string;
  selected: boolean;
  track: number;
  start: number;
  end: number;
  duration: number;
}

export interface RKTimelineInfo {
  projectName: string;
  sequenceName: string;
  videoTracks: number;
  audioTracks: number;
  fps: number;
  width: number;
  height: number;
  clips: RKClip[];
}

export class TimelineSDK {

  static async getTimeline(): Promise<RKTimelineInfo> {

    const PPRO = (window as any).PPRO;

    const project = await PPRO.Project.getActiveProject();
    const sequence = await project.getActiveSequence();

    const selection = await sequence.getSelection();
    const items = await selection.getTrackItems();

    const clips: RKClip[] = [];

    for (const clip of items) {

      const start = await clip.getStartTime();
      const end = await clip.getEndTime();
      const duration = await clip.getDuration();

      clips.push({
        name: await clip.getName(),
        selected: await clip.getIsSelected(),
        track: await clip.getTrackIndex(),
        start: start.seconds,
        end: end.seconds,
        duration: duration.seconds
      });

    }

    const frameSize = await sequence.getFrameSize();

    return {

      projectName: project.name,

      sequenceName: sequence.name,

      videoTracks: await sequence.getVideoTrackCount(),

      audioTracks: await sequence.getAudioTrackCount(),

      fps: await sequence.getTimebase(),

      width: frameSize.width,

      height: frameSize.height,

      clips

    };

  }


  static async getSelectedClips(): Promise<RKClip[]> {
    const timeline = await this.getTimeline();
    return timeline.clips;
  }

}

