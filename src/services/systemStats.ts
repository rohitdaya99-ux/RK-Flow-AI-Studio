export interface SystemStatsSnapshot {
  gpu: string;
  ram: string;
}

const SHARED_SYSTEM_STATS: SystemStatsSnapshot = {
  gpu: "—",
  ram: "—"
};

export function getSystemStats(): SystemStatsSnapshot {
  return {
    gpu: normalizeSystemStat(SHARED_SYSTEM_STATS.gpu),
    ram: normalizeSystemStat(SHARED_SYSTEM_STATS.ram)
  };
}

function normalizeSystemStat(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "—";
}
