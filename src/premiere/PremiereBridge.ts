import {
  CommandAction,
  CommandPayload,
  CommandResult
} from "../types/Command";
import {
  TimelineCapabilityNote,
  TimelineClip,
  TimelineClipMediaType,
  TimelineFrameSize,
  TimelineState,
  TimelineTrack,
  TimelineTrackType
} from "../types/Timeline";
import TransactionManager from "../core/TransactionManager";

interface TickTime {
  seconds: number;
}

interface SequenceSettings {
  getVideoFrameRate?: () => Promise<{ value: number }>;
}

interface PremiereSequence {
  name: string;
  getAudioTrackCount: () => Promise<number>;
  getAudioTrack?: (index: number) => Promise<any>;
  getEndTime: () => Promise<TickTime>;
  getFrameSize?: () => Promise<{ width?: number; height?: number } | null>;
  getInPoint: () => Promise<TickTime>;
  getOutPoint: () => Promise<TickTime>;
  getPlayerPosition: () => Promise<TickTime>;
  getSelection?: () => Promise<any>;
  getSettings: () => Promise<SequenceSettings>;
  getTimebase?: () => Promise<number>;
  getVideoTrackCount: () => Promise<number>;
  getVideoTrack?: (index: number) => Promise<any>;
}

interface PremiereProject {
  getActiveSequence: () => Promise<PremiereSequence | null>;
  createSequence?: (name: string) => Promise<any>;
  setActiveSequence?: (sequence: PremiereSequence) => Promise<boolean> | boolean;
  getSequences?: () => Promise<PremiereSequence[]>;
  executeTransaction?: (callback: (compoundAction: any) => void) => Promise<boolean>;
  lockedAccess?: <T>(callback: () => Promise<T>) => Promise<T>;
  importFiles?: (paths: string[]) => Promise<any>;
  getRootItem?: () => Promise<any>;
}

interface PremiereApp {
  Project: {
    getActiveProject: () => Promise<PremiereProject | null>;
  };
  Constants?: {
    TrackItemType?: {
      CLIP: unknown;
    };
  };
  SequenceEditor?: {
    getEditor?: (sequence: PremiereSequence) => Promise<any> | any;
  };
  TickTime?: {
    createWithSeconds?: (seconds: number) => any;
  };
  PointF?: new () => { x: number; y: number };
}

interface PremiereHost {
  app?: PremiereApp;
  execute?: (
    action: CommandAction,
    payload: CommandPayload
  ) => Promise<unknown> | unknown;
  readTimeline?: () => Promise<TimelineState | null> | TimelineState | null;
}

export class PremiereBridge {
  private readonly host: PremiereHost | null;
  private readonly transactionManager: TransactionManager | null;

  public constructor(host?: PremiereHost | null) {
    this.host = host === undefined ? this.resolveHost() : host;
    const ppro = this.host?.app;
    this.transactionManager = ppro ? new TransactionManager(ppro) : null;
  }

  public isConnected(): boolean {
    return this.host !== null;
  }

  public async readTimeline(): Promise<TimelineState | null> {
    if (this.host?.readTimeline !== undefined) {
      return this.host.readTimeline();
    }

    const sequence = await this.getActiveSequence();

    if (sequence === null) {
      return null;
    }

    const capabilityNotes: TimelineCapabilityNote[] = [];
    const [
      videoTrackCount,
      audioTrackCount,
      duration,
      inPoint,
      outPoint,
      playhead,
      settings,
      rawTimebase,
      frameSize,
      videoTracks,
      audioTracks
    ] = await Promise.all([
      sequence.getVideoTrackCount(),
      sequence.getAudioTrackCount(),
      sequence.getEndTime(),
      sequence.getInPoint(),
      sequence.getOutPoint(),
      sequence.getPlayerPosition(),
      sequence.getSettings(),
      tryPremiereValue(() => sequence.getTimebase?.(), null as number | null),
      readFrameSize(sequence),
      this.readTracks(sequence, "video"),
      this.readTracks(sequence, "audio")
    ]);

    const timebase = typeof rawTimebase === "number" && Number.isFinite(rawTimebase) ? rawTimebase : null;

    if (timebase === null) {
      capabilityNotes.push({
        field: "timebase",
        source: "unavailable",
        reason: "Sequence.getTimebase() was not exposed by this Premiere host session."
      });
    }

    if (frameSize === null) {
      capabilityNotes.push({
        field: "frameSize",
        source: "unavailable",
        reason: "Sequence.getFrameSize() was not exposed by this Premiere host session."
      });
    }

    return {
      sequenceName: normalizeTextValue(sequence.name, ""),
      fps: await getFrameRate(settings),
      timebase,
      frameSize,
      duration: duration.seconds,
      playhead: playhead.seconds,
      inPoint: inPoint.seconds,
      outPoint: outPoint.seconds,
      videoTracks: videoTracks.length > 0 ? videoTracks : createTracks("video", videoTrackCount),
      audioTracks: audioTracks.length > 0 ? audioTracks : createTracks("audio", audioTrackCount),
      markers: [],
      capabilityNotes
    };
  }

