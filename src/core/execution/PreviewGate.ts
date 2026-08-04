import { RKCommand } from "../../types/Command";

type PreviewListener = (request: PreviewRequest | null) => void;

export interface PreviewRequest {
  id: string;
  commands: RKCommand[];
  summary: string;
}

interface PendingPreview extends PreviewRequest {
  resolve: (approved: boolean) => void;
}

const listeners = new Set<PreviewListener>();
let activePreview: PendingPreview | null = null;

export async function requestExecutionPreview(commands: RKCommand[]): Promise<boolean> {
  if (commands.length === 0) {
    return true;
  }

  if (activePreview !== null) {
    throw new Error("Another Premiere preview confirmation is already pending.");
  }

  return new Promise<boolean>((resolve) => {
    activePreview = {
      id: `preview-${Date.now()}`,
      commands,
      summary: summarizeCommands(commands),
      resolve
    };
    emit();
  });
}

export function getActivePreview(): PreviewRequest | null {
  if (activePreview === null) {
    return null;
  }

  const { id, commands, summary } = activePreview;
  return { id, commands, summary };
}

export function subscribeExecutionPreview(listener: PreviewListener) {
  listeners.add(listener);
  listener(getActivePreview());

  return () => {
    listeners.delete(listener);
  };
}

export function approveExecutionPreview() {
  settle(true);
}

export function rejectExecutionPreview() {
  settle(false);
}

function settle(approved: boolean) {
  if (activePreview === null) {
    return;
  }

  const request = activePreview;
  activePreview = null;
  request.resolve(approved);
  emit();
}

function emit() {
  const snapshot = getActivePreview();
  listeners.forEach((listener) => listener(snapshot));
}

function summarizeCommands(commands: RKCommand[]) {
  if (commands.length === 1) {
    return commands[0].action;
  }

  return `${commands.length} Premiere actions`;
}
