import type { AutoReelExtractionRequest, AutoReelExtractionResult, VisionBatchAnalysis, VisionCapabilities, EmotionCapabilities, EmotionReport, FaceCapabilities, FaceReport } from "./models";

const SIDECAR_HOST = "127.0.0.1";
const SIDECAR_START_TIMEOUT_MS = 7000;
const SIDECAR_POLL_INTERVAL_MS = 250;

interface SidecarSession {
  baseUrl: string;
  token: string;
  port: number;
  pythonCommand?: string;
}

interface RuntimeModules {
  childProcess: {
    spawn: (...args: unknown[]) => { unref?: () => void };
    spawnSync: (...args: unknown[]) => { status: number | null };
  } | null;
  fs: {
    existsSync: (path: string) => boolean;
  } | null;
  path: {
    join: (...parts: string[]) => string;
  } | null;
  processRef: {
    cwd?: () => string;
    env?: Record<string, string | undefined>;
  } | null;
}

export interface AutoReelSidecarHealth {
  available: boolean;
  status: "available" | "unavailable";
  baseUrl?: string;
  version?: string;
  reason?: string;
  pythonVersion?: string;
  capabilities: string[];
}

export class AutoReelSidecarUnavailableError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "AutoReelSidecarUnavailableError";
  }
}

export class AutoReelSidecarCancelledError extends Error {
  public constructor(message = "Auto Reel extraction was cancelled.") {
    super(message);
    this.name = "AutoReelSidecarCancelledError";
  }
}

export class AutoReelSidecarClient {
  private session: SidecarSession | null = null;

  public async ensureReady(): Promise<AutoReelSidecarHealth> {
    if (this.session) {
      const connected = await this.fetchHealth(this.session);
      if (connected.available) {
        return connected;
      }
      this.session = null;
    }

    const started = await this.tryStartSidecar();
    if (!started) {
      return {
        available: false,
        status: "unavailable",
        capabilities: [],
        reason: "Local analysis sidecar is unavailable. Start analysis-sidecar manually or use a runtime that can spawn Python."
      };
    }

    this.session = started;
    return this.fetchHealth(started);
  }