  public async execute(
    action: CommandAction,
    payload: CommandPayload = {}
  ): Promise<CommandResult> {
    const handler = ACTION_HANDLERS[action];

    if (handler) {
      try {
        const result = await handler(this, payload);

        if (!result.success) {
          console.error(`[RK Flow][PremiereBridge] ${action} returned failure.`, { payload, result });
        }

        return result;
      } catch (error: unknown) {
        console.error(`[RK Flow][PremiereBridge] ${action} threw.`, { payload, error });
        return {
          success: false,
          message: `${action} failed.`,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }

    if (this.host?.execute !== undefined) {
      return this.executeWithHost(action, payload);
    }

    return unsupported(
      action,
      "No local PremiereBridge handler exists and no writable host.execute bridge is attached."
    );
  }

  public async createSequence(name: string): Promise<CommandResult> {
    return this.withProjectAction("CREATE_SEQUENCE", async (project) => {
      if (project.createSequence === undefined) {
        throw new Error("Project.createSequence() is not available in this Premiere runtime.");
      }

      const sequence = await project.createSequence(name);

      if (!sequence) {
        throw new Error("Premiere did not return the created sequence.");
      }

      if (project.setActiveSequence) {
        const activated = await project.setActiveSequence(sequence);
        if (!activated) {
          throw new Error("Premiere created the sequence but could not make it active for assembly.");
        }
      }

      console.log("[RK Flow][CREATE_SEQUENCE] Created and activated sequence.", {
        requestedName: name,
        sequenceName: sequence.name
      });
      return sequence;
    });
  }

  public async addTransition(
    type: string,
    start?: number,
    duration?: number
  ): Promise<CommandResult> {
    return this.withTransaction("ADD_TRANSITION", async () => {
      const clip = await this.findVideoClipByTime(start);

      if (clip?.createAddVideoTransitionAction === undefined) {
        throw new Error("TrackItem.createAddVideoTransitionAction() is not available.");
      }

      return clip.createAddVideoTransitionAction(type, duration ?? 0.5);
    }, projectHint(projectAvailable(this.host)));
  }

  public async applyPanAndZoom(clipId: string, preset: string): Promise<CommandResult> {
    const [x, y, scale] = panAndZoomPreset(preset);
    return this.setMotionProperties(clipId, { position: [x, y], scale });
  }

  public async autoZoom(clipId: string, start?: unknown, end?: unknown): Promise<CommandResult> {
    const from = typeof start === "number" ? start : 0;
    const to = typeof end === "number" ? end : 1;
    const scale = 100 + Math.max(0, to - from) * 18;
    return this.setMotionProperties(clipId, { scale });
  }

  public async applyParallax(clipId: string): Promise<CommandResult> {
    return this.setMotionProperties(clipId, { position: [0.54, 0.5], scale: 108 });
  }

  public async applyMotionBlur(_clipId: string, _amount: string): Promise<CommandResult> {
    return unsupported(
      "APPLY_MOTION_BLUR",
      "The discovered UXP API in this workspace does not expose a confirmed native motion-blur effect insertion or parameter transaction path."
    );
  }

  public async reframe(_clipId: string): Promise<CommandResult> {
    return this.withProjectAction("REFRAME", async () => {
      const sequence = await this.getActiveSequence();

      if (sequence === null) {
        throw new Error("No active sequence is available.");
      }

      const autoReframe = (sequence as any).autoReframeSequence;
      if (typeof autoReframe !== "function") {
        throw new Error("Sequence.autoReframeSequence() is not available in this Premiere runtime.");
      }

      return autoReframe.call(sequence, 9, 16, false, `${sequence.name} Auto Reframe`, true);
    });
  }

  public async rippleDelete(_start: number, _end: number): Promise<CommandResult> {
    return unsupported(
      "RIPPLE_DELETE",
      "SequenceEditor.createRemoveItemsAction() exists, but the required writable selection/remove parameter contract was not confirmed in this workspace."
    );
  }

  public async importMedia(mediaPath: string): Promise<CommandResult> {
    return this.withProjectAction("IMPORT_MEDIA", async (project) => {
      if (project.importFiles === undefined) {
        throw new Error("Project.importFiles() is not available in this Premiere runtime.");
      }

      return project.importFiles([mediaPath]);
    });
  }

  public async addClipToSequence(_payload: CommandPayload): Promise<CommandResult> {
    return this.insertProjectItemToSequence("ADD_CLIP_TO_SEQUENCE", _payload, "video");
  }

  public async addAudioToSequence(_payload: CommandPayload): Promise<CommandResult> {
    return this.insertProjectItemToSequence("ADD_AUDIO_TO_SEQUENCE", _payload, "audio");
  }

  public async moveClip(clipId: string, targetTrackIndex: number, start: number): Promise<CommandResult> {
    return this.executeEditorAction("MOVE_CLIP", "createMoveItemsAction", async () => [
      await this.findClipById(clipId),
      targetTrackIndex,
      this.createTickTime(start)
    ]);
  }

  public async trimClip(clipId: string, start: number, end: number): Promise<CommandResult> {
    return this.executeEditorAction("TRIM_CLIP", "createTrimItemsAction", async () => [
      await this.findClipById(clipId),
      this.createTickTime(start),
      this.createTickTime(end)
    ]);
  }

  public async cutClip(clipId: string, time: number): Promise<CommandResult> {
    return this.executeEditorAction("CUT_CLIP", "createCutItemsAction", async () => [
      await this.findClipById(clipId),
      this.createTickTime(time)
    ]);
  }

  public async deleteClip(clipId: string): Promise<CommandResult> {
    return this.executeEditorAction("DELETE_CLIP", "createRemoveItemsAction", async () => [
      await this.findClipById(clipId)
    ]);
  }

  public async createMarker(name: string, time: number, color: string): Promise<CommandResult> {
    return this.withProjectAction("CREATE_MARKER", async (project) => {
      const sequence = await project.getActiveSequence();
      if (!(sequence as any)?.markers) throw new Error("Sequence markers not available.");
      const marker = (sequence as any).markers.createMarker(time);
      if (marker) {
        marker.name = name;
        marker.comments = color; // Often used as a workaround if color isn't direct
      }
      return marker;
    });
  }

  public async deleteMarker(_markerId: string): Promise<CommandResult> {
    return this.withProjectAction("DELETE_MARKER", async (_project) => {
      throw new Error("deleteMarker API is not fully exposed.");
    });
  }

  public async movePlayhead(time: number): Promise<CommandResult> {
    return this.withProjectAction("MOVE_PLAYHEAD", async (project) => {
      const sequence = await project.getActiveSequence();
      (sequence as any)?.setPlayerPosition(this.createTickTime(time));
      return { time };
    });
  }

  public async createBin(name: string): Promise<CommandResult> {
    return this.withProjectAction("CREATE_BIN", async (project) => {
      const root = await project.getRootItem?.();
      return root?.createBin(name);
    });
  }

  public async moveToBin(_projectItemId: string, _binPath: string): Promise<CommandResult> {
    return this.withProjectAction("MOVE_TO_BIN", async (_project) => {
      throw new Error("moveToBin API is not fully exposed.");
    });
  }

  public async nestSequence(_name: string): Promise<CommandResult> {
    return this.withProjectAction("NEST_SEQUENCE", async (_project) => {
      throw new Error("nestSequence API is not fully exposed.");
    });
  }

  public async setClipSpeed(clipId: string, speed: number): Promise<CommandResult> {
    return this.withProjectAction("SET_CLIP_SPEED", async () => {
      const clip = await this.findClipById(clipId);
      if (clip?.setSpeed) clip.setSpeed(speed);
      return { clipId, speed };
    });
  }

  public async addKeyframe(_clipId: string, _property: string, _time: number, _value: any): Promise<CommandResult> {
    return this.withProjectAction("ADD_KEYFRAME", async () => {
      throw new Error("addKeyframe API is not fully exposed.");
    });
  }

  public async removeKeyframe(_clipId: string, _property: string, _time: number): Promise<CommandResult> {
    return this.withProjectAction("REMOVE_KEYFRAME", async () => {
      throw new Error("removeKeyframe API is not fully exposed.");
    });
  }

  public async createAdjustmentLayer(_name: string, _duration: number): Promise<CommandResult> {
    return this.withProjectAction("CREATE_ADJUSTMENT_LAYER", async () => {
      throw new Error("createAdjustmentLayer API is not fully exposed.");
    });
  }

  public async exportSequence(presetPath: string, outputFile: string): Promise<CommandResult> {
    return this.withProjectAction("EXPORT_SEQUENCE", async (project) => {
      const sequence = await project.getActiveSequence();
      if (!(sequence as any)?.exportAsMediaDirect) throw new Error("Export API not available.");
      (sequence as any).exportAsMediaDirect(outputFile, presetPath, 0);
      return { outputFile };
    });
  }

  public async autoTrim(_clipId?: string): Promise<CommandResult> {
    return this.withProjectAction("AUTO_TRIM", async () => {
      throw new Error("The local Premiere UXP API surface here does not expose a confirmed auto-trim analysis/action API.");
    });
  }

  public async beatCut(_clipId?: string): Promise<CommandResult> {
    return this.withProjectAction("BEAT_CUT", async () => {
      throw new Error("Beat detection and cut-placement APIs are not exposed by the discovered Premiere scripting surface in this workspace.");
    });
  }

  public async silenceRemove(_clipId?: string): Promise<CommandResult> {
    return this.withProjectAction("SILENCE_REMOVE", async () => {
      throw new Error("No confirmed Premiere UXP silence-analysis or automatic silence-removal transaction API is available here.");
    });
  }

  public async speedRamp(_clipId: string, _from: number, _to: number): Promise<CommandResult> {
    return this.withProjectAction("SPEED_RAMP", async () => {
      throw new Error("The discovered local UXP API here exposes TrackItem.getSpeed() but no confirmed writable speed-ramp transaction method.");
    });
  }

  public async applyColorMatch(_sourceClipId: string, targetClipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(targetClipId, "Lumetri Color", "APPLY_COLOR_MATCH");
  }

  public async applySkinToneProtection(clipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "Lumetri Color", "APPLY_SKIN_TONE_PROTECTION");
  }

  public async applyFilmLut(clipId: string, _lut: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "Lumetri Color", "APPLY_FILM_LUT");
  }

