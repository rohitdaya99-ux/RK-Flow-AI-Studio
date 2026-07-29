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

  async getProjectInfo() {
    try {
      const project = await this.PPRO.Project.getActiveProject();

      if (!project) {
        return {
          success: false,
          error: "No active project found.",
        };
      }

      const sequence = await project.getActiveSequence();

      console.clear();

      console.log("========== RK FLOW ==========");
      console.log("Project:", project.name);
      console.log("Sequence:", sequence?.name);

      console.log(
        "Video Track Count:",
        await sequence.getVideoTrackCount()
      );

      console.log(
        "Audio Track Count:",
        await sequence.getAudioTrackCount()
      );

      console.log(
        "Frame Size:",
        await sequence.getFrameSize()
      );

      console.log(
        "Timebase:",
        await sequence.getTimebase()
      );

      console.log(
        "Selection:",
        await sequence.getSelection()
      );

      return {
        success: true,
        projectName: project.name,
        projectPath: project.path,
        sequenceName: sequence?.name,
      };
    } catch (error) {
      console.error("RK Flow Error:", error);

      return {
        success: false,
        error: String(error),
      };
    }
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