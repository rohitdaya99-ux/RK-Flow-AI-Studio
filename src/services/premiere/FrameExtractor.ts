import { BrainClip } from "../../core/brain/types";

type ExtractedFrame = {
  ok: boolean;
  path?: string;
  mimeType?: string;
  base64?: string;
  source: "visual" | "metadata-only";
  error?: string;
  timecode: number;
};

type ClipSamples = {
  clipId: string;
  clipName: string;
  frames: ExtractedFrame[];
  source: "visual" | "metadata-only";
};

type RuntimeModules = {
  ppro: any | null;
  fs: any | null;
  path: any | null;
  os: any | null;
  processRef: any | null;
};

export class FrameExtractor {
  async extractFrame(sequenceId: string, timecode: number): Promise<ExtractedFrame> {
    const runtime = this.resolveRuntime();

    if (!runtime.ppro || !runtime.fs || !runtime.path) {
      return {
        ok: false,
        source: "metadata-only",
        error: "Premiere frame exporter is unavailable in this panel runtime.",
        timecode
      };
    }

    const cacheDirectory = this.resolveCacheDirectory(runtime);

    if (!cacheDirectory) {
      return {
        ok: false,
        source: "metadata-only",
        error: "No writable frame cache directory is available in this host.",
        timecode
      };
    }

    const project = await runtime.ppro.Project.getActiveProject();
    const sequence = project ? await project.getActiveSequence() : null;

    if (!sequence) {
      return {
        ok: false,
        source: "metadata-only",
        error: "No active sequence.",
        timecode
      };
    }

    const activeSequenceId = String(sequence.guid ?? sequence.name ?? "active-sequence");
    const effectiveSequenceId = sequenceId || activeSequenceId;
    const cachePath = this.getFramePath(runtime, cacheDirectory, effectiveSequenceId, timecode);

    try {
      runtime.fs.mkdirSync(cacheDirectory, { recursive: true });
    } catch (error) {
      return {
        ok: false,
        source: "metadata-only",
        error: error instanceof Error ? error.message : String(error),
        timecode
      };
    }

    if (runtime.fs.existsSync(cachePath)) {
      return this.readFrame(runtime, cachePath, timecode);
    }

    try {
      const position =
        runtime.ppro.TickTime &&
        typeof runtime.ppro.TickTime.createWithSeconds === "function"
          ? runtime.ppro.TickTime.createWithSeconds(Number(timecode))
          : await sequence.getPlayerPosition();

      const size = await sequence.getFrameSize();
      const filename = runtime.path.basename(cachePath);
      const returned = await runtime.ppro.Exporter.exportSequenceFrame(
        sequence,
        position,
        filename,
        cacheDirectory,
        size.width,
        size.height
      );

      const finalPath = runtime.path.join(cacheDirectory, filename);

      if (!runtime.fs.existsSync(finalPath)) {
        return {
          ok: false,
          source: "metadata-only",
          error: `Frame export returned ${JSON.stringify(returned)} but no file was written.`,
          timecode
        };
      }

      return this.readFrame(runtime, finalPath, timecode);
    } catch (error) {
      return {
        ok: false,
        source: "metadata-only",
        error: error instanceof Error ? error.message : String(error),
        timecode
      };
    }
  }

  async extractClipSamples(sequenceId: string, clip: BrainClip): Promise<ClipSamples> {
    const duration = Math.max(clip.duration, 0.25);
    const epsilon = Math.min(0.04, duration / 10);
    const sampleTimes = [
      clip.start,
      clip.start + duration * 0.25,
      clip.start + duration * 0.5,
      clip.start + duration * 0.75,
      Math.max(clip.start, clip.end - epsilon)
    ];

    const frames: ExtractedFrame[] = [];

    for (const timecode of sampleTimes) {
      frames.push(await this.extractFrame(sequenceId, timecode));
    }

    const source = frames.some((frame) => frame.ok) ? "visual" : "metadata-only";

    return {
      clipId: clip.id,
      clipName: clip.name,
      frames,
      source
    };
  }

  private resolveRuntime(): RuntimeModules {
    return {
      ppro: resolveModule<any>("premierepro"),
      fs: resolveModule<any>("fs"),
      path: resolveModule<any>("path"),
      os: resolveModule<any>("os"),
      processRef:
        typeof process !== "undefined"
          ? process
          : (typeof globalThis !== "undefined" ? (globalThis as any).process : null)
    };
  }

  private resolveCacheDirectory(runtime: RuntimeModules): string | null {
    const { fs, path, os, processRef } = runtime;

    if (!fs || !path) {
      return null;
    }

    const candidates = [
      safeTempDirFromOs(os),
      safeEnv(processRef, "RKFLOW_FRAME_CACHE_DIR"),
      safeEnv(processRef, "TMPDIR"),
      safeEnv(processRef, "TMP"),
      safeEnv(processRef, "TEMP"),
      safeCwd(processRef)
    ].filter((value): value is string => typeof value === "string" && value.length > 0);

    for (const candidate of candidates) {
      const folder = path.join(candidate, "rkflow-frame-cache");

      try {
        fs.mkdirSync(folder, { recursive: true });
        return folder;
      } catch {}
    }

    return null;
  }

  private getFramePath(
    runtime: RuntimeModules,
    cacheDirectory: string,
    sequenceId: string,
    timecode: number
  ) {
    const safeSequence = sequenceId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const safeTime = timecode.toFixed(3).replace(/\./g, "_");
    return runtime.path!.join(cacheDirectory, `${safeSequence}_${safeTime}.png`);
  }

  private readFrame(runtime: RuntimeModules, filePath: string, timecode: number): ExtractedFrame {
    const base64 = runtime.fs!.readFileSync(filePath).toString("base64");

    return {
      ok: true,
      path: filePath,
      mimeType: "image/png",
      base64,
      source: "visual",
      timecode
    };
  }
}

let frameExtractorSingleton: FrameExtractor | null = null;

export function getFrameExtractor() {
  if (frameExtractorSingleton === null) {
    frameExtractorSingleton = new FrameExtractor();
  }

  return frameExtractorSingleton;
}

function resolveModule<T>(name: string): T | null {
  const requireFn =
    (typeof globalThis !== "undefined" ? (globalThis as any).require : undefined) ||
    (typeof window !== "undefined" ? (window as any).require : undefined);

  if (typeof requireFn !== "function") {
    return null;
  }

  try {
    return requireFn(name) as T;
  } catch {
    return null;
  }
}

function safeTempDirFromOs(osModule: any | null) {
  try {
    if (osModule && typeof osModule.tmpdir === "function") {
      return osModule.tmpdir();
    }
  } catch {}

  return "";
}

function safeEnv(processRef: any | null, key: string) {
  try {
    return String(processRef?.env?.[key] ?? "");
  } catch {
    return "";
  }
}

function safeCwd(processRef: any | null) {
  try {
    if (processRef && typeof processRef.cwd === "function") {
      return processRef.cwd();
    }
  } catch {}

  return "";
}
