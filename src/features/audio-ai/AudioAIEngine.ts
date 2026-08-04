import { PremiereExecutor } from "../../core/execution/PremiereExecutor";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineReader } from "../../premiere/TimelineReader";

export class AudioAIEngine {
  private readonly executor = new PremiereExecutor();
  private readonly timelineReader = new TimelineReader(new PremiereBridge());

  async removeNoise(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveClip(clip, 0);
    if (!resolvedClip) {
      return "Select an audio clip in Premiere before removing noise.";
    }

    const result = await this.executor.runAction("REMOVE_NOISE", {
      clipId: resolvedClip
    });
    return result.success
      ? `Noise removal submitted to Premiere for ${resolvedClip}.`
      : `Noise removal failed: ${result.error ?? result.message}`;
  }

  async enhanceVoice(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveClip(clip, 0);
    if (!resolvedClip) {
      return "Select an audio clip in Premiere before enhancing voice.";
    }

    const result = await this.executor.runAction("ENHANCE_VOICE", {
      clipId: resolvedClip
    });
    return result.success
      ? `Voice enhancement submitted to Premiere for ${resolvedClip}.`
      : `Voice enhancement failed: ${result.error ?? result.message}`;
  }

  async autoDuck(mainClip?: string, musicClip?: string): Promise<string> {
    const resolvedMain = await this.resolveClip(mainClip, 0);
    const resolvedMusic = await this.resolveClip(musicClip, 1);
    if (!resolvedMain || !resolvedMusic) {
      return "Select two audio clips in Premiere before running Auto-Duck.";
    }

    const result = await this.executor.runAction("AUTO_DUCK", {
      mainClipId: resolvedMain,
      musicClipId: resolvedMusic
    });
    return result.success
      ? `Auto-duck submitted to Premiere for ${resolvedMusic}.`
      : `Auto-duck failed: ${result.error ?? result.message}`;
  }

  suggestSFX(clip: string): string[] {
    console.log(`Suggesting SFX for ${clip}...`);
    return ["whoosh", "riser", "impact"];
  }

  async cleanupSpeech(clip?: string): Promise<string> {
    const resolvedClip = await this.resolveClip(clip, 0);
    if (!resolvedClip) {
      return "Select an audio clip in Premiere before cleaning speech.";
    }

    const result = await this.executor.runAction("CLEANUP_SPEECH", {
      clipId: resolvedClip
    });
    return result.success
      ? `Speech cleanup submitted to Premiere for ${resolvedClip}.`
      : `Speech cleanup failed: ${result.error ?? result.message}`;
  }

  private async resolveClip(clip: string | undefined, index: number): Promise<string | null> {
    if (clip) {
      return clip;
    }

    const selected = await this.timelineReader.getSelectedClips();
    return selected[index]?.id ?? null;
  }
}