  public async runExtractionJob(
    request: AutoReelExtractionRequest,
    options: {
      signal?: AbortSignal;
      onProgress?: (result: AutoReelExtractionResult) => void;
    } = {}
  ): Promise<AutoReelExtractionResult> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) {
      throw new AutoReelSidecarUnavailableError(health.reason || "Local analysis sidecar is unavailable.");
    }

    const submit = await this.requestJson<{ jobId: string }>(this.session, "/extraction/jobs", {
      method: "POST",
      body: JSON.stringify(request)
    });

    if (!submit?.jobId) {
      throw new AutoReelSidecarUnavailableError("Local analysis sidecar did not return an extraction job ID.");
    }

    let aborted = false;
    const abortHandler = () => {
      aborted = true;
      void this.cancelJob(submit.jobId).catch(() => undefined);
    };
    options.signal?.addEventListener("abort", abortHandler, { once: true });

    try {
      for (;;) {
        if (aborted || options.signal?.aborted) {
          throw new AutoReelSidecarCancelledError();
        }

        const result = await this.requestJson<AutoReelExtractionResult>(
          this.session,
          `/extraction/jobs/${encodeURIComponent(submit.jobId)}`
        );
        options.onProgress?.(result);

        if (isTerminalExtractionStatus(result?.status)) {
          return result;
        }

        await delay(SIDECAR_POLL_INTERVAL_MS);
      }
    } finally {
      options.signal?.removeEventListener("abort", abortHandler);
    }
  }

  public async cancelJob(jobId: string): Promise<void> {
    if (!this.session) {
      return;
    }

    await this.requestJson(this.session, `/extraction/jobs/${encodeURIComponent(jobId)}/cancel`, {
      method: "POST"
    });
  }

  public async getVisionCapabilities(): Promise<VisionCapabilities> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Vision sidecar is unavailable.");
    return this.requestJson<VisionCapabilities>(this.session, "/vision/capabilities");
  }

  public async runVisionJob(request: unknown, options: { signal?: AbortSignal; onProgress?: (result: VisionBatchAnalysis) => void } = {}): Promise<VisionBatchAnalysis> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Vision sidecar is unavailable.");
    const submit = await this.requestJson<{ jobId: string }>(this.session, "/vision/jobs", { method: "POST", body: JSON.stringify(request) });
    if (!submit.jobId) throw new AutoReelSidecarUnavailableError("Local sidecar did not return a Vision job ID.");
    let aborted = false;
    const abortHandler = () => { aborted = true; void this.requestJson(this.session!, `/vision/jobs/${encodeURIComponent(submit.jobId)}/cancel`, { method: "POST" }).catch(() => undefined); };
    options.signal?.addEventListener("abort", abortHandler, { once: true });
    try {
      for (;;) {
        if (aborted || options.signal?.aborted) throw new AutoReelSidecarCancelledError("Auto Reel Vision analysis was cancelled.");
        const result = await this.requestJson<VisionBatchAnalysis>(this.session, `/vision/jobs/${encodeURIComponent(submit.jobId)}`);
        options.onProgress?.(result);
        if (result.status === "completed" || result.status === "cancelled" || result.status === "failed" || result.status === "sidecar-unavailable") return result;
        await delay(SIDECAR_POLL_INTERVAL_MS);
      }
    } finally { options.signal?.removeEventListener("abort", abortHandler); }
  }

  public async getFaceCapabilities(): Promise<FaceCapabilities> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Face sidecar is unavailable.");
    return this.requestJson<FaceCapabilities>(this.session, "/face/capabilities");
  }

  public async runFaceJob(request: unknown, options: { signal?: AbortSignal; onProgress?: (result: FaceReport) => void } = {}): Promise<FaceReport> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Face sidecar is unavailable.");
    const submit = await this.requestJson<{ jobId: string }>(this.session, "/face/jobs", { method: "POST", body: JSON.stringify(request) });
    if (!submit.jobId) throw new AutoReelSidecarUnavailableError("Local sidecar did not return a Face job ID.");
    let aborted = false;
    const abortHandler = () => { aborted = true; void this.requestJson(this.session!, `/face/jobs/${encodeURIComponent(submit.jobId)}/cancel`, { method: "POST" }).catch(() => undefined); };
    options.signal?.addEventListener("abort", abortHandler, { once: true });
    try {
      for (;;) {
        if (aborted || options.signal?.aborted) throw new AutoReelSidecarCancelledError("Auto Reel Face analysis was cancelled.");
        const result = await this.requestJson<FaceReport>(this.session, `/face/jobs/${encodeURIComponent(submit.jobId)}`);
        options.onProgress?.(result);
        if (result.status === "completed" || result.status === "cancelled" || result.status === "failed" || result.status === "sidecar-unavailable") return result;
        await delay(SIDECAR_POLL_INTERVAL_MS);
      }
    } finally { options.signal?.removeEventListener("abort", abortHandler); }
  }
  
  public async getEmotionCapabilities(): Promise<EmotionCapabilities> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Emotion sidecar is unavailable.");
    return this.requestJson<EmotionCapabilities>(this.session, "/emotion/capabilities");
  }

  public async runEmotionJob(request: unknown, options: { signal?: AbortSignal; onProgress?: (result: EmotionReport) => void } = {}): Promise<EmotionReport> {
    const health = await this.ensureReady();
    if (!health.available || !this.session) throw new AutoReelSidecarUnavailableError(health.reason || "Local Emotion sidecar is unavailable.");
    const submit = await this.requestJson<{ jobId: string }>(this.session, "/emotion/jobs", { method: "POST", body: JSON.stringify(request) });
    if (!submit.jobId) throw new AutoReelSidecarUnavailableError("Local sidecar did not return an Emotion job ID.");
    let aborted = false;
    const abortHandler = () => { aborted = true; void this.requestJson(this.session!, `/emotion/jobs/${encodeURIComponent(submit.jobId)}/cancel`, { method: "POST" }).catch(() => undefined); };
    options.signal?.addEventListener("abort", abortHandler, { once: true });
    try {
      for (;;) {
        if (aborted || options.signal?.aborted) throw new AutoReelSidecarCancelledError("Auto Reel Emotion analysis was cancelled.");
        const result = await this.requestJson<EmotionReport>(this.session, `/emotion/jobs/${encodeURIComponent(submit.jobId)}`);
        options.onProgress?.(result);
        if (result.status === "completed" || result.status === "cancelled" || result.status === "failed" || result.status === "sidecar-unavailable") return result;
        await delay(SIDECAR_POLL_INTERVAL_MS);
      }
    } finally { options.signal?.removeEventListener("abort", abortHandler); }
  }

  private async fetchHealth(session: SidecarSession): Promise<AutoReelSidecarHealth> {
    try {
      const payload = await this.requestJson<Record<string, unknown>>(session, "/health");
      const capabilities = await this.requestJson<Record<string, unknown>>(session, "/capabilities").catch(() => null);
      return mapSidecarHealthResponse(payload, capabilities, session.baseUrl);
    } catch (error) {
      return {
        available: false,
        status: "unavailable",
        capabilities: [],
        reason: error instanceof Error ? error.message : "Local analysis sidecar is unavailable."
      };
    }
  }

  private async tryStartSidecar(): Promise<SidecarSession | null> {
    const runtime = resolveRuntimeModules();
    const scriptPath = resolveSidecarScript(runtime);

    if (!runtime.childProcess || !runtime.processRef || !scriptPath) {
      return null;
    }

    const token = createRandomToken();
    const port = 43000 + Math.floor(Math.random() * 1000);
    const pythonCandidates = uniqueStrings([
      runtime.processRef.env?.RKFLOW_ANALYSIS_SIDECAR_PYTHON,
      "python3.11",
      "python3"
    ]);

    for (const pythonCommand of pythonCandidates) {
      if (!canRunCommand(runtime, pythonCommand)) {
        continue;
      }

      try {
        runtime.childProcess
          .spawn(
            pythonCommand,
            [
              scriptPath,
              "--host",
              SIDECAR_HOST,
              "--port",
              String(port),
              "--token",
              token
            ],
            {
              cwd: runtime.processRef.cwd?.(),
              env: runtime.processRef.env,
              detached: true,
              stdio: "ignore"
            } as Record<string, unknown>
          )
          ?.unref?.();

        const session: SidecarSession = {
          baseUrl: `http://${SIDECAR_HOST}:${port}`,
          token,
          port,
          pythonCommand
        };
        if (await waitForHealth(session)) {
          return session;
        }
      } catch {}
    }

    return null;
  }

  private async requestJson<T>(
    session: SidecarSession,
    route: string,
    init: RequestInit = {}
  ): Promise<T> {
    if (typeof fetch !== "function") {
      throw new AutoReelSidecarUnavailableError("This runtime does not expose fetch(), so the local analysis sidecar cannot be reached.");
    }

    const response = await fetch(`${session.baseUrl}${route}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
        ...(init.headers ?? {})
      }
    });

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      throw new AutoReelSidecarUnavailableError(message || `Sidecar request failed with ${response.status}.`);
    }

    return response.json() as Promise<T>;
  }
}

export function mapSidecarHealthResponse(
  healthPayload: unknown,
  capabilitiesPayload: unknown,
  baseUrl?: string
): AutoReelSidecarHealth {
  const health = isRecord(healthPayload) ? healthPayload : {};
  const capabilities = isRecord(capabilitiesPayload) ? capabilitiesPayload : {};
  const localhostOnly = health.bind === SIDECAR_HOST || capabilities.bind === SIDECAR_HOST;
  const status = typeof health.status === "string" ? health.status : "unavailable";
  const available = status === "ok" && localhostOnly;
  const capabilityList = Array.isArray(capabilities.features)
    ? capabilities.features.filter((value): value is string => typeof value === "string")
    : [];

  return {
    available,
    status: available ? "available" : "unavailable",
    baseUrl,
    version: typeof capabilities.version === "string" ? capabilities.version : typeof health.version === "string" ? health.version : undefined,
    pythonVersion: typeof capabilities.python_version === "string" ? capabilities.python_version : undefined,
    capabilities: capabilityList,
    reason: available
      ? undefined
      : typeof health.reason === "string"
        ? health.reason
        : "Local analysis sidecar did not report a localhost-only healthy state."
  };
}

function resolveRuntimeModules(): RuntimeModules {
  return {
    childProcess: resolveModule<RuntimeModules["childProcess"]>("child_process"),
    fs: resolveModule<RuntimeModules["fs"]>("fs"),
    path: resolveModule<RuntimeModules["path"]>("path"),
    processRef:
      typeof process !== "undefined"
        ? process
        : (typeof globalThis !== "undefined" ? (globalThis as { process?: RuntimeModules["processRef"] }).process ?? null : null)
  };
}

function resolveModule<T>(name: string): T | null {
  const requireFn =
    (typeof globalThis !== "undefined" ? (globalThis as { require?: (id: string) => unknown }).require : undefined) ||
    (typeof window !== "undefined" ? (window as { require?: (id: string) => unknown }).require : undefined);

  if (typeof requireFn !== "function") {
    return null;
  }

  try {
    return requireFn(name) as T;
  } catch {
    return null;
  }
}

function resolveSidecarScript(runtime: RuntimeModules): string | null {
  const cwd = runtime.processRef?.cwd?.();
  if (!cwd || !runtime.path || !runtime.fs) {
    return null;
  }

  const scriptPath = runtime.path.join(cwd, "analysis-sidecar", "server.py");
  return runtime.fs.existsSync(scriptPath) ? scriptPath : null;
}

function canRunCommand(runtime: RuntimeModules, command: string): boolean {
  if (!runtime.childProcess) {
    return false;
  }

  try {
    const result = runtime.childProcess.spawnSync(command, ["--version"], { stdio: "ignore" } as Record<string, unknown>);
    return result.status === 0;
  } catch {
    return false;
  }
}

async function waitForHealth(session: SidecarSession): Promise<boolean> {
  const startedAt = Date.now();
  while (Date.now() - startedAt <= SIDECAR_START_TIMEOUT_MS) {
    try {
      const response = await fetch(`${session.baseUrl}/health`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.token}`
        }
      });
      if (response.ok) {
        return true;
      }
    } catch {}
    await delay(200);
  }
  return false;
}

function createRandomToken(): string {
  const cryptoRef = typeof globalThis !== "undefined" ? (globalThis as { crypto?: Crypto }).crypto : undefined;
  if (cryptoRef?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoRef.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
}

function uniqueStrings(values: Array<string | undefined>): string[] {
  return values.filter((value, index, list): value is string =>
    typeof value === "string" && value.length > 0 && list.indexOf(value) === index
  );
}

function isTerminalExtractionStatus(status: unknown): boolean {
  return status === "completed" || status === "cancelled" || status === "failed" || status === "sidecar-unavailable";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function delay(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}
