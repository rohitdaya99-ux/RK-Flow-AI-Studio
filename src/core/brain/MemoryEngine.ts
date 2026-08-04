import { MemorySnapshot } from "./types";

const STORAGE_KEY = "rkflow.brain.memory.v2";

export class MemoryEngine {
  load(): MemorySnapshot {
    if (typeof window === "undefined") {
      return this.empty();
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return this.empty();
    }

    try {
      const parsed = JSON.parse(raw) as Partial<MemorySnapshot>;

      return {
        preferences: parsed.preferences ?? {},
        projectFacts: parsed.projectFacts ?? [],
        decisions: parsed.decisions ?? [],
        analysis: parsed.analysis ?? {}
      };
    } catch {
      return this.empty();
    }
  }

  save(snapshot: MemorySnapshot) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

  rememberDecision(decision: string) {
    const snapshot = this.load();
    snapshot.decisions = [decision, ...snapshot.decisions].slice(0, 20);
    this.save(snapshot);
  }

  getPreference(key: string) {
    return this.load().preferences[key];
  }

  setPreference(key: string, value: string) {
    const snapshot = this.load();
    snapshot.preferences[key] = value;
    this.save(snapshot);
  }

  getAnalysis<T>(scopeKey: string, cacheKey: string): T | null {
    const snapshot = this.load();
    const entry = snapshot.analysis[this.composeKey(scopeKey, cacheKey)];
    return entry === undefined ? null : (entry as T);
  }

  setAnalysis<T>(scopeKey: string, cacheKey: string, value: T) {
    const snapshot = this.load();
    snapshot.analysis[this.composeKey(scopeKey, cacheKey)] = value;
    this.save(snapshot);
  }

  clearAnalysis(scopeKey: string, cacheKey?: string) {
    const snapshot = this.load();

    if (cacheKey) {
      delete snapshot.analysis[this.composeKey(scopeKey, cacheKey)];
    } else {
      for (const key of Object.keys(snapshot.analysis)) {
        if (key.startsWith(`${scopeKey}::`)) {
          delete snapshot.analysis[key];
        }
      }
    }

    this.save(snapshot);
  }

  private composeKey(scopeKey: string, cacheKey: string) {
    return `${scopeKey}::${cacheKey}`;
  }

  private empty(): MemorySnapshot {
    return {
      preferences: {},
      projectFacts: [],
      decisions: [],
      analysis: {}
    };
  }
}
