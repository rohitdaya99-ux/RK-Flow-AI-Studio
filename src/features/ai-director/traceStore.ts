type TraceListener = (entries: string[]) => void;

const listeners = new Set<TraceListener>();
let traceEntries: string[] = [];

export function getDirectorTrace(): string[] {
  return [...traceEntries];
}

export function clearDirectorTrace() {
  traceEntries = [];
  emit();
}

export function appendDirectorTrace(entry: string) {
  traceEntries = [...traceEntries, entry];
  emit();
}

export function subscribeDirectorTrace(listener: TraceListener) {
  listeners.add(listener);
  listener(getDirectorTrace());

  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  const snapshot = getDirectorTrace();
  listeners.forEach((listener) => listener(snapshot));
}
