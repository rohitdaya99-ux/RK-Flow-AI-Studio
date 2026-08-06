
import {
  MusicAnalysisRequest,
  MusicAnalysisReport,
  MusicCapabilities,

  AutoReelExtractionResult,
  VisionCapabilities,
  VisionBatchAnalysis,
  EmotionCapabilities,
  EmotionReport,
  FaceCapabilities,
  FaceReport,

} from "./models";

export class AutoReelSidecarAuthError extends Error {
  constructor(message = "Authentication with sidecar failed.") {
    super(message);
    this.name = "AutoReelSidecarAuthError";
  }
}

export class AutoReelSidecarCancelledError extends Error {
  constructor(message = "Sidecar operation was cancelled.") {
    super(message);
    this.name = "AutoReelSidecarCancelledError";
  }
}

export class AutoReelSidecarUnavailableError extends Error {
  constructor(message = "Sidecar is unavailable.") {
    super(message);
    this.name = "AutoReelSidecarUnavailableError";
  }
}

export function isAutoReelSidecarCancelledError(error: unknown): error is AutoReelSidecarCancelledError {
  return error instanceof AutoReelSidecarCancelledError;
}

export function isAutoReelSidecarUnavailableError(error: unknown): error is AutoReelSidecarUnavailableError {
  return error instanceof AutoReelSidecarUnavailableError;
}

export function isAutoReelSidecarAuthError(error: unknown): error is AutoReelSidecarAuthError {
  return error instanceof AutoReelSidecarAuthError;
}

export function mapSidecarHealthResponse(_response: any, _config: any, baseUrl: string): any {
  if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
    return { available: true, reason: "" };
  }
  return { available: false, reason: "Sidecar must be on localhost-only." };
}

