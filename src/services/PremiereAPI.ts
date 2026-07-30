import MotionEngine from "../engines/MotionEngine";

export class PremiereAPI {
  private readonly PPRO: any;
  private readonly motion: MotionEngine;

  constructor() {
    this.PPRO = (window as any).PPRO;
    this.motion = new MotionEngine(this.PPRO);
  }

  getPPRO() {
    return this.PPRO;
  }

  async getCurrentProject() {
    return await this.PPRO.Project.getActiveProject();
  }

  async getActiveSequence() {
    const project = await this.getCurrentProject();
    return project ? await project.getActiveSequence() : null;
  }

  async getTimelineContext() {
    const project = await this.getCurrentProject();

    if (!project) return null;

    const sequence = await this.getActiveSequence();

    if (!sequence) return null;

    return {
      projectName: project.name,
      sequenceName: sequence.name,

      videoTracks: await sequence.getVideoTrackCount(),
      audioTracks: await sequence.getAudioTrackCount(),

      frameSize: await sequence.getFrameSize(),
      timebase: await sequence.getTimebase(),

      selection: await sequence.getSelection()
    };
  }

  async getProjectInfo() {
    return await this.getTimelineContext();
  }

  async center() {
    return await this.motion.center();
  }

  async left() {
    return await this.motion.left();
  }

  async right() {
    return await this.motion.right();
  }

  async top() {
    return await this.motion.top();
  }

  async bottom() {
    return await this.motion.bottom();
  }

  async setPosition(x: number, y: number) {
    return await this.motion.setPosition(x, y);
  }
}

export const premiereAPI = new PremiereAPI();
