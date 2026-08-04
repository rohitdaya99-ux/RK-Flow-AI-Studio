import { runGeminiTool } from "../../ai/GeminiService";
import { aiDirectorToolSchemas } from "../../ai/schemas";
import { resolveGeminiConfig } from "../../config";
import { loggerService } from "../../services/loggerService";
import { AutoEditAssembler, AutoEditSourceClip } from "../auto-edit/AutoEditAssembler";
import { AIDirectorPlanningResult, AIDirectorStorySegment } from "./PlanningEngine";
import { AIDirectorReasoningResult } from "./ReasoningEngine";
import { AIDirectorAsset, AIDirectorContext } from "./types";

const MAX_DECISION_STEPS = 8;

interface SelectSongArgs {
  songId: string;
  reasoning: string;
}

interface SelectHeroShotsArgs {
  heroShotIds: string[];
  reasoning: string;
}

interface BuildStoryStructureArgs {
  segments: Array<{
    type: string;
    segment?: string;
    clipId?: string;
    duration: number;
    content?: string;
  }>;
  reasoning: string;
}

interface AssembleSequenceArgs {
  templateName: string;
  clipIds: string[];
  reasoning: string;
}

interface AssembleCompleteArgs {
  summary: string;
  sequenceName?: string;
}

type AIDirectorToolArgs =
  | SelectSongArgs
  | SelectHeroShotsArgs
  | BuildStoryStructureArgs
  | AssembleSequenceArgs
  | AssembleCompleteArgs;

type AIDirectorToolName =
  | "SELECT_SONG"
  | "SELECT_HERO_SHOTS"
  | "BUILD_STORY_STRUCTURE"
  | "ASSEMBLE_SEQUENCE"
  | "ASSEMBLE_COMPLETE";

interface AIDirectorToolCall {
  name: AIDirectorToolName;
  args: AIDirectorToolArgs;
}

interface DecisionProgress {
  completed: number;
  total: number;
  label: string;
  percent: number;
}

interface DecisionRunArgs {
  context: AIDirectorContext;
  reasoningResult: AIDirectorReasoningResult;
  planningResult: AIDirectorPlanningResult;
  selectedStyle?: string;
  onProgress?: (progress: DecisionProgress) => void;
}

interface DecisionState {
  selectedSong: AIDirectorAsset | null;
  heroShots: AIDirectorAsset[];
  storyStructure: AIDirectorStorySegment[];
  assemblyMessage: string | null;
  sequenceName: string;
}

export class DecisionEngine {
  private readonly assembler = new AutoEditAssembler();

  public async run({
    context,
    reasoningResult,
    planningResult,
    selectedStyle,
    onProgress
  }: DecisionRunArgs) {
    const state: DecisionState = {
      selectedSong: reasoningResult.selectedSong ?? planningResult.selectedSong ?? null,
      heroShots: reasoningResult.heroShots ?? [],
      storyStructure: planningResult.storyStructure ?? [],
      assemblyMessage: null,
      sequenceName: "Cinematic Film"
    };
    const toolHistory: Array<{ name: AIDirectorToolName; args: AIDirectorToolArgs; result: unknown }> = [];

    if (!resolveGeminiConfig().apiKey) {
      loggerService.log(
        "AI Director DecisionEngine using local fallback because no Gemini API key is configured.",
        "warn"
      );
      return this.runLocalLoop(state, context, planningResult, selectedStyle, onProgress, toolHistory);
    }

    let lastResult: unknown = null;

    for (let step = 1; step <= MAX_DECISION_STEPS; step += 1) {
      onProgress?.({
        completed: step,
        total: MAX_DECISION_STEPS,
        label: `Decision loop ${step}/${MAX_DECISION_STEPS}`,
        percent: Math.round((step / MAX_DECISION_STEPS) * 100)
      });

      const toolCall = await runGeminiTool<AIDirectorToolArgs>(
        this.buildPrompt(step),
        aiDirectorToolSchemas,
        this.buildLoopContext(context, planningResult, state, lastResult, step),
        {
          systemInstruction: [
            "You are the AI Director orchestration planner for a Premiere Pro panel.",
            "Always respond with exactly one function call.",
            "First choose a song, then hero shots, then a story structure, then assemble.",
            "Only call ASSEMBLE_COMPLETE after ASSEMBLE_SEQUENCE has already succeeded."
          ].join(" ")
        }
      );

      const typedToolCall = toolCall as AIDirectorToolCall;
      const executionResult = await this.executeToolCall(
        typedToolCall,
        context,
        state,
        selectedStyle
      );
      toolHistory.push({
        name: typedToolCall.name,
        args: typedToolCall.args,
        result: executionResult
      });
      lastResult = executionResult;

      if (typedToolCall.name === "ASSEMBLE_COMPLETE") {
        return this.buildFinalResult(planningResult, state, toolHistory, step, "gemini");
      }
    }

    throw new Error(
      `AI Director hit the max decision step limit (${MAX_DECISION_STEPS}) before completion.`
    );
  }