export class AutoReelSidecarClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string = "http://127.0.0.1:43191") {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  public async pairSession(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/session`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new AutoReelSidecarUnavailableError(`Pairing failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === "ok" && data.token) {
        this.token = data.token;
      } else {
        throw new AutoReelSidecarUnavailableError("Pairing failed: Invalid session response");
      }
    } catch (e) {
      if (e instanceof AutoReelSidecarUnavailableError) {
        throw e;
      }
      throw new AutoReelSidecarUnavailableError(`Pairing failed: ${(e as Error).message}`);
    }
  }

  public async checkHealth(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new AutoReelSidecarUnavailableError(`Health check failed: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.status !== "ok") {
        throw new AutoReelSidecarUnavailableError("Health check failed: Invalid status");
      }
    } catch (e) {
      if (e instanceof AutoReelSidecarUnavailableError) {
        throw e;
      }
      throw new AutoReelSidecarUnavailableError(`Health check failed: ${(e as Error).message}`);
    }
  }

  private async fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.doFetchWithAuth(endpoint, options, false);
  }

  private async doFetchWithAuth<T>(endpoint: string, options: RequestInit, isRetry: boolean): Promise<T> {
    if (!this.token) {
      await this.pairSession();
    }

    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${this.token}`);
    
    if (options.method === "POST" && options.body) {
      headers.set("Content-Type", "application/json");
    }

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("fetch")) {
        throw new AutoReelSidecarUnavailableError();
      }
      throw error;
    }

    if (!response.ok) {
      if ((response.status === 401 || response.status === 403) && !isRetry) {
        // Token might have expired or sidecar restarted. Retry once.
        this.token = null;
        await this.pairSession();
        return this.doFetchWithAuth(endpoint, options, true);
      } else if (response.status === 401 || response.status === 403) {
        throw new AutoReelSidecarAuthError();
      }

      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { detail: response.statusText };
      }
      throw new Error(
        `Sidecar request failed: ${response.status} ${errorBody.detail || "Unknown error"}`
      );
    }

    return await response.json();
  }

  private async pollJob<T>(
    endpointBase: string,
    request: any,
    options: { signal?: AbortSignal; onProgress?: (payload: any) => void }
  ): Promise<T> {
    const submitResponse = await this.fetchWithAuth<{ jobId: string }>(`${endpointBase}/jobs`, {
      method: "POST",
      body: JSON.stringify(request),
    });
    
    const jobId = submitResponse.jobId;

    while (true) {
      if (options.signal?.aborted) {
        try {
          await this.fetchWithAuth(`${endpointBase}/jobs/${jobId}/cancel`, { method: "POST" });
        } catch (e) {
          console.error(`Failed to cancel job ${jobId}:`, e);
        }
        throw new AutoReelSidecarCancelledError();
      }

      const res = await this.fetchWithAuth<any>(`${endpointBase}/jobs/${jobId}`);
      if (res.status === "completed") {
        return res as T;
      }
      if (res.status === "failed") {
        throw new Error(`Job failed: ${res.error || "Unknown error"}`);
      }
      if (options.onProgress && res.progress) {
        options.onProgress(res.progress);
      }
      
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  async getMusicCapabilities(): Promise<MusicCapabilities> {
    try {
      return await this.fetchWithAuth<MusicCapabilities>("/music/capabilities");
    } catch (error) {
      console.error("Failed to get music capabilities:", error);
      return {
        available: false,
        version: "unknown",
        ffmpegAvailable: false,
        librosaAvailable: false,
        providers: [],
        reason: (error as Error).message,
      };
    }
  }

  async analyzeMusic(request: MusicAnalysisRequest): Promise<MusicAnalysisReport> {
    return this.fetchWithAuth<MusicAnalysisReport>("/music/analyze", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async runExtractionJob(
    request: any,
    options: { signal?: AbortSignal; onProgress?: (payload: any) => void }
  ): Promise<AutoReelExtractionResult> {
    return this.pollJob<AutoReelExtractionResult>("/extraction", request, options);
  }

  async getVisionCapabilities(): Promise<VisionCapabilities> {
    try {
      return await this.fetchWithAuth<VisionCapabilities>("/vision/capabilities");
    } catch (error) {
      console.error("Failed to get vision capabilities:", error);
      return {
        available: false,
        version: "unknown",
        gpuAccelerated: false,
        cpuFallback: false,
        opencvVersion: "unknown",
        numpyVersion: "unknown",
        pillowVersion: "unknown",
        onnxRuntimeProviders: [],
        openVinoAvailable: false,
        modules: [],
        features: [],
        reason: (error as Error).message,
      };
    }
  }

  async runVisionJob(
    request: any,
    options: { signal?: AbortSignal; onProgress?: (payload: any) => void }
  ): Promise<VisionBatchAnalysis> {
    return this.pollJob<VisionBatchAnalysis>("/vision", request, options);
  }

  async getEmotionCapabilities(): Promise<EmotionCapabilities> {
    try {
      return await this.fetchWithAuth<EmotionCapabilities>("/emotion/capabilities");
    } catch (error) {
      console.error("Failed to get emotion capabilities:", error);
      return {
        available: false,
        version: "unknown",
        providers: [],
        reason: (error as Error).message,
      };
    }
  }

  async runEmotionJob(
    request: any,
    options: { signal?: AbortSignal; onProgress?: (payload: any) => void }
  ): Promise<EmotionReport> {
    return this.pollJob<EmotionReport>("/emotion", request, options);
  }

  async getFaceCapabilities(): Promise<FaceCapabilities> {
    try {
      return await this.fetchWithAuth<FaceCapabilities>("/face/capabilities");
    } catch (error) {
      console.error("Failed to get face capabilities:", error);
      return {
        available: false,
        detector: "none",
        landmarksAvailable: false,
        embeddingProviderEnabled: false,
        reason: (error as Error).message,
      };
    }
  }

  async runFaceJob(
    request: any,
    options: { signal?: AbortSignal; onProgress?: (payload: any) => void }
  ): Promise<FaceReport> {
    return this.pollJob<FaceReport>("/face", request, options);
  }
}
