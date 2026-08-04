import { PremiereExecutor } from "../../core/execution/PremiereExecutor";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineReader } from "../../premiere/TimelineReader";

export class MotionAIEngine {
  private readonly executor = new PremiereExecutor();
  private readonly timelineReader = new TimelineReader(new PremiereBridge());

  async applyPanAndZoom(clip: string | undefined, preset: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere before applying Pan & Zoom.";
    }

    const result = await this.executor.runAction("APPLY_PAN_AND_ZOOM", {
      clipId: resolvedClip,
      preset
    });
    return result.success
      ? `Pan and zoom submitted to Premiere for ${resolvedClip}.`
      : `Pan and zoom failed: ${result.error ?? result.message}`;
  }

  async applyParallax(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere before applying Parallax.";
    }

    const result = await this.executor.runAction("APPLY_PARALLAX", {
      clipId: resolvedClip
    });
    return result.success
      ? `Parallax submitted to Premiere for ${resolvedClip}.`
      : `Parallax failed: ${result.error ?? result.message}`;
  }

  async applyMotionBlur(clip: string | undefined, amount: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere before applying Motion Blur.";
    }

    const result = await this.executor.runAction("APPLY_MOTION_BLUR", {
      clipId: resolvedClip,
      amount
    });
    return result.success
      ? `Motion blur submitted to Premiere for ${resolvedClip}.`
      : `Motion blur failed: ${result.error ?? result.message}`;
  }

  private async resolveSingleClip(clip?: string): Promise<string | null> {
    if (clip) {
      return clip;
    }

    const selected = await this.timelineReader.getSelectedClips();
    return selected[0]?.id ?? null;
  }
}
