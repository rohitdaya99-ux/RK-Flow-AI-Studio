import { useMemo, useState } from "react";
import { MusicAnalysisResult } from "../../core/brain/types";
import { AutoEditAssembler } from "../auto-edit/AutoEditAssembler";
import {
  analyzePromptReelSelection,
  generatePromptReelPlan,
  getPromptReelMusicOptions,
  inspectPromptReelAnalysis
} from "./promptReelService";
import { PromptReelAnalysisStatus, ReelPlan } from "./types";
import { Button, Card, ProgressBar, StatusChip, Textarea } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";
import { analyzeAndCacheMusicFile } from "../music-ai/musicAnalysisCache";

const assembler = new AutoEditAssembler();

export default function PromptReelScreen() {
  const [prompt, setPrompt] = useState("bhai mast reel bana, bride entry aur varmala pe focus karo, 60 second ka");
  const [useSelectedClips, setUseSelectedClips] = useState(true);
  const [plan, setPlan] = useState<ReelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [assembling, setAssembling] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLabel, setProgressLabel] = useState("Enter a creative prompt and generate a reel plan.");
  const [error, setError] = useState("");
  const [analysisStatus, setAnalysisStatus] = useState<PromptReelAnalysisStatus | null>(null);
  const [musicOptions, setMusicOptions] = useState<MusicAnalysisResult[]>(() => getPromptReelMusicOptions());
  const [selectedMusicHash, setSelectedMusicHash] = useState(() => getPromptReelMusicOptions()[0]?.fileHash ?? "");
  const [songLoading, setSongLoading] = useState(false);
  const activeSelectionMode = plan?.selectionMode ?? analysisStatus?.selectionMode;
  const hasPrompt = prompt.trim().length > 0;
  const selectedMusic = musicOptions.find((entry) => entry.fileHash === selectedMusicHash) ?? null;

  const activeModeLabel = useMemo(() => {
    if (activeSelectionMode === "selected") {
      return "Using selected clips";
    }

    if (activeSelectionMode === "sequence-fallback") {
      return "No selection found. Fell back to all clips in sequence";
    }

    if (activeSelectionMode === "sequence") {
      return "Using all clips in sequence";
    }

    return useSelectedClips ? "Selected clips preferred" : "All clips in sequence";
  }, [activeSelectionMode, useSelectedClips]);

  async function handleGenerate(skipMemory = false, allowGeneric = false) {
    if (!prompt.trim()) {
      setError("Enter a creative prompt before generating.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan(null);
    setProgressPercent(20);
    setProgressLabel("Reading Premiere context and cached analysis...");

    try {
      const nextAnalysisStatus = await inspectPromptReelAnalysis({ useSelectedClips, musicFileHash: selectedMusicHash || undefined });
      setAnalysisStatus(nextAnalysisStatus);

      if (nextAnalysisStatus.needsAnalysis && !allowGeneric) {
        setProgressPercent(0);
        setProgressLabel("Analysis is missing for most active clips. Analyze now or continue with a generic plan.");
        return;
      }

      setProgressPercent(35);
      setProgressLabel("Building a reel plan from Premiere context and cached analysis...");
      const result = await generatePromptReelPlan({
        prompt: prompt.trim(),
        useSelectedClips,
        skipMemory,
        musicFileHash: selectedMusicHash || undefined
      });

      setPlan(result.plan);
      setProgressLabel(`Plan ready via ${result.plan.resolutionPath}. Assembling a new sequence automatically...`);
      setLoading(false);
      await handleAssembly(result.plan);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not generate a prompt reel.");
      setPlan(null);
      setProgressPercent(0);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyzeNow() {
    setAnalyzing(true);
    setError("");
    setPlan(null);
    setProgressPercent(0);
    setProgressLabel("Starting Wedding AI, Emotion AI, and Clip Intelligence for the active clips...");

    try {
      const nextAnalysisStatus = await analyzePromptReelSelection({
        useSelectedClips,
        onProgress: (next) => {
          setProgressPercent(next.percent);
          setProgressLabel(next.label);
        }
      });
      setAnalysisStatus(await inspectPromptReelAnalysis({ useSelectedClips, musicFileHash: selectedMusicHash || undefined }));
      setProgressPercent(100);
      setProgressLabel(
        nextAnalysisStatus.needsAnalysis
          ? "Core analysis finished, but some active clips are still missing signals. You can generate anyway."
          : "Core analysis complete. Generate Reel to build an informed preview."
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not analyze the active clips.");
      setProgressPercent(0);
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSongFile(file: File | null) {
    if (!file) {
      return;
    }

    setSongLoading(true);
    setError("");
    setPlan(null);
    setProgressPercent(10);
    setProgressLabel("Analyzing selected song for beat and energy data...");

    try {
      const result = await analyzeAndCacheMusicFile(file, (next) => {
        setProgressLabel(next.label);
        if (next.percent !== undefined) {
          setProgressPercent(next.percent);
        }
      });
      const options = getPromptReelMusicOptions();
      setMusicOptions(options);
      setSelectedMusicHash(result.fileHash);
      setAnalysisStatus(null);
      setProgressPercent(100);
      setProgressLabel(`Song analysis ready: ${result.fileName}. It will weight the next reel plan.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not analyze the selected song.");
      setProgressPercent(0);
    } finally {
      setSongLoading(false);
    }
  }

  async function handleAssembly(planToAssemble: ReelPlan) {
    setAssembling(true);
    setError("");
    setProgressPercent(0);
    setProgressLabel("Submitting reel plan through the live Premiere executor...");

    try {
      const message = await assembler.assembleReelPlan(planToAssemble, { learnedFrom: "Prompt Reel" }, (next) => {
        setProgressPercent(next.percent);
        setProgressLabel(`${next.label} (${next.completed}/${next.total})`);
      });
      setProgressPercent(100);
      setProgressLabel(message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not assemble the reel.");
    } finally {
      setAssembling(false);
    }
  }

  function removeClip(clipId: string) {
    setPlan((current) => {
      if (!current) {
        return current;
      }

      const clips = current.clips.filter((clip) => clip.clipId !== clipId);
      return {
        ...current,
        clips,
        totalDurationSeconds: clips.reduce((sum, clip) => sum + clip.durationSeconds, 0)
      };
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Prompt Reel" subtitle="Free-text reel planning from Premiere selection, with cached AI analysis and automatic new-sequence assembly.">
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
          <StatusChip label={loading ? "Planning" : assembling ? "Assembling" : "Ready"} tone={loading || assembling ? "warning" : "success"} />
          {analyzing && <StatusChip label="Analyzing clips" tone="warning" />}
          {songLoading && <StatusChip label="Analyzing song" tone="warning" />}
          <StatusChip label={activeModeLabel} tone={activeSelectionMode === "sequence-fallback" ? "warning" : "neutral"} />
          <StatusChip label={selectedMusic ? `Song: ${selectedMusic.fileName}` : "No song energy"} tone={selectedMusic ? "success" : "neutral"} />
          {plan && <StatusChip label={`Plan via ${plan.resolutionPath}`} tone={plan.resolutionPath === "gemini" ? "warning" : "success"} />}
        </div>

        <div style={{ marginTop: spacing.md, display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
          <label htmlFor="prompt-reel-song" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
            Song energy
          </label>
          <select
            id="prompt-reel-song"
            value={selectedMusicHash}
            onChange={(event) => {
              setSelectedMusicHash(event.target.value);
              setPlan(null);
              setAnalysisStatus(null);
            }}
            disabled={songLoading || loading || analyzing || assembling}
          >
            <option value="">No song selected</option>
            {musicOptions.map((entry) => (
              <option key={entry.fileHash} value={entry.fileHash}>
                {entry.fileName} ({entry.bpm} BPM)
              </option>
            ))}
          </select>
          <label style={{ color: colors.inkMuted, fontSize: 13 }}>
            Analyze a song
            <input
              type="file"
              accept="audio/*"
              onChange={(event) => void handleSongFile(event.target.files?.[0] ?? null)}
              disabled={songLoading || loading || analyzing || assembling}
              style={{ marginLeft: spacing.xs }}
            />
          </label>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm, marginTop: spacing.md }}>
          <label htmlFor="prompt-reel-input" style={{ color: colors.maroonDeep, fontWeight: 700 }}>
            Creative prompt
          </label>
          <Textarea
            id="prompt-reel-input"
            rows={5}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            aria-describedby="prompt-reel-help"
            aria-invalid={!hasPrompt}
            placeholder="Example: bhai mast reel bana, bride entry aur varmala pe focus karo, 60 second ka"
          />
          <div id="prompt-reel-help" style={{ color: hasPrompt ? colors.inkMuted : colors.danger, fontSize: 13 }}>
            {hasPrompt
              ? "Describe the moments, mood, and target duration you want."
              : "Enter a creative prompt to enable reel generation."}
          </div>
        </div>

        <label
          style={{
            marginTop: spacing.md,
            display: "inline-flex",
            gap: spacing.sm,
            alignItems: "center",
            color: colors.ink
          }}
        >
          <input
            type="checkbox"
            checked={useSelectedClips}
            onChange={(event) => {
              setUseSelectedClips(event.target.checked);
              setAnalysisStatus(null);
              setPlan(null);
            }}
          />
          Use selected clips first
        </label>

        <div style={{ marginTop: spacing.md, display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
          <Button onClick={() => void handleGenerate(false)} disabled={!hasPrompt || loading || analyzing || assembling}>
            {loading ? "Planning..." : "Generate Reel"}
          </Button>
          <Button variant="secondary" onClick={() => void handleGenerate(true)} disabled={!hasPrompt || loading || analyzing}>
            Regenerate
          </Button>
          <Button variant="secondary" onClick={() => setPlan(null)} disabled={loading || analyzing || !plan}>
            Clear Preview
          </Button>
        </div>

        {analysisStatus?.needsAnalysis && (
          <div
            role="alert"
            style={{
              marginTop: spacing.md,
              border: `1px solid ${colors.warning}`,
              borderRadius: 12,
              background: colors.panelMuted,
              padding: spacing.md,
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
              color: colors.ink
            }}
          >
            <strong style={{ color: colors.maroonDeep }}>{analysisStatus.message}</strong>
            <div style={{ color: colors.inkMuted, fontSize: 13 }}>
              Coverage: {analysisStatus.analyzedClipCount}/{analysisStatus.clipCount} active video clips. Wedding AI {analysisStatus.weddingClipCount}/{analysisStatus.clipCount}, Emotion AI {analysisStatus.emotionClipCount}/{analysisStatus.clipCount}, Clip Intelligence {analysisStatus.clipIntelligenceClipCount}/{analysisStatus.clipCount}. Music AI: {formatMusicStatus(analysisStatus.musicStatus)}.
            </div>
            <div style={{ color: colors.inkMuted, fontSize: 13 }}>
              Analyze now runs Wedding AI, Emotion AI, and Clip Intelligence for this clip set. Music AI needs a selected audio file in its own screen before it can contribute an energy curve.
            </div>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <Button onClick={() => void handleAnalyzeNow()} disabled={loading || analyzing || assembling}>
                {analyzing ? "Analyzing..." : "Analyze now"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => void handleGenerate(false, true)}
                disabled={!hasPrompt || loading || analyzing || assembling}
              >
                Generate anyway
              </Button>
            </div>
          </div>
        )}

        {(loading || analyzing || assembling || progressPercent > 0) && (
          <div style={{ marginTop: spacing.md }}>
            <ProgressBar value={progressPercent} label={progressLabel} />
          </div>
        )}

        {error && (
          <div style={{ marginTop: spacing.md, color: colors.danger }}>
            {error}
          </div>
        )}
      </Card>

      {plan && (
        <>
          <Card title={plan.title} subtitle={plan.intentSummary}>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
              <StatusChip label={`${plan.clips.length} clips`} tone="success" />
              <StatusChip label={`${plan.totalDurationSeconds.toFixed(1)}s total`} />
              <StatusChip label={`${plan.targetDurationSeconds.toFixed(0)}s target`} tone="warning" />
              <StatusChip label={plan.templateName} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, marginTop: spacing.md, color: colors.inkMuted }}>
              {plan.notes.map((note, index) => (
                <div key={`${index}-${note.slice(0, 18)}`}>{note}</div>
              ))}
              {plan.durationQualityWarning && (
                <div style={{ color: colors.warning }}>{plan.durationQualityWarning} A warning was added to Developer Center logs.</div>
              )}
            </div>
          </Card>

          <Card title="Preview Clip Order" subtitle="The plan remains visible while it assembles into a new Premiere sequence.">
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {plan.clips.map((clip, index) => (
                <div
                  key={clip.clipId}
                  style={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: 12,
                    background: colors.white,
                    padding: spacing.md,
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.sm
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap", alignItems: "center" }}>
                    <div>
                      <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>
                        {index + 1}. {clip.clipName}
                      </div>
                      <div style={{ color: colors.inkMuted, fontSize: 13 }}>
                        {clip.start.toFixed(1)}s - {clip.end.toFixed(1)}s source • {clip.durationSeconds.toFixed(1)}s in reel
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap", alignItems: "center" }}>
                      <StatusChip label={clip.shotType} />
                      <StatusChip label={`Score ${clip.selectionScore.toFixed(2)}`} tone="success" />
                      <Button variant="ghost" onClick={() => removeClip(clip.clipId)} disabled={assembling}>
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div style={{ color: colors.ink }}>{clip.reason}</div>
                  <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
                    <StatusChip label={`Emotion ${clip.emotionWeight.toFixed(2)}`} />
                    <StatusChip label={`Music ${clip.musicEnergyWeight.toFixed(2)}`} />
                    <StatusChip label={`Shot ${clip.shotWeight.toFixed(2)}`} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: spacing.md, display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <div style={{ alignSelf: "center", color: assembling ? colors.maroonDeep : colors.inkMuted }}>
                {assembling ? "Assembling new sequence..." : "Plans assemble automatically into a new sequence."}
              </div>
              <Button variant="secondary" onClick={() => void handleGenerate(true)} disabled={loading || analyzing}>
                Regenerate Plan
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function formatMusicStatus(status: PromptReelAnalysisStatus["musicStatus"]) {
  if (status === "available") {
    return "a single cached song is available";
  }

  if (status === "ambiguous") {
    return "multiple cached songs are not bound to this sequence";
  }

  return "no cached song analysis";
}
