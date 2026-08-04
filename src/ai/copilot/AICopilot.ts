import { MemoryEngine } from "../../core/brain";
import { loggerService } from "../../services/loggerService";
import { PremiereContextSnapshot, PremiereContextSnapshotService } from "../context";
import { getGeminiUsageStats } from "../GeminiService";

export type AICopilotPath = "memory" | "local" | "cache" | "gemini";

export interface AICopilotResolution<T> {
  value: T;
  path: AICopilotPath;
  snapshot: PremiereContextSnapshot;
}

export class AICopilot {
  private readonly memory = new MemoryEngine();
  private readonly snapshotService = new PremiereContextSnapshotService();

  async resolve<T>({
    intent,
    context,
    memoryScopeKey,
    memoryCacheKey = "result",
    skipMemory = false,
    localResolver,
    geminiResolver
  }: {
    intent: string;
    context?: unknown;
    memoryScopeKey?: string;
    memoryCacheKey?: string;
    skipMemory?: boolean;
    localResolver?: (snapshot: PremiereContextSnapshot, context: unknown) => Promise<T | null> | T | null;
    geminiResolver: (snapshot: PremiereContextSnapshot, context: unknown) => Promise<T>;
  }): Promise<AICopilotResolution<T>> {
    const snapshot = await this.snapshotService.capture();

    if (!skipMemory && memoryScopeKey) {
      const cached = this.memory.getAnalysis<T>(memoryScopeKey, memoryCacheKey);

      if (cached !== null) {
        loggerService.log(`[memory] AICopilot resolved ${intent}.`, "info");
        return { value: cached, path: "memory", snapshot };
      }
    }

    if (localResolver) {
      const local = await localResolver(snapshot, context);

      if (local !== null && local !== undefined) {
        if (memoryScopeKey) {
          this.memory.setAnalysis(memoryScopeKey, memoryCacheKey, local);
        }

        loggerService.log(`[local] AICopilot resolved ${intent}.`, "info");
        return { value: local, path: "local", snapshot };
      }
    }

    const before = getGeminiUsageStats().cacheHits;
    const value = await geminiResolver(snapshot, context);
    const after = getGeminiUsageStats().cacheHits;
    const path: AICopilotPath = after > before ? "cache" : "gemini";

    if (memoryScopeKey) {
      this.memory.setAnalysis(memoryScopeKey, memoryCacheKey, value);
    }

    loggerService.log(`[${path}] AICopilot resolved ${intent}.`, path === "gemini" ? "warn" : "info");
    return { value, path, snapshot };
  }
}
