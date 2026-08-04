import { MemoryEngine } from "../../core/brain";
import { TimelineState } from "../../types/Timeline";

const memory = new MemoryEngine();
const SCOPE = "team-workspace";
const KEY = "local-review";

export type ReviewStatus = "Pending" | "Approved" | "Changes Requested";

export interface ClipComment {
  id: string;
  sequenceKey: string;
  clipId: string;
  author: string;
  text: string;
  createdAt: string;
  status: ReviewStatus;
}

export interface SequenceVersion {
  id: string;
  sequenceKey: string;
  sequenceName: string;
  createdAt: string;
  status: ReviewStatus;
  note: string;
  snapshot: TimelineState;
}

export interface TeamWorkspaceSnapshot {
  comments: ClipComment[];
  versions: SequenceVersion[];
}

export function loadWorkspace(): TeamWorkspaceSnapshot {
  return (
    memory.getAnalysis<TeamWorkspaceSnapshot>(SCOPE, KEY) ?? {
      comments: [],
      versions: []
    }
  );
}

export function saveComment(comment: Omit<ClipComment, "id" | "createdAt">) {
  const snapshot = loadWorkspace();
  snapshot.comments = [
    {
      ...comment,
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: new Date().toISOString()
    },
    ...snapshot.comments
  ];
  persist(snapshot);
}

export function updateCommentStatus(commentId: string, status: ReviewStatus) {
  const snapshot = loadWorkspace();
  snapshot.comments = snapshot.comments.map((comment) =>
    comment.id === commentId ? { ...comment, status } : comment
  );
  persist(snapshot);
}

export function saveVersion(args: {
  sequenceKey: string;
  sequenceName: string;
  status: ReviewStatus;
  note: string;
  snapshot: TimelineState;
}) {
  const workspace = loadWorkspace();
  workspace.versions = [
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      ...args,
      createdAt: new Date().toISOString()
    },
    ...workspace.versions
  ];
  persist(workspace);
}

export function updateVersionStatus(versionId: string, status: ReviewStatus) {
  const snapshot = loadWorkspace();
  snapshot.versions = snapshot.versions.map((version) =>
    version.id === versionId ? { ...version, status } : version
  );
  persist(snapshot);
}

export function buildReviewExport(sequenceKey: string) {
  const snapshot = loadWorkspace();
  return {
    exportedAt: new Date().toISOString(),
    localOnly: true,
    sequenceKey,
    comments: snapshot.comments.filter((comment) => comment.sequenceKey === sequenceKey),
    versions: snapshot.versions.filter((version) => version.sequenceKey === sequenceKey)
  };
}

export function buildReviewMarkdown(sequenceKey: string) {
  const data = buildReviewExport(sequenceKey);
  const lines = [
    "# RK Flow Team Workspace Review",
    "",
    `Sequence Key: ${sequenceKey}`,
    `Exported At: ${data.exportedAt}`,
    "Mode: LOCAL-ONLY (no real-time sync)",
    "",
    "## Comments"
  ];

  if (data.comments.length === 0) {
    lines.push("- None");
  } else {
    for (const comment of data.comments) {
      lines.push(`- [${comment.status}] ${comment.author} on ${comment.clipId}: ${comment.text}`);
    }
  }

  lines.push("", "## Versions");

  if (data.versions.length === 0) {
    lines.push("- None");
  } else {
    for (const version of data.versions) {
      lines.push(
        `- [${version.status}] ${version.sequenceName} @ ${version.createdAt} (${flattenClipCount(version.snapshot)} clips)${version.note ? ` — ${version.note}` : ""}`
      );
    }
  }

  return lines.join("\n");
}

export function compareVersions(left: SequenceVersion, right: SequenceVersion) {
  const leftIds = flattenClipIds(left.snapshot);
  const rightIds = flattenClipIds(right.snapshot);

  return {
    added: rightIds.filter((id) => !leftIds.includes(id)),
    removed: leftIds.filter((id) => !rightIds.includes(id)),
    leftClipCount: leftIds.length,
    rightClipCount: rightIds.length
  };
}

function flattenClipIds(snapshot: TimelineState) {
  return [...snapshot.videoTracks, ...snapshot.audioTracks].flatMap((track) =>
    track.clips.map((clip) => `${track.type}:${track.id}:${clip.id}:${clip.start.toFixed(3)}:${clip.end.toFixed(3)}`)
  );
}

function flattenClipCount(snapshot: TimelineState) {
  return flattenClipIds(snapshot).length;
}

function persist(snapshot: TeamWorkspaceSnapshot) {
  memory.setAnalysis(SCOPE, KEY, snapshot);
}
