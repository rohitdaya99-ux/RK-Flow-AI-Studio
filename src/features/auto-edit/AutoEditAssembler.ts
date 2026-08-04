import { createCommand } from "../../types/Command";
import { TimelineClip } from "../../types/Timeline";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineReader } from "../../premiere/TimelineReader";
import { PremiereExecutor } from "../../core/execution/PremiereExecutor";
import type { ReelPlan } from "../prompt-reel/types";
import {
  AUTO_EDIT_TEMPLATES,
  AutoEditTemplate,
  parseDurationSeconds
} from "./templates";

export interface AutoEditSourceClip {
  id?: string;
  path?: string;
  start?: number;
  end?: number;
  duration?: number;
  score?: number;
  type?: "video" | "audio";
}

export class AutoEditAssembler {
  private readonly executor = new PremiereExecutor();
  private readonly timelineReader = new TimelineReader(new PremiereBridge());

  public async assemble(
    templateName: string,
    clips: AutoEditSourceClip[] = [],
    styleProfile?: Record<string, unknown>,
    onProgress?: (progress: { completed: number; total: number; label: string; percent: number }) => void
  ): Promise<string> {
    const template = AUTO_EDIT_TEMPLATES.find(t => t.name === templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    const sourceClips = await this.resolveSourceClips(clips);
    if (sourceClips.length === 0) {
      throw new Error("Select timeline clips in Premiere or provide importable media paths before running Auto Edit.");
    }

    const sequenceName = this.buildSequenceName(template.name, styleProfile);
    const plan = this.buildAssemblyPlan(sequenceName, template, sourceClips);
    return this.executeAssemblyPlan(sequenceName, plan.clipPlans, plan.createSequenceCommand, onProgress);
  }

  public async assembleReelPlan(
    plan: ReelPlan,
    styleProfile?: Record<string, unknown>,
    onProgress?: (progress: { completed: number; total: number; label: string; percent: number }) => void
  ): Promise<string> {
    if (plan.clips.length === 0) {
      throw new Error("Generate a reel plan with at least one clip before assembly.");
    }

    const sequenceName = this.buildSequenceName(plan.title || plan.templateName, styleProfile);
    const clipPlans = plan.clips.map((clip, index) => {
      const commands = [];

      if (clip.mediaPath) {
        commands.push(createCommand("IMPORT_MEDIA", { mediaPath: clip.mediaPath }));
      }

      commands.push(
        createCommand("ADD_CLIP_TO_SEQUENCE", {
          clipId: clip.clipName,
          projectItemId: clip.projectItemId,
          mediaPath: clip.mediaPath,
          start: plan.clips
            .slice(0, index)
            .reduce((sum, entry) => sum + entry.durationSeconds, 0),
          end: clip.start + clip.durationSeconds,
          duration: clip.durationSeconds
        })
      );

      if (index < plan.clips.length - 1) {
        commands.push(
          createCommand("ADD_TRANSITION", {
            type: transitionTypeForPromptReel(clip.reason),
            start:
              plan.clips
                .slice(0, index + 1)
                .reduce((sum, entry) => sum + entry.durationSeconds, 0) - 0.4,
            duration: 0.4
          })
        );
      }

      return { clip, commands };
    });

    return this.executeAssemblyPlan(
      sequenceName,
      clipPlans,
      createCommand("CREATE_SEQUENCE", { name: sequenceName }),
      onProgress
    );
  }

  private async executeAssemblyPlan(
    sequenceName: string,
    clipPlans: Array<{ clip: AutoEditSourceClip | ReelPlan["clips"][number]; commands: ReturnType<typeof createCommand>[] }>,
    createSequenceCommand: ReturnType<typeof createCommand>,
    onProgress?: (progress: { completed: number; total: number; label: string; percent: number }) => void
  ) {
    const totalSteps =
      1 +
      clipPlans.reduce(
        (count, clipPlan) => count + clipPlan.commands.length,
        0
      );
    const results = [];
    let completed = 0;

    onProgress?.({
      completed,
      total: totalSteps,
      label: `Creating sequence "${sequenceName}"`,
      percent: 0
    });

    const createResult = await this.executor.runNewSequenceAssembly(createSequenceCommand);
    results.push(createResult);
    this.throwOnFailedAction(createSequenceCommand.action, createResult);
    completed += 1;
    onProgress?.({
      completed,
      total: totalSteps,
      label: `Created sequence "${sequenceName}"`,
      percent: Math.round((completed / totalSteps) * 100)
    });

    for (let index = 0; index < clipPlans.length; index += 1) {
      const clipPlan = clipPlans[index];

      for (const command of clipPlan.commands) {
        const result = await this.executor.runNewSequenceAssembly(command);
        results.push(result);
        this.throwOnFailedAction(command.action, result, `clip ${index + 1}`);
        completed += 1;
      }

      onProgress?.({
        completed,
        total: totalSteps,
        label: `Placed clip ${index + 1} of ${clipPlans.length}`,
        percent: Math.round((completed / totalSteps) * 100)
      });
    }

    const failures = results.filter((result) => !result.success);
    if (failures.length > 0) {
      throw new Error(
        failures.map((result) => result.error ?? result.message).join(" ")
      );
    }

    return `Submitted ${results.length} Premiere actions to build sequence "${sequenceName}".`;
  }

  private throwOnFailedAction(action: string, result: { success: boolean; message: string; error?: string }, context?: string) {
    if (result.success) {
      return;
    }

    const detail = result.error ?? result.message;
    const label = context ? ` for ${context}` : "";
    console.error(`[RK Flow][Assembly] ${action}${label} failed.`, { result });
    throw new Error(`${action}${label} failed: ${detail}`);
  }

  private buildSequenceName(
    templateName: string,
    styleProfile?: Record<string, unknown>
  ): string {
    const styleSuffix =
      typeof styleProfile?.learnedFrom === "string"
        ? ` - ${styleProfile.learnedFrom}`
        : "";
    return `${templateName}${styleSuffix} - ${Date.now()}`;
  }

  private buildAssemblyPlan(
    sequenceName: string,
    template: AutoEditTemplate,
    clips: AutoEditSourceClip[]
  ) {
    const targetDuration = parseDurationSeconds(template.targetDuration);
    const selectedClips = this.selectClipsForTemplate(template, clips, targetDuration);
    let currentTime = 0;
    const clipPlans: Array<{ clip: AutoEditSourceClip; commands: ReturnType<typeof createCommand>[] }> = [];

    for (const clip of selectedClips) {
      const commands: ReturnType<typeof createCommand>[] = [];

      if (clip.path) {
        commands.push(createCommand("IMPORT_MEDIA", { mediaPath: clip.path }));
      }

      commands.push(
        createCommand(clip.type === "audio" ? "ADD_AUDIO_TO_SEQUENCE" : "ADD_CLIP_TO_SEQUENCE", {
          clipId: clip.id,
          mediaPath: clip.path,
          start: currentTime,
          end: clip.end,
          duration: clip.duration
        })
      );

      currentTime += clip.duration ?? Math.max(1, (clip.end ?? 0) - (clip.start ?? 0));

      if (currentTime > 0 && clip.type !== "audio") {
        commands.push(
          createCommand("ADD_TRANSITION", {
            type: transitionTypeForTemplate(template),
            start: Math.max(0, currentTime - 0.5),
            duration: 0.5
          })
        );
      }

      clipPlans.push({ clip, commands });
    }

    return {
      createSequenceCommand: createCommand("CREATE_SEQUENCE", { name: sequenceName }),
      clipPlans
    };
  }

  private selectClipsForTemplate(
    template: AutoEditTemplate,
    clips: AutoEditSourceClip[],
    targetDuration: number
  ): AutoEditSourceClip[] {
    const weighted = [...clips].sort((left, right) => (right.score ?? 0) - (left.score ?? 0));
    const chosen: AutoEditSourceClip[] = [];
    let totalDuration = 0;

    for (const clip of weighted) {
      chosen.push(clip);
      totalDuration += clip.duration ?? Math.max(1, (clip.end ?? 0) - (clip.start ?? 0));

      if (targetDuration > 0 && totalDuration >= targetDuration) {
        break;
      }
    }

    return chosen.length > 0 ? chosen : clips.slice(0, Math.max(1, template.prioritizedSegments.length));
  }

  private async resolveSourceClips(clips: AutoEditSourceClip[]): Promise<AutoEditSourceClip[]> {
    if (clips.length > 0) {
      return clips.map(normalizeClip);
    }

    const selectedClips = await this.timelineReader.getSelectedClips();
    return selectedClips.map((clip) => normalizeTimelineClip(clip));
  }
}

function normalizeClip(clip: AutoEditSourceClip): AutoEditSourceClip {
  return {
    ...clip,
    type: clip.type ?? "video",
    duration:
      clip.duration ??
      Math.max(1, (clip.end ?? clip.start ?? 0) - (clip.start ?? 0))
  };
}

function normalizeTimelineClip(clip: TimelineClip): AutoEditSourceClip {
  return {
    id: clip.id,
    path: clip.mediaPath ?? undefined,
    start: clip.start,
    end: clip.end,
    duration: clip.duration,
    score: clip.duration,
    type: "video"
  };
}

function transitionTypeForTemplate(template: AutoEditTemplate): string {
  const intensity = template.beatSyncRules[0]?.intensity ?? "medium";

  switch (intensity) {
    case "high":
      return "dip_to_black";
    case "low":
      return "cross_dissolve";
    default:
      return "film_dissolve";
  }
}

function transitionTypeForPromptReel(reason: string): string {
  if (/music energy|dance|energetic|wide/i.test(reason)) {
    return "dip_to_black";
  }

  if (/emotion|family|hug|reaction|bride entry|varmala/i.test(reason)) {
    return "cross_dissolve";
  }

  return "film_dissolve";
}
