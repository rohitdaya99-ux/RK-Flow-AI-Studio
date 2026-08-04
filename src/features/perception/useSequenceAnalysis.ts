import { useEffect, useMemo, useState } from "react";
import { ContextEngine } from "../../core/brain";
import { AICopilot } from "../../ai/copilot/AICopilot";
import { BrainSequenceContext } from "../../core/brain/types";

const contextEngine = new ContextEngine();
const copilot = new AICopilot();

export interface AnalysisProgressState {
  label: string;
  completed: number;
  total: number;
  percent: number;
}

export type AnalysisProgressInput =
  | string
  | {
      label: string;
      completed?: number;
      total?: number;
      percent?: number;
    };

export function useSequenceAnalysis<T>({
  moduleId,
  analyze
}: {
  moduleId: string;
  analyze: (
    context: BrainSequenceContext,
    onProgress: (progress: AnalysisProgressInput) => void
  ) => Promise<T>;
}) {
  const [context, setContext] = useState<BrainSequenceContext | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<AnalysisProgressState>({
    label: "Reading timeline...",
    completed: 0,
    total: 1,
    percent: 0
  });
  const [error, setError] = useState("");

  const cacheKey = useMemo(
    () => (context ? `${moduleId}:${context.sequenceKey}` : null),
    [context, moduleId]
  );

  async function load(force = false) {
    setLoading(true);
    setError("");
    setProgress({
      label: "Reading timeline...",
      completed: 0,
      total: 1,
      percent: 0
    });

    try {
      const nextContext = await contextEngine.readSequenceContext();
      setContext(nextContext);

      if (!nextContext) {
        setResult(null);
        setLoading(false);
        return;
      }

      const nextCacheKey = `${moduleId}:${nextContext.sequenceKey}`;
      const resolved = await copilot.resolve<T>({
        intent: `${moduleId}:analysis`,
        context: nextContext,
        memoryScopeKey: nextCacheKey,
        memoryCacheKey: "result",
        skipMemory: force,
        geminiResolver: async () =>
          analyze(nextContext, (nextProgress) => {
            setProgress(normalizeProgressInput(nextProgress));
          })
      });
      setResult(resolved.value);
      setProgress({
        label: resolved.path === "memory" ? "Loaded cached analysis from MemoryEngine." : "Analysis complete.",
        completed: 1,
        total: 1,
        percent: 100
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(false);
  }, [moduleId]);

  function clearCache() {
    if (!cacheKey) {
      return;
    }

    const { MemoryEngine } = require("../../core/brain");
    new MemoryEngine().clearAnalysis(cacheKey, "result");
  }

  return {
    context,
    result,
    loading,
    progress,
    error,
    reanalyze: async () => {
      clearCache();
      await load(true);
    }
  };
}

function normalizeProgressInput(input: AnalysisProgressInput): AnalysisProgressState {
  if (typeof input === "string") {
    return {
      label: input,
      completed: 0,
      total: 1,
      percent: 0
    };
  }

  const total = Math.max(1, input.total ?? 1);
  const completed = Math.max(0, Math.min(input.completed ?? 0, total));
  const percent =
    input.percent !== undefined
      ? Math.max(0, Math.min(100, input.percent))
      : Math.round((completed / total) * 100);

  return {
    label: input.label,
    completed,
    total,
    percent
  };
}