  private async runLocalLoop(
    state: DecisionState,
    context: AIDirectorContext,
    planningResult: AIDirectorPlanningResult,
    selectedStyle: string | undefined,
    onProgress: DecisionRunArgs["onProgress"],
    toolHistory: Array<{ name: AIDirectorToolName; args: AIDirectorToolArgs; result: unknown }>
  ) {
    const localCalls: AIDirectorToolCall[] = [
      {
        name: "SELECT_SONG",
        args: {
          songId:
            state.selectedSong?.id ??
            context.availableAssets.find((asset) => asset.type === "audio")?.id ??
            "",
          reasoning: "Selected the strongest available soundtrack from local assets."
        }
      },
      {
        name: "SELECT_HERO_SHOTS",
        args: {
          heroShotIds: state.heroShots.map((shot) => shot.id),
          reasoning: "Selected the locally-ranked hero shots."
        }
      },
      {
        name: "BUILD_STORY_STRUCTURE",
        args: {
          segments: state.storyStructure.map((segment) => ({
            type: segment.type,
            segment: segment.segment,
            duration: segment.duration,
            clipId: this.resolveClipId(segment.clip),
            content: segment.content
          })),
          reasoning: "Reused the deterministic planning output."
        }
      },
      {
        name: "ASSEMBLE_SEQUENCE",
        args: {
          templateName: "Cinematic Film",
          clipIds: state.heroShots.map((shot) => shot.id),
          reasoning: "Assembling the current local plan."
        }
      },
      {
        name: "ASSEMBLE_COMPLETE",
        args: {
          summary: "Local AI Director fallback completed."
        }
      }
    ];

    for (let index = 0; index < localCalls.length; index += 1) {
      onProgress?.({
        completed: index + 1,
        total: localCalls.length,
        label: `Decision loop ${index + 1}/${localCalls.length}`,
        percent: Math.round(((index + 1) / localCalls.length) * 100)
      });

      const executionResult = await this.executeToolCall(
        localCalls[index],
        context,
        state,
        selectedStyle
      );
      toolHistory.push({
        name: localCalls[index].name,
        args: localCalls[index].args,
        result: executionResult
      });
    }

    return this.buildFinalResult(
      planningResult,
      state,
      toolHistory,
      localCalls.length,
      "local"
    );
  }

  private buildPrompt(step: number): string {
    return [
      `Decision loop step ${step}.`,
      "Choose the next orchestration action for the wedding film.",
      "Prefer the smallest next step that advances toward final sequence assembly."
    ].join(" ");
  }

  private buildLoopContext(
    context: AIDirectorContext,
    planningResult: AIDirectorPlanningResult,
    state: DecisionState,
    lastResult: unknown,
    step: number
  ) {
    return {
      step,
      context,
      planningResult,
      currentState: {
        selectedSongId: state.selectedSong?.id ?? null,
        heroShotIds: state.heroShots.map((shot) => shot.id),
        storyStructure: state.storyStructure.map((segment) => ({
          type: segment.type,
          duration: segment.duration,
          content: segment.content,
          segment: segment.segment,
          clipId: this.resolveClipId(segment.clip)
        })),
        assemblyMessage: state.assemblyMessage,
        sequenceName: state.sequenceName
      },
      lastResult
    };
  }

  private async executeToolCall(
    toolCall: AIDirectorToolCall,
    context: AIDirectorContext,
    state: DecisionState,
    selectedStyle?: string
  ) {
    switch (toolCall.name) {
      case "SELECT_SONG":
        return this.selectSong(toolCall.args as SelectSongArgs, context, state);
      case "SELECT_HERO_SHOTS":
        return this.selectHeroShots(
          toolCall.args as SelectHeroShotsArgs,
          context,
          state
        );
      case "BUILD_STORY_STRUCTURE":
        return this.buildStoryStructure(
          toolCall.args as BuildStoryStructureArgs,
          context,
          state
        );
      case "ASSEMBLE_SEQUENCE":
        return this.assembleSequence(
          toolCall.args as AssembleSequenceArgs,
          context,
          state,
          selectedStyle
        );
      case "ASSEMBLE_COMPLETE":
        return toolCall.args;
    }
  }

  private selectSong(
    args: SelectSongArgs,
    context: AIDirectorContext,
    state: DecisionState
  ) {
    const song =
      context.availableAssets.find(
        (asset) => asset.type === "audio" && asset.id === args.songId
      ) ?? null;
    state.selectedSong = song;
    loggerService.log(`AI Director selected song ${song?.id ?? "none"}.`, "info");
    return {
      selectedSongId: song?.id ?? null,
      reasoning: args.reasoning
    };
  }

  private selectHeroShots(
    args: SelectHeroShotsArgs,
    context: AIDirectorContext,
    state: DecisionState
  ) {
    const selectedIds = new Set(args.heroShotIds);
    state.heroShots = context.availableAssets.filter(
      (asset) => asset.type === "video" && selectedIds.has(asset.id)
    );
    loggerService.log(
      `AI Director selected ${state.heroShots.length} hero shots.`,
      "info"
    );
    return {
      heroShotIds: state.heroShots.map((shot) => shot.id),
      reasoning: args.reasoning
    };
  }

  private buildStoryStructure(
    args: BuildStoryStructureArgs,
    context: AIDirectorContext,
    state: DecisionState
  ) {
    const assetsById = new Map(context.availableAssets.map((asset) => [asset.id, asset]));
    state.storyStructure = args.segments.map((segment) => ({
      type: segment.type,
      segment: segment.segment,
      duration: segment.duration,
      content: segment.content,
      clip: segment.clipId ? assetsById.get(segment.clipId) ?? null : undefined
    }));
    loggerService.log(
      `AI Director built a ${state.storyStructure.length}-segment story structure.`,
      "info"
    );
    return {
      segmentCount: state.storyStructure.length,
      reasoning: args.reasoning
    };
  }

  private async assembleSequence(
    args: AssembleSequenceArgs,
    context: AIDirectorContext,
    state: DecisionState,
    selectedStyle?: string
  ) {
    state.sequenceName = args.templateName;
    const assemblyClips = this.buildAssemblyClips(
      args.clipIds,
      state.storyStructure,
      context.availableAssets
    );
    const message = await this.assembler.assemble(
      args.templateName,
      assemblyClips,
      {
        learnedFrom: selectedStyle || "AI Director"
      }
    );
    state.assemblyMessage = message;
    loggerService.log(
      `AI Director assembly submitted for "${args.templateName}".`,
      "success"
    );
    return {
      message,
      clipCount: assemblyClips.length,
      reasoning: args.reasoning
    };
  }

  private buildAssemblyClips(
    clipIds: string[],
    storyStructure: AIDirectorStorySegment[],
    availableAssets: AIDirectorAsset[]
  ): AutoEditSourceClip[] {
    const assetsById = new Map(availableAssets.map((asset) => [asset.id, asset]));
    const chosenIds =
      clipIds.length > 0
        ? clipIds
        : storyStructure
            .map((segment) => this.resolveClipId(segment.clip))
            .filter((clipId): clipId is string => Boolean(clipId));

    return chosenIds
      .map((clipId) => assetsById.get(clipId))
      .filter((asset): asset is AIDirectorAsset => Boolean(asset))
      .map((asset) => ({
        id: asset.id,
        path: asset.path,
        start: asset.start,
        end: asset.end,
        duration: asset.duration,
        score: asset.score,
        type: asset.type === "audio" ? "audio" : "video"
      }));
  }

  private resolveClipId(clip: unknown): string | undefined {
    if (!clip || typeof clip !== "object") {
      return undefined;
    }

    return typeof (clip as { id?: unknown }).id === "string"
      ? (clip as { id: string }).id
      : undefined;
  }

  private buildFinalResult(
    planningResult: AIDirectorPlanningResult,
    state: DecisionState,
    toolHistory: Array<{ name: AIDirectorToolName; args: AIDirectorToolArgs; result: unknown }>,
    iterations: number,
    mode: "gemini" | "local"
  ) {
    return {
      finalSequence: {
        name: state.sequenceName,
        totalDuration: state.storyStructure.reduce(
          (total, segment) => total + (segment.duration ?? 0),
          0
        ),
        selectedSongId: state.selectedSong?.id ?? planningResult.selectedSong?.id ?? null,
        clipCount: state.storyStructure.filter((segment) => segment.clip).length,
        outputResolution: planningResult.projectResolution
      },
      iterations,
      mode,
      toolHistory,
      message:
        state.assemblyMessage ??
        "AI Director finished without submitting Premiere assembly."
    };
  }
}