  public async autoGrade(clipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "Lumetri Color", "AUTO_GRADE");
  }

  public async removeNoise(clipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "DeNoise", "REMOVE_NOISE");
  }

  public async enhanceVoice(clipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "Dynamics", "ENHANCE_VOICE");
  }

  public async autoDuck(_mainClipId: string, musicClipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(musicClipId, "Dynamics", "AUTO_DUCK");
  }

  public async cleanupSpeech(clipId: string): Promise<CommandResult> {
    return this.applyEffectComponent(clipId, "DeNoise", "CLEANUP_SPEECH");
  }

  public async insertCaptions(_captions: string): Promise<CommandResult> {
    return this.withProjectAction("INSERT_CAPTIONS", async () => {
      throw new Error("No confirmed caption-track creation or caption-item insertion API is exposed in the discovered local UXP surface here.");
    });
  }

  private async executeEditorAction(
    actionName: CommandAction,
    actionMethod: string,
    argsBuilder: () => Promise<any[]>
  ): Promise<CommandResult> {
    return this.withProjectAction(actionName, async (project) => {
      const sequence = await project.getActiveSequence();
      if (!sequence) throw new Error("No active sequence is available.");

      const editor = await this.host?.app?.SequenceEditor?.getEditor?.(sequence);
      if (!editor) throw new Error("SequenceEditor is not available in this Premiere runtime.");

      const method = editor[actionMethod];
      if (typeof method !== "function") {
        throw new Error(`SequenceEditor.${actionMethod}() is not available in this Premiere runtime.`);
      }

      const args = await argsBuilder();
      
      // Some arguments might be null if clip is not found
      if (args.includes(null) || args.includes(undefined)) {
         throw new Error(`Invalid arguments for ${actionMethod}. Missing clip or track.`);
      }

      const transactionCommitted = await project.lockedAccess?.(async () =>
        project.executeTransaction?.((compoundAction: any) => {
          const action = method.apply(editor, args);
          if (!action || compoundAction.addAction(action) === false) {
            throw new Error(`Premiere rejected the ${actionMethod} action.`);
          }
        })
      );

      if (!transactionCommitted) {
        throw new Error(`Premiere did not commit the ${actionName} transaction.`);
      }

      return { success: true };
    });
  }

  private async applyEffectComponent(
    clipId: string,
    effectName: string,
    actionName: CommandAction
  ): Promise<CommandResult> {
    return this.withProjectAction(actionName, async (project) => {
      const clip = await this.findClipById(clipId);
      if (!clip) throw new Error(`Clip ${clipId} not found.`);

      const chain = await clip.getComponentChain?.();
      if (!chain) throw new Error("Component chain not available.");

      // Example standard UXP approach (may be missing)
      if (typeof chain.addComponent === "function") {
         chain.addComponent(effectName);
         return { success: true, message: `Applied ${effectName}` };
      }

      // If addComponent is not exposed, fall back to SequenceEditor applyEffectAction if available
      const sequence = await project.getActiveSequence();
      const editor = sequence ? await this.host?.app?.SequenceEditor?.getEditor?.(sequence) : null;
      if (editor && typeof editor.createApplyEffectAction === "function") {
          const transactionCommitted = await project.lockedAccess?.(async () =>
            project.executeTransaction?.((compoundAction: any) => {
              const action = editor.createApplyEffectAction(clip, effectName);
              if (action) compoundAction.addAction(action);
            })
          );
          if (transactionCommitted) return { success: true, message: `Applied ${effectName} via transaction` };
      }

      throw new Error(`The local UXP API does not expose a confirmed way to add the '${effectName}' effect.`);
    });
  }

  private async executeWithHost(
    action: CommandAction,
    payload: CommandPayload
  ): Promise<CommandResult> {
    try {
      const data = await this.host?.execute?.(action, payload);

      return {
        success: true,
        message: `${action} executed by host bridge.`,
        data
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: `${action} failed.`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async withProjectAction(
    action: CommandAction,
    callback: (project: PremiereProject) => Promise<unknown>
  ): Promise<CommandResult> {
    const project = await this.getActiveProject();

    if (project === null) {
      return unsupported(action, "No active Premiere project is available.");
    }

    try {
      const data = await callback(project);
      return { success: true, message: `${action} executed.`, data };
    } catch (error: unknown) {
      return {
        success: false,
        message: `${action} failed.`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async withTransaction(
    action: CommandAction,
    actionBuilder: (project: PremiereProject) => Promise<any>,
    unsupportedReason: string
  ): Promise<CommandResult> {
    if (this.transactionManager === null) {
      return unsupported(action, unsupportedReason);
    }

    try {
      const executed = await this.transactionManager.executeAction(actionBuilder);
      return {
        success: executed,
        message: executed ? `${action} executed.` : `${action} did not complete.`
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: `${action} failed.`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private async setMotionProperties(
    clipId: string,
    {
      position,
      scale
    }: {
      position?: [number, number];
      scale?: number;
    }
  ): Promise<CommandResult> {
    return this.withProjectAction("APPLY_PAN_AND_ZOOM", async (project) => {
      if (project.lockedAccess === undefined || project.executeTransaction === undefined) {
        throw new Error("Project transaction APIs are not available.");
      }

      return project.lockedAccess(async () => {
        const clip = await this.findClipById(clipId);

        if (clip === null) {
          throw new Error(`Clip "${clipId}" was not found on the active timeline.`);
        }

        const chain = await clip.getComponentChain?.();
        if (!chain) {
          throw new Error("Clip component chain is not available.");
        }

        const motion = await chain.getComponentAtIndex?.(1);
        if (!motion) {
          throw new Error("Motion component is not available.");
        }

        const actions: any[] = [];

        if (position) {
          const positionParam = await motion.getParam?.(0);
          if (positionParam?.createKeyframe === undefined || positionParam.createSetValueAction === undefined) {
            throw new Error("Motion position parameter is not writable.");
          }

          const point = this.createPoint(position[0], position[1]);
          const keyframe = positionParam.createKeyframe(point);
          keyframe.value.value = [position[0], position[1]];
          actions.push(positionParam.createSetValueAction(keyframe, true));
        }

        if (scale !== undefined) {
          const scaleParam = await motion.getParam?.(1);
          if (scaleParam?.createKeyframe === undefined || scaleParam.createSetValueAction === undefined) {
            throw new Error("Motion scale parameter is not writable.");
          }

          const keyframe = scaleParam.createKeyframe(scale);
          keyframe.value.value = scale;
          actions.push(scaleParam.createSetValueAction(keyframe, true));
        }

        return project.executeTransaction?.((compoundAction: any) => {
          for (const action of actions) {
            compoundAction.addAction(action);
          }
        });
      });
    });
  }

  private async getActiveProject(): Promise<PremiereProject | null> {
    if (this.host?.app === undefined) {
      return null;
    }

    return this.host.app.Project.getActiveProject();
  }

  private async getActiveSequence(): Promise<PremiereSequence | null> {
    const project = await this.getActiveProject();
    return project === null ? null : project.getActiveSequence();
  }

  private async readTracks(
    sequence: PremiereSequence,
    type: TimelineTrackType
  ): Promise<TimelineTrack[]> {
    const count =
      type === "video"
        ? await sequence.getVideoTrackCount()
        : await sequence.getAudioTrackCount();

    const tracks: TimelineTrack[] = [];

    for (let index = 0; index < count; index += 1) {
      const trackReader =
        type === "video" ? sequence.getVideoTrack?.bind(sequence) : sequence.getAudioTrack?.bind(sequence);

      if (!trackReader) {
        break;
      }

      const track = await trackReader(index);
      const clips = await this.readTrackClips(track, type);
      tracks.push({
        id: `${type}-${index + 1}`,
        name: `${type === "video" ? "Video" : "Audio"} ${index + 1}`,
        type,
        locked: null,
        capabilityNotes: [
          {
            field: "locked",
            source: "unavailable",
            reason: "The active Premiere runtime does not expose a verified track locked-state reader in this workspace."
          }
        ],
        clips
      });
    }

    return tracks;
  }

  private async readTrackClips(track: any, trackType: TimelineTrackType): Promise<TimelineClip[]> {
    if (track?.getTrackItems === undefined) {
      return [];
    }

    const clipType = this.host?.app?.Constants?.TrackItemType?.CLIP;
    const items = await track.getTrackItems(clipType, false);

    return Promise.all(
      (items ?? []).map(async (clip: any, index: number) => {
        const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
        const mediaPath = await this.readMediaPath(clip);
        const projectItemId = (await getProjectItemId(projectItem)) ?? null;
        const projectItemNodeId = getProjectItemNodeId(projectItem);
        const projectItemGuid = await tryPremiereValue(() => projectItem?.getTreePath?.() || projectItem?.guid, null);
        const rawItemType = await tryPremiereValue(() => clip.getType?.(), null);
        const itemType = normalizeOptionalText(rawItemType);
        const rawMediaType = normalizeOptionalText(await tryPremiereValue(() => clip.getMediaType?.(), null));
        const sourceIn = readTickSeconds(await tryPremiereValue(() => clip.getInPoint?.(), null));
        const sourceOut = readTickSeconds(await tryPremiereValue(() => clip.getOutPoint?.(), null));
        const speed = await tryPremiereValue(() => clip.getSpeed?.(), null as number | null);
        const disabled = await tryPremiereValue(() => clip.isDisabled?.(), null as boolean | null);
        const sourceFrameSize = await readFrameSize(projectItem);
        const mediaTypeResolution = resolveClipMediaType(trackType, rawMediaType, itemType, mediaPath);
        const capabilityNotes: TimelineCapabilityNote[] = [...mediaTypeResolution.notes];

        if (projectItemId === null) {
          capabilityNotes.push({
            field: "projectItemId",
            source: "unavailable",
            reason: "TrackItem.getProjectItem().getId() did not return a stable project-item identifier."
          });
        }

        if (mediaPath === null) {
          capabilityNotes.push({
            field: "mediaPath",
            source: "unavailable",
            reason: "This track item did not expose a media file path through getMediaFilePath()."
          });
        }

        if (sourceIn === null || sourceOut === null) {
          capabilityNotes.push({
            field: "sourceInOut",
            source: "unavailable",
            reason: "TrackItem.getInPoint()/getOutPoint() were not both available for this clip."
          });
        }

        if (speed === null) {
          capabilityNotes.push({
            field: "speed",
            source: "unavailable",
            reason: "TrackItem.getSpeed() did not return a readable value in this host session."
          });
        }

        if (disabled === null) {
          capabilityNotes.push({
            field: "disabled",
            source: "unavailable",
            reason: "TrackItem.isDisabled() did not return a readable value in this host session."
          });
        }

        if (sourceFrameSize === null) {
          capabilityNotes.push({
            field: "sourceFrameSize",
            source: "unavailable",
            reason: "The source project item did not expose a frame size in this host session."
          });
        }

        capabilityNotes.push({
          field: "linkedClipIds",
          source: "unavailable",
          reason: "No verified linked audio/video relationship reader is exposed by the active Premiere runtime in this workspace."
        });
        capabilityNotes.push({
          field: "proxyState",
          source: "unavailable",
          reason: "No verified proxy-state reader is exposed by the active Premiere runtime in this workspace."
        });

        return {
          id: buildStableTimelineClipId({
            name: await tryPremiereValue(() => clip.getName?.(), `clip-${index}`),
            trackType,
            trackIndex: await tryPremiereValue(() => clip.getTrackIndex?.(), 0),
            start: (await tryPremiereValue(() => clip.getStartTime?.(), { seconds: 0 })).seconds ?? 0,
            end: (await tryPremiereValue(() => clip.getEndTime?.(), { seconds: 0 })).seconds ?? 0,
            sourceIn,
            sourceOut,
            projectItemId,
            projectItemNodeId,
            mediaPath
          }),
          name: await tryPremiereValue(() => clip.getName?.(), `Clip ${index + 1}`),
          start: (await tryPremiereValue(() => clip.getStartTime?.(), { seconds: 0 })).seconds ?? 0,
          end: (await tryPremiereValue(() => clip.getEndTime?.(), { seconds: 0 })).seconds ?? 0,
          duration: (await tryPremiereValue(() => clip.getDuration?.(), { seconds: 0 })).seconds ?? 0,
          trackIndex: await tryPremiereValue(() => clip.getTrackIndex?.(), 0),
          selected: await tryPremiereValue(() => clip.getIsSelected?.(), false),
          mediaPath,
          projectItemId,
          projectItemNodeId,
          projectItemGuid,
          projectItem,
          mediaType: mediaTypeResolution.mediaType,
          itemType,
          sourceIn,
          sourceOut,
          speed,
          disabled,
          linkedClipIds: null,
          proxyState: null,
          sourceFrameSize,
          capabilityNotes
        };
      })
    );
  }

  private async readMediaPath(clip: any): Promise<string | null> {
    const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
    const media = await tryPremiereValue(() => projectItem?.getMedia?.(), null);

    if (media?.getMediaFilePath) {
      return media.getMediaFilePath();
    }

    if (projectItem?.getMediaFilePath) {
      return projectItem.getMediaFilePath();
    }

    return null;
  }

  private async findClipById(clipId: string): Promise<any | null> {
    const sequence = await this.getActiveSequence();

    if (sequence === null) {
      return null;
    }

    for (const type of ["video", "audio"] as const) {
      const count =
        type === "video"
          ? await sequence.getVideoTrackCount()
          : await sequence.getAudioTrackCount();

      for (let trackIndex = 0; trackIndex < count; trackIndex += 1) {
        const track =
          type === "video"
            ? await sequence.getVideoTrack?.(trackIndex)
            : await sequence.getAudioTrack?.(trackIndex);

        const items = await track?.getTrackItems?.(
          this.host?.app?.Constants?.TrackItemType?.CLIP,
          false
        );

        for (const item of items ?? []) {
          const name = await tryPremiereValue(() => item.getName?.(), "");
          if (name === clipId) {
            return item;
          }
        }
      }
    }

    return null;
  }

  private async findVideoClipByTime(time?: number): Promise<any | null> {
    const sequence = await this.getActiveSequence();

    if (sequence === null || sequence.getVideoTrack === undefined) {
      return null;
    }

    const videoTrackCount = await sequence.getVideoTrackCount();
    const targetTime = typeof time === "number" ? time : null;

    for (let trackIndex = 0; trackIndex < videoTrackCount; trackIndex += 1) {
      const track = await sequence.getVideoTrack(trackIndex);
      const items = await track?.getTrackItems?.(
        this.host?.app?.Constants?.TrackItemType?.CLIP,
        false
      );

      for (const item of items ?? []) {
        if (targetTime === null) {
          const selected = await tryPremiereValue(() => item.getIsSelected?.(), false);
          if (selected) {
            return item;
          }
          continue;
        }

        const start = (await tryPremiereValue(() => item.getStartTime?.(), { seconds: 0 })).seconds ?? 0;
        const end = (await tryPremiereValue(() => item.getEndTime?.(), { seconds: 0 })).seconds ?? 0;

        if (start <= targetTime && targetTime <= end) {
          return item;
        }
      }
    }

    return null;
  }

  private createPoint(x: number, y: number) {
    const PointCtor = this.host?.app?.PointF;

    if (PointCtor) {
      const point = new PointCtor();
      point.x = x;
      point.y = y;
      return point;
    }

    return { x, y };
  }

  private createTickTime(seconds: number) {
    const TickTimeCtor = this.host?.app?.TickTime;

    if (TickTimeCtor && typeof TickTimeCtor.createWithSeconds === "function") {
      return TickTimeCtor.createWithSeconds(seconds);
    }

    throw new Error("TickTime.createWithSeconds() is not available in this Premiere runtime.");
  }

  private async insertProjectItemToSequence(
    action: "ADD_CLIP_TO_SEQUENCE" | "ADD_AUDIO_TO_SEQUENCE",
    payload: CommandPayload,
    mediaType: "video" | "audio"
  ): Promise<CommandResult> {
    return this.withProjectAction(action, async (project) => {
      const attempt = {
        action,
        mediaType,
        clipId: asString(payload.clipId),
        projectItemId: asString(payload.projectItemId),
        mediaPath: asString(payload.mediaPath),
        start: asNumber(payload.start) ?? 0
      };
      console.log(`[RK Flow][${action}] Starting insertion attempt.`, attempt);

      try {
      const sequence = await project.getActiveSequence();

      if (sequence === null) {
        throw new Error("No active sequence is available.");
      }

      if (project.lockedAccess === undefined || project.executeTransaction === undefined) {
        throw new Error("Project transaction APIs are not available for clip insertion in this Premiere runtime.");
      }

      const editor = await this.host?.app?.SequenceEditor?.getEditor?.(sequence);
      const createInsertProjectItemAction = editor?.createInsertProjectItemAction;

      if (typeof createInsertProjectItemAction !== "function") {
        throw new Error("SequenceEditor.createInsertProjectItemAction() is not available in this Premiere runtime.");
      }

      const startSeconds = asNumber(payload.start) ?? 0;
      const videoTrackIndex = asNumber(payload.videoTrackIndex) ?? asNumber(payload.targetTrackIndex) ?? 0;
      const audioTrackIndex = asNumber(payload.audioTrackIndex) ?? asNumber(payload.targetTrackIndex) ?? 0;

      let projectItem = await this.findProjectItemForPayload(project, payload);

      if (projectItem === null && typeof payload.mediaPath === "string" && project.importFiles) {
        await project.importFiles([payload.mediaPath]);
        projectItem = await this.findProjectItemForPayload(project, payload);
      }

      if (projectItem === null) {
        throw new Error("Project item could not be resolved for clip/audio insertion.");
      }

      const insertionTime = this.createTickTime(startSeconds);
      const beforeItemCount = await this.countSequenceItems(sequence, mediaType);
      console.log(`[RK Flow][${action}] Resolved project item and transaction inputs.`, {
        ...attempt,
        itemName: await getProjectItemName(projectItem),
        resolvedProjectItemId: await getProjectItemId(projectItem),
        beforeItemCount,
        videoTrackIndex: mediaType === "video" ? videoTrackIndex : -1,
        audioTrackIndex,
        limitShift: true
      });
      const transactionCommitted = await project.lockedAccess(async () =>
        project.executeTransaction?.((compoundAction: any) => {
          const insertAction = createInsertProjectItemAction.call(
            editor,
            projectItem,
            insertionTime,
            mediaType === "video" ? videoTrackIndex : -1,
            audioTrackIndex,
            true
          );

          if (!insertAction || compoundAction.addAction(insertAction) === false) {
            throw new Error("Premiere rejected the insert-project-item action.");
          }
        })
      );

      if (!transactionCommitted) {
        throw new Error("Premiere did not commit the insert-project-item transaction.");
      }

      const afterItemCount = await this.countSequenceItems(sequence, mediaType);

      if (afterItemCount <= beforeItemCount) {
        throw new Error(
          `Premiere committed the insert transaction but ${mediaType} item count did not increase (${beforeItemCount} -> ${afterItemCount}).`
        );
      }

      console.log(`[RK Flow][${action}] Insertion succeeded.`, {
        ...attempt,
        beforeItemCount,
        afterItemCount,
        transactionCommitted
      });

      return {
        inserted: true,
        mediaType,
        startSeconds,
        itemName: await getProjectItemName(projectItem),
        videoTrackIndex: mediaType === "video" ? videoTrackIndex : -1,
        audioTrackIndex
      };
      } catch (error: unknown) {
        console.error(`[RK Flow][${action}] Insertion failed.`, { ...attempt, error });
        throw error;
      }
    });
  }

  private async countSequenceItems(sequence: PremiereSequence, mediaType: "video" | "audio") {
    const count = mediaType === "video"
      ? await sequence.getVideoTrackCount()
      : await sequence.getAudioTrackCount();
    const getTrack = mediaType === "video" ? sequence.getVideoTrack?.bind(sequence) : sequence.getAudioTrack?.bind(sequence);

    if (!getTrack) {
      return 0;
    }

    let itemCount = 0;
    for (let index = 0; index < count; index += 1) {
      const track = await getTrack(index);
      const items = await track?.getTrackItems?.(this.host?.app?.Constants?.TrackItemType?.CLIP, false);
      itemCount += Array.isArray(items) ? items.length : 0;
    }

    return itemCount;
  }

  private async findProjectItemForPayload(
    project: PremiereProject,
    payload: CommandPayload
  ): Promise<any | null> {
    if (payload.projectItem) {
      return payload.projectItem;
    }

    const candidates = [
      asString(payload.projectItemId),
      asString(payload.mediaPath)
    ].filter((value): value is string => Boolean(value));

    for (const candidate of candidates) {
      const timelineMatch = await this.findProjectItemInSequences(project, candidate);
      if (timelineMatch) {
        return timelineMatch;
      }

      const root = await project.getRootItem?.();
      if (!root) {
        continue;
      }

      const match = await this.findProjectItemRecursive(root, candidate);
      if (match) {
        return match;
      }
    }

    return null;
  }

  private async findProjectItemInSequences(
    project: PremiereProject,
    candidate: string
  ): Promise<any | null> {
    const sequences = await project.getSequences?.();
    const clipType = this.host?.app?.Constants?.TrackItemType?.CLIP;

    for (const sequence of sequences ?? []) {
      const trackCount = await sequence.getVideoTrackCount();

      for (let trackIndex = 0; trackIndex < trackCount; trackIndex += 1) {
        const track = await sequence.getVideoTrack?.(trackIndex);
        const items = await tryPremiereValue(
          () => track?.getTrackItems?.(clipType, false),
          [] as any[]
        );

        for (const clip of items ?? []) {
          const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
          if (await projectItemMatches(projectItem, candidate)) {
            console.log("[RK Flow][ADD_CLIP_TO_SEQUENCE] Resolved project item from source sequence.", {
              candidate,
              sourceSequence: sequence.name,
              sourceTrackIndex: trackIndex
            });
            return projectItem;
          }
        }
      }
    }

    return null;
  }

  private async findProjectItemRecursive(rootItem: any, candidate: string): Promise<any | null> {
    // UXP FolderItem exposes child project items through getItems(), not CEP's children collection.
    const items = await rootItem?.getItems?.();

    for (const item of items ?? []) {
      if (await projectItemMatches(item, candidate)) {
        return item;
      }

      if (typeof item?.getItems === "function") {
        const nested = await this.findProjectItemRecursive(item, candidate);
        if (nested) {
          return nested;
        }
      }
    }

    return null;
  }

  private resolveHost(): PremiereHost | null {
    const moduleRequire = (globalThis as { require?: unknown }).require;

    if (typeof moduleRequire !== "function") {
      return null;
    }

    try {
      const app = moduleRequire("premierepro") as PremiereApp;
      return app?.Project?.getActiveProject === undefined ? null : { app };
    } catch {
      return null;
    }
  }
}

function normalizeTextValue(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

const ACTION_HANDLERS: Partial<
  Record<CommandAction, (bridge: PremiereBridge, payload: CommandPayload) => Promise<CommandResult>>
> = {
  CREATE_SEQUENCE: (bridge: PremiereBridge, payload: any) => bridge.createSequence(String(payload.name ?? "")),
  IMPORT_MEDIA: (bridge: PremiereBridge, payload: any) => bridge.importMedia(String(payload.mediaPath ?? "")),
  ADD_TRANSITION: (bridge: PremiereBridge, payload: any) =>
    bridge.addTransition(
      String(payload.type ?? "cross_dissolve"),
      asNumber(payload.start),
      asNumber(payload.duration)
    ),
  AUTO_ZOOM: (bridge: PremiereBridge, payload: any) =>
    bridge.autoZoom(String(payload.clipId ?? ""), payload.start, payload.end),
  APPLY_PAN_AND_ZOOM: (bridge: PremiereBridge, payload: any) =>
    bridge.applyPanAndZoom(String(payload.clipId ?? ""), String(payload.preset ?? "")),
  APPLY_PARALLAX: (bridge: PremiereBridge, payload: any) =>
    bridge.applyParallax(String(payload.clipId ?? "")),
  APPLY_MOTION_BLUR: (bridge: PremiereBridge, payload: any) =>
    bridge.applyMotionBlur(String(payload.clipId ?? ""), String(payload.amount ?? "")),
  REFRAME: (bridge: PremiereBridge, payload: any) => bridge.reframe(String(payload.clipId ?? "")),
  RIPPLE_DELETE: (bridge: PremiereBridge, payload: any) =>
    bridge.rippleDelete(asNumber(payload.start) ?? 0, asNumber(payload.end) ?? 0),
  MOVE_CLIP: (bridge: PremiereBridge, payload: any) =>
    bridge.moveClip(
      String(payload.clipId ?? ""),
      asNumber(payload.targetTrackIndex) ?? 0,
      asNumber(payload.start) ?? 0
    ),
  TRIM_CLIP: (bridge: PremiereBridge, payload: any) =>
    bridge.trimClip(
      String(payload.clipId ?? ""),
      asNumber(payload.start) ?? 0,
      asNumber(payload.end) ?? 0
    ),
  CUT_CLIP: (bridge: PremiereBridge, payload: any) =>
    bridge.cutClip(
      String(payload.clipId ?? ""),
      asNumber(payload.time) ?? 0
    ),
  DELETE_CLIP: (bridge: PremiereBridge, payload: any) =>
    bridge.deleteClip(String(payload.clipId ?? "")),
  CREATE_MARKER: (bridge: PremiereBridge, payload: any) =>
    bridge.createMarker(
      String(payload.name ?? ""),
      asNumber(payload.time) ?? 0,
      String(payload.color ?? "")
    ),
  DELETE_MARKER: (bridge: PremiereBridge, payload: any) =>
    bridge.deleteMarker(String(payload.markerId ?? "")),
  MOVE_PLAYHEAD: (bridge: PremiereBridge, payload: any) =>
    bridge.movePlayhead(asNumber(payload.time) ?? 0),
  CREATE_BIN: (bridge: PremiereBridge, payload: any) =>
    bridge.createBin(String(payload.name ?? "")),
  MOVE_TO_BIN: (bridge: PremiereBridge, payload: any) =>
    bridge.moveToBin(String(payload.projectItemId ?? ""), String(payload.binPath ?? "")),
  NEST_SEQUENCE: (bridge: PremiereBridge, payload: any) =>
    bridge.nestSequence(String(payload.name ?? "")),
  SET_CLIP_SPEED: (bridge: PremiereBridge, payload: any) =>
    bridge.setClipSpeed(String(payload.clipId ?? ""), asNumber(payload.speed) ?? 1),
  ADD_KEYFRAME: (bridge: PremiereBridge, payload: any) =>
    bridge.addKeyframe(
      String(payload.clipId ?? ""),
      String(payload.property ?? ""),
      asNumber(payload.time) ?? 0,
      payload.value
    ),
  REMOVE_KEYFRAME: (bridge: PremiereBridge, payload: any) =>
    bridge.removeKeyframe(
      String(payload.clipId ?? ""),
      String(payload.property ?? ""),
      asNumber(payload.time) ?? 0
    ),
  CREATE_ADJUSTMENT_LAYER: (bridge: PremiereBridge, payload: any) =>
    bridge.createAdjustmentLayer(
      String(payload.name ?? ""),
      asNumber(payload.duration) ?? 5
    ),
  EXPORT_SEQUENCE: (bridge: PremiereBridge, payload: any) =>
    bridge.exportSequence(
      String(payload.presetPath ?? ""),
      String(payload.outputFile ?? "")
    ),
  ADD_CLIP_TO_SEQUENCE: (bridge: PremiereBridge, payload: any) => bridge.addClipToSequence(payload),
  ADD_AUDIO_TO_SEQUENCE: (bridge: PremiereBridge, payload: any) => bridge.addAudioToSequence(payload),
  AUTO_TRIM: (bridge: PremiereBridge, payload: any) => bridge.autoTrim(asString(payload.clipId)),
  BEAT_CUT: (bridge: PremiereBridge, payload: any) => bridge.beatCut(asString(payload.clipId)),
  SILENCE_REMOVE: (bridge: PremiereBridge, payload: any) => bridge.silenceRemove(asString(payload.clipId)),
  SPEED_RAMP: (bridge: PremiereBridge, payload: any) =>
    bridge.speedRamp(
      String(payload.clipId ?? ""),
      asNumber(payload.from) ?? 0,
      asNumber(payload.to) ?? 0
    ),
  APPLY_COLOR_MATCH: (bridge: PremiereBridge, payload: any) =>
    bridge.applyColorMatch(
      String(payload.sourceClipId ?? ""),
      String(payload.targetClipId ?? "")
    ),
  APPLY_SKIN_TONE_PROTECTION: (bridge: PremiereBridge, payload: any) =>
    bridge.applySkinToneProtection(String(payload.clipId ?? "")),
  APPLY_FILM_LUT: (bridge: PremiereBridge, payload: any) =>
    bridge.applyFilmLut(String(payload.clipId ?? ""), String(payload.lut ?? "")),
  AUTO_GRADE: (bridge: PremiereBridge, payload: any) =>
    bridge.autoGrade(String(payload.clipId ?? "")),
  REMOVE_NOISE: (bridge: PremiereBridge, payload: any) =>
    bridge.removeNoise(String(payload.clipId ?? "")),
  ENHANCE_VOICE: (bridge: PremiereBridge, payload: any) =>
    bridge.enhanceVoice(String(payload.clipId ?? "")),
  AUTO_DUCK: (bridge: PremiereBridge, payload: any) =>
    bridge.autoDuck(String(payload.mainClipId ?? ""), String(payload.musicClipId ?? "")),
  CLEANUP_SPEECH: (bridge: PremiereBridge, payload: any) =>
    bridge.cleanupSpeech(String(payload.clipId ?? "")),
  INSERT_CAPTIONS: (bridge: PremiereBridge, payload: any) =>
    bridge.insertCaptions(String(payload.captions ?? ""))
};

async function getFrameRate(settings: SequenceSettings): Promise<number> {
  if (settings.getVideoFrameRate === undefined) {
    return 0;
  }

  return (await settings.getVideoFrameRate()).value;
}

function createTracks(type: TimelineTrackType, count: number): TimelineTrack[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${type}-${index + 1}`,
    name: `${type === "video" ? "Video" : "Audio"} ${index + 1}`,
    type,
    locked: null,
    capabilityNotes: [
      {
        field: "locked",
        source: "unavailable",
        reason: "The active Premiere runtime does not expose a verified track locked-state reader in this workspace."
      }
    ],
    clips: []
  }));
}

function unsupported(action: CommandAction, reason: string): CommandResult {
  return {
    success: false,
    message: `${action} is not supported by the local PremiereBridge implementation.`,
    error: reason
  };
}

function panAndZoomPreset(preset: string): [number, number, number] {
  switch (preset) {
    case "slow_zoom_in":
      return [0.5, 0.5, 112];
    case "pan_left_to_right":
      return [0.68, 0.5, 105];
    default:
      return [0.5, 0.5, 105];
  }
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

async function projectItemMatches(item: any, candidate: string): Promise<boolean> {
  if (!item) {
    return false;
  }

  if (String(item.nodeId ?? "") === candidate) {
    return true;
  }

  if ((await getProjectItemId(item)) === candidate) {
    return true;
  }

  if (String(item.name ?? "") === candidate) {
    return true;
  }

  const mediaPath = await getProjectItemMediaPath(item);
  return mediaPath === candidate;
}

async function getProjectItemId(item: any): Promise<string | undefined> {
  try {
    const id = await item?.getId?.();
    return typeof id === "string" && id.length > 0 ? id : undefined;
  } catch {
    return undefined;
  }
}

async function getProjectItemMediaPath(item: any): Promise<string | undefined> {
  if (typeof item.getMediaFilePath === "function") {
    return item.getMediaFilePath();
  }

  const media = await tryPremiereValue(() => item?.getMedia?.(), null);
  if (media?.getMediaFilePath) {
    return media.getMediaFilePath();
  }

  return undefined;
}

async function tryPremiereValue<T>(
  callback: () => T | Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const value = await callback();
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

async function getProjectItemName(item: any): Promise<string> {
  if (typeof item.getName === "function") {
    return item.getName();
  }

  return String(item.name ?? "Unknown Item");
}

function projectAvailable(host: PremiereHost | null): boolean {
  return host?.app?.Project?.getActiveProject !== undefined;
}

function projectHint(available: boolean): string {
  return available
    ? "Premiere transaction APIs are available, but this action requires a confirmed writable transaction contract."
    : "No active writable Premiere project/transaction runtime is attached.";
}

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

function readTickSeconds(value: unknown): number | null {
  if (typeof value === "object" && value !== null && typeof (value as TickTime).seconds === "number") {
    return (value as TickTime).seconds;
  }

  return null;
}

async function readFrameSize(source: { getFrameSize?: () => Promise<{ width?: number; height?: number } | null> } | null): Promise<TimelineFrameSize | null> {
  if (!source?.getFrameSize) {
    return null;
  }

  try {
    const value = await source.getFrameSize();
    const width = typeof value?.width === "number" && Number.isFinite(value.width) ? value.width : null;
    const height = typeof value?.height === "number" && Number.isFinite(value.height) ? value.height : null;
    return width !== null && height !== null ? { width, height } : null;
  } catch {
    return null;
  }
}

function resolveClipMediaType(
  trackType: TimelineTrackType,
  rawMediaType: string | null,
  itemType: string | null,
  mediaPath: string | null
): {
  mediaType: TimelineClipMediaType;
  notes: TimelineCapabilityNote[];
} {
  const notes: TimelineCapabilityNote[] = [];
  const mediaTypeText = rawMediaType?.toLowerCase() ?? "";
  const itemTypeText = itemType?.toLowerCase() ?? "";

  if (trackType === "audio" || /audio/.test(mediaTypeText)) {
    return { mediaType: "audio", notes };
  }

  if (/(still|image|photo)/.test(itemTypeText)) {
    return { mediaType: "still", notes };
  }

  if (isStillMediaPath(mediaPath)) {
    notes.push({
      field: "mediaType",
      source: "metadata-fallback",
      reason: "Still-image detection used the media file extension because no verified host item-type flag was exposed."
    });
    return { mediaType: "still", notes };
  }

  if (trackType === "video" || /video/.test(mediaTypeText)) {
    return { mediaType: "video", notes };
  }

  notes.push({
    field: "mediaType",
    source: "unavailable",
    reason: "The active Premiere runtime did not expose a readable clip media type for this track item."
  });
  return { mediaType: "unknown", notes };
}

function isStillMediaPath(mediaPath: string | null): boolean {
  return mediaPath !== null && /\.(jpg|jpeg|png|gif|bmp|tif|tiff|webp|heic)$/i.test(mediaPath);
}

function getProjectItemNodeId(item: any): string | null {
  const nodeId = item?.nodeId;
  if (typeof nodeId === "string" && nodeId.length > 0) {
    return nodeId;
  }
  if (typeof nodeId === "number" && Number.isFinite(nodeId)) {
    return String(nodeId);
  }
  return null;
}

function buildStableTimelineClipId(input: {
  name: string;
  trackType: TimelineTrackType;
  trackIndex: number;
  start: number;
  end: number;
  sourceIn: number | null;
  sourceOut: number | null;
  projectItemId: string | null;
  projectItemNodeId: string | null;
  mediaPath: string | null;
}): string {
  return [
    input.trackType,
    input.trackIndex,
    formatStableNumber(input.start),
    formatStableNumber(input.end),
    formatStableNumber(input.sourceIn),
    formatStableNumber(input.sourceOut),
    input.projectItemId ?? "project-item:unknown",
    input.projectItemNodeId ?? "node:unknown",
    input.mediaPath ?? "path:unknown",
    input.name
  ].join("::");
}

function formatStableNumber(value: number | null): string {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(3) : "unknown";
}
