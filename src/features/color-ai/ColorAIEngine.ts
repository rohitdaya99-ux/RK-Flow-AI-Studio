import { PremiereExecutor } from "../../core/execution/PremiereExecutor";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineReader } from "../../premiere/TimelineReader";

export class ColorAIEngine {
  private readonly executor = new PremiereExecutor();
  private readonly timelineReader = new TimelineReader(new PremiereBridge());

  async applyColorMatch(source?: string, target?: string): Promise<string> {
    const [resolvedSource, resolvedTarget] = await this.resolvePair(source, target);
    if (!resolvedSource || !resolvedTarget) {
      return "Select two clips in Premiere to run Color Match.";
    }

    const result = await this.executor.runAction("APPLY_COLOR_MATCH", {
      sourceClipId: resolvedSource,
      targetClipId: resolvedTarget
    });
    return result.success
      ? `Color match submitted to Premiere for ${resolvedTarget}.`
      : `Color match failed: ${result.error ?? result.message}`;
  }

  async applySkinToneProtection(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere to protect skin tones.";
    }

    const result = await this.executor.runAction("APPLY_SKIN_TONE_PROTECTION", {
      clipId: resolvedClip
    });
    return result.success
      ? `Skin-tone protection submitted to Premiere for ${resolvedClip}.`
      : `Skin-tone protection failed: ${result.error ?? result.message}`;
  }

  async applyFilmLUT(clip: string | undefined, lut: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere before applying a LUT.";
    }

    const result = await this.executor.runAction("APPLY_FILM_LUT", {
      clipId: resolvedClip,
      lut
    });
    return result.success
      ? `Film LUT "${lut}" submitted to Premiere for ${resolvedClip}.`
      : `Film LUT failed: ${result.error ?? result.message}`;
  }

  generateLUT(description: string): any {
    console.log(`Generating LUT based on description: "${description}"...`);
    return {
      name: `Generated LUT - ${new Date().toLocaleTimeString()}`,
      description: description,
      // In a real scenario, this would be a LUT file or data.
      data: "SIMULATED_LUT_DATA"
    };
  }

  async autoGrade(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveSingleClip(clip);
    if (!resolvedClip) {
      return "Select a clip in Premiere to auto-grade.";
    }

    const result = await this.executor.runAction("AUTO_GRADE", {
      clipId: resolvedClip
    });
    return result.success
      ? `Auto-grade submitted to Premiere for ${resolvedClip}.`
      : `Auto-grade failed: ${result.error ?? result.message}`;
  }

  private async resolveSingleClip(clip?: string): Promise<string | null> {
    if (clip) {
      return clip;
    }

    const selected = await this.timelineReader.getSelectedClips();
    return selected[0]?.id ?? null;
  }

  private async resolvePair(
    source?: string,
    target?: string
  ): Promise<[string | null, string | null]> {
    if (source && target) {
      return [source, target];
    }

    const selected = await this.timelineReader.getSelectedClips();
    return [source ?? selected[0]?.id ?? null, target ?? selected[1]?.id ?? null];
  }
}
