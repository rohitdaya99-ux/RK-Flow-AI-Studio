import TransactionManager from "../core/TransactionManager";

export default class MotionEngine {
  private readonly PPRO: any;
  private readonly transaction: TransactionManager;

  constructor(PPRO: any) {
    this.PPRO = PPRO;
    this.transaction = new TransactionManager(PPRO);
  }

  async setPosition(
    x: number,
    y: number,
    trackIndex: number = 0,
    clipIndex: number = 0
  ): Promise<boolean> {
    return await this.transaction.executeAction(async (project) => {
      const sequence = await project.getActiveSequence();

      const track = await sequence.getVideoTrack(trackIndex);

      const clips = await track.getTrackItems(
        this.PPRO.Constants.TrackItemType.CLIP,
        false
      );

      if (!clips.length) {
        throw new Error("No clips found.");
      }

      const clip = clips[clipIndex];

      if (!clip) {
        throw new Error("Invalid clip index.");
      }

      const chain = await clip.getComponentChain();

      const motion = await chain.getComponentAtIndex(1);

      const position = await motion.getParam(0);

      const point = new this.PPRO.PointF();

      point.x = x;
      point.y = y;

      const keyframe = position.createKeyframe(point);

      keyframe.value.value = [x, y];

      return position.createSetValueAction(keyframe, true);
    });
  }

  async center(): Promise<boolean> {
    return await this.setPosition(0.5, 0.5);
  }

  async left(): Promise<boolean> {
    return await this.setPosition(0.25, 0.5);
  }

  async right(): Promise<boolean> {
    return await this.setPosition(0.75, 0.5);
  }

  async top(): Promise<boolean> {
    return await this.setPosition(0.5, 0.25);
  }

  async bottom(): Promise<boolean> {
    return await this.setPosition(0.5, 0.75);
  }
}