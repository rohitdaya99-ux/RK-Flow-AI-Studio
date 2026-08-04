import { useEffect, useMemo, useState } from "react";
import { PremiereBridge } from "../../premiere/PremiereBridge";
import { TimelineState } from "../../types/Timeline";
import { Button, Card, Input, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import {
  buildReviewExport,
  buildReviewMarkdown,
  ClipComment,
  compareVersions,
  loadWorkspace,
  ReviewStatus,
  saveComment,
  saveVersion,
  SequenceVersion,
  updateCommentStatus,
  updateVersionStatus
} from "./teamWorkspaceStore";

const bridge = new PremiereBridge();
const STATUSES: ReviewStatus[] = ["Pending", "Approved", "Changes Requested"];

export default function TeamWorkspaceScreen() {
  const [timeline, setTimeline] = useState<TimelineState | null>(null);
  const [commentText, setCommentText] = useState("");
  const [author, setAuthor] = useState("Rohit");
  const [selectedClipId, setSelectedClipId] = useState("");
  const [workspace, setWorkspace] = useState(loadWorkspace());
  const [versionNote, setVersionNote] = useState("");
  const [versionStatus, setVersionStatus] = useState<ReviewStatus>("Pending");
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  useEffect(() => {
    void bridge.readTimeline().then((next) => setTimeline(next));
  }, []);

  const sequenceKey = timeline?.sequenceName || "No active sequence";
  const allClips = useMemo(
    () => [...(timeline?.videoTracks ?? []), ...(timeline?.audioTracks ?? [])].flatMap((track) =>
      track.clips.map((clip) => ({
        ...clip,
        compoundId: `${track.type}:${track.id}:${clip.id}`,
        label: `${clip.name} • ${track.name} • ${clip.start.toFixed(2)}s-${clip.end.toFixed(2)}s`
      }))
    ),
    [timeline]
  );
  const comments = workspace.comments.filter((comment) => comment.sequenceKey === sequenceKey);
  const versions = workspace.versions.filter((version) => version.sequenceKey === sequenceKey);
  const comparison = useMemo(() => {
    if (selectedCompareIds.length !== 2) {
      return null;
    }

    const left = versions.find((version) => version.id === selectedCompareIds[0]);
    const right = versions.find((version) => version.id === selectedCompareIds[1]);

    return left && right ? { left, right, diff: compareVersions(left, right) } : null;
  }, [selectedCompareIds, versions]);

  function refreshWorkspace() {
    setWorkspace(loadWorkspace());
  }

  function submitComment() {
    if (!selectedClipId || !commentText.trim()) {
      return;
    }

    saveComment({
      sequenceKey,
      clipId: selectedClipId,
      author: author.trim() || "Reviewer",
      text: commentText.trim(),
      status: "Pending"
    });

    setCommentText("");
    refreshWorkspace();
  }

  function snapshotVersion() {
    if (!timeline) {
      return;
    }

    saveVersion({
      sequenceKey,
      sequenceName: timeline.sequenceName,
      status: versionStatus,
      note: versionNote.trim(),
      snapshot: timeline
    });

    setVersionNote("");
    setVersionStatus("Pending");
    refreshWorkspace();
  }

  function toggleCompare(versionId: string) {
    setSelectedCompareIds((current) => {
      if (current.includes(versionId)) {
        return current.filter((id) => id !== versionId);
      }

      if (current.length === 2) {
        return [current[1], versionId];
      }

      return [...current, versionId];
    });
  }

  const exportJson = JSON.stringify(buildReviewExport(sequenceKey), null, 2);
  const exportMarkdown = buildReviewMarkdown(sequenceKey);

  if (!timeline) {
    return <Card title="Team Workspace">Open a sequence to review comments and save local versions.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Team Workspace" subtitle="LOCAL-ONLY review data stored in MemoryEngine. No real-time sync or shared backend is configured.">
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
          <StatusChip label={`Sequence ${timeline.sequenceName}`} tone="success" />
          <StatusChip label={`${allClips.length} clips in snapshot`} />
          <StatusChip label="Local-only collaboration" tone="warning" />
        </div>
      </Card>

      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md, alignItems: "flex-start" }}>
        <Card title="Comments" subtitle="Thread comments against current timeline clips." style={{ flex: "1 1 420px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <Input placeholder="Reviewer name" value={author} onChange={(event) => setAuthor(event.target.value)} />
            <select
              value={selectedClipId}
              onChange={(event) => setSelectedClipId(event.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                color: colors.ink,
                padding: "10px 12px"
              }}
            >
              <option value="">Select clip</option>
              {allClips.map((clip) => (
                <option key={clip.compoundId} value={clip.compoundId}>
                  {clip.label}
                </option>
              ))}
            </select>
            <Input multiline rows={4} placeholder="Add a review note..." value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            <Button onClick={submitComment} disabled={!selectedClipId || !commentText.trim()}>
              Save Comment
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, marginTop: spacing.md }}>
            {comments.length === 0 ? (
              <div style={{ color: colors.inkMuted }}>No comments saved for this sequence yet.</div>
            ) : (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} onStatusChange={(status) => {
                  updateCommentStatus(comment.id, status);
                  refreshWorkspace();
                }} />
              ))
            )}
          </div>
        </Card>

        <Card title="Version History" subtitle="Save and compare local snapshots of the current sequence structure." style={{ flex: "1 1 420px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <select
              value={versionStatus}
              onChange={(event) => setVersionStatus(event.target.value as ReviewStatus)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                color: colors.ink,
                padding: "10px 12px"
              }}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Input
              placeholder="Optional version note"
              value={versionNote}
              onChange={(event) => setVersionNote(event.target.value)}
            />
            <Button onClick={snapshotVersion}>Save Version Snapshot</Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, marginTop: spacing.md }}>
            {versions.length === 0 ? (
              <div style={{ color: colors.inkMuted }}>No local versions saved yet.</div>
            ) : (
              versions.map((version) => (
                <VersionCard
                  key={version.id}
                  version={version}
                  checked={selectedCompareIds.includes(version.id)}
                  onCompareToggle={() => toggleCompare(version.id)}
                  onStatusChange={(status) => {
                    updateVersionStatus(version.id, status);
                    refreshWorkspace();
                  }}
                />
              ))
            )}
          </div>
        </Card>
      </div>

      <Card title="Review Mode Export" subtitle="Portable summary output for another editor to import locally.">
        <div style={{ color: colors.inkMuted, marginBottom: spacing.md }}>
          This is a static local export only. No live shared session or sync transport exists in this repo today.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ color: colors.maroonDeep, fontWeight: 700, marginBottom: spacing.xs }}>JSON</div>
            <pre style={exportStyle}>{exportJson}</pre>
          </div>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ color: colors.maroonDeep, fontWeight: 700, marginBottom: spacing.xs }}>Markdown</div>
            <pre style={exportStyle}>{exportMarkdown}</pre>
          </div>
        </div>
      </Card>

      <Card title="Version Compare" subtitle="Diff the clip structure between two saved local versions.">
        {!comparison ? (
          <div style={{ color: colors.inkMuted }}>Select two versions above to compare them.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>
              {comparison.left.createdAt} → {comparison.right.createdAt}
            </div>
            <div style={{ color: colors.inkMuted }}>
              Clip count: {comparison.diff.leftClipCount} → {comparison.diff.rightClipCount}
            </div>
            <div style={{ color: colors.inkMuted }}>
              Added: {comparison.diff.added.length ? comparison.diff.added.join(", ") : "None"}
            </div>
            <div style={{ color: colors.inkMuted }}>
              Removed: {comparison.diff.removed.length ? comparison.diff.removed.join(", ") : "None"}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function CommentCard({
  comment,
  onStatusChange
}: {
  comment: ClipComment;
  onStatusChange: (status: ReviewStatus) => void;
}) {
  return (
    <div style={boxStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
        <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>{comment.author}</div>
        <StatusPicker value={comment.status} onChange={onStatusChange} />
      </div>
      <div style={{ color: colors.inkMuted, marginTop: spacing.xs }}>{comment.clipId}</div>
      <div style={{ marginTop: spacing.sm }}>{comment.text}</div>
    </div>
  );
}

function VersionCard({
  version,
  checked,
  onCompareToggle,
  onStatusChange
}: {
  version: SequenceVersion;
  checked: boolean;
  onCompareToggle: () => void;
  onStatusChange: (status: ReviewStatus) => void;
}) {
  const clipCount = [...version.snapshot.videoTracks, ...version.snapshot.audioTracks].reduce(
    (count, track) => count + track.clips.length,
    0
  );

  return (
    <div style={boxStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
        <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>
          {version.sequenceName} • {new Date(version.createdAt).toLocaleString()}
        </div>
        <StatusPicker value={version.status} onChange={onStatusChange} />
      </div>
      <div style={{ color: colors.inkMuted, marginTop: spacing.xs }}>
        {clipCount} clips • {version.note || "No note"}
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: spacing.xs, marginTop: spacing.sm }}>
        <input type="checkbox" checked={checked} onChange={onCompareToggle} />
        Compare
      </label>
    </div>
  );
}

function StatusPicker({
  value,
  onChange
}: {
  value: ReviewStatus;
  onChange: (status: ReviewStatus) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as ReviewStatus)}
      style={{
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        background: colors.white,
        color: colors.ink,
        padding: "6px 10px"
      }}
    >
      {STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

const boxStyle = {
  border: `1px solid ${colors.border}`,
  borderRadius: 10,
  background: colors.white,
  padding: spacing.sm
} as const;

const exportStyle = {
  background: colors.white,
  border: `1px solid ${colors.border}`,
  borderRadius: 10,
  padding: spacing.sm,
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-word" as const,
  maxHeight: 240,
  overflow: "auto"
};
