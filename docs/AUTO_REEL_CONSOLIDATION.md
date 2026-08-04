# Auto Reel Consolidation Audit

Status: Phase 0 audit only. No retirement candidate in this document has been deleted or rewired.

## Active Auto Reel Path

```text
AppShell
  -> PromptReelScreen
  -> ContextEngine + ClipManager
  -> cached perception results + AICopilot
  -> local planner or Gemini structured ReelPlan
  -> AutoEditAssembler
  -> PremiereExecutor.runNewSequenceAssembly
  -> ExecutionQueue
  -> ActionDispatcher
  -> CommandExecutor
  -> PremiereBridge
```

The `prompt-reel` route in `src/layout/AppShell.tsx` renders
`src/features/prompt-reel/index.tsx`. Prompt Reel is the active free-text reel
planner. It creates a plan and then calls `AutoEditAssembler`.

`src/components/AutoEditComponent.tsx` is the active `auto-edit` screen. It
uses template duration and selected timeline clips, then calls the same
assembler. `src/features/ai-director/DecisionEngine.ts` also calls the same
assembler.

The only active Premiere mutation path for these flows is:

```text
PremiereExecutor -> ExecutionQueue -> ActionDispatcher -> CommandExecutor -> PremiereBridge
```

`PremiereBridge` creates and activates a new sequence, resolves project items,
and uses `SequenceEditor.createInsertProjectItemAction` in a project transaction.

## Phase 1 Domain Model

The active Auto Reel domain boundary now lives in `src/features/auto-reel/`:

- `models.ts` defines the strict job, request, media, perception, score, story,
  plan, revision, and execution-report contracts, plus the permitted job-state
  transitions.
- `validation.ts` validates requests before work begins, plans returned across the
  AI boundary, execution reports returned from the Premiere bridge boundary, and
  persisted jobs before they are resumed.
- `AutoReelJobMemory.ts` persists only resumable job metadata through the existing
  `MemoryEngine` keyspace. It is not a second persistence system.
- `compatibility.ts` converts the new domain `ReelPlan` to the existing Prompt Reel
  plan shape consumed by `AutoEditAssembler`. The current `prompt-reel/types.ts`
  contract remains active until a later approved migration phase.

Phase 1 does not alter the Prompt Reel UI, current planner, or the shared Premiere
execution path.

## Current Host Evidence

The following has been manually verified in Premiere during the current project
history:

- UXP panel loading and module routing.
- Active sequence and selected-clip reading.
- New sequence creation and activation.
- Prompt Reel local-plan assembly with two successful clip insert actions.
- Direct UXP inspection of the generated sequence found three V1 track items at
  `0-2.920s`, `2.920-7.758s`, and `7.758-9.676s`.

The later no-confirm new-sequence assembly path compiles but has not yet been
retested in a live UXP context. Gemini detailed-prompt execution is unverified
because the configured free-tier quota was exhausted.

## Active Files To Extend

| Area | Active files | Phase 0 decision |
| --- | --- | --- |
| Auto Reel UI | `src/features/prompt-reel/index.tsx`, `promptReelService.ts`, `types.ts` | Migrate into an Auto Reel workspace incrementally; retain Prompt Reel as a compatibility route until complete. |
| Assembly | `src/features/auto-edit/AutoEditAssembler.ts` | Reuse as the only new-sequence assembly adapter. |
| Host reads | `src/premiere/PremiereBridge.ts`, `src/premiere/TimelineReader.ts`, `src/core/brain/ContextEngine.ts` | Extend only with verified metadata and stable IDs. |
| Planning/cache | `src/core/brain/MemoryEngine.ts`, `src/core/brain/types.ts`, `src/ai/copilot/AICopilot.ts` | Add typed AutoReel job state and serializable plan revisions. |
| Existing analysis boundary | `src/features/perception/**`, `src/services/premiere/FrameExtractor.ts` | Replace metadata-only behavior with explicitly labelled sidecar adapters; do not claim host extraction before verification. |
| Navigation | `src/layout/AppShell.tsx` | Make only the minimal route/import change required for the new workspace. |
| New work | `src/features/auto-reel/**`, `analysis-sidecar/**`, `docs/AUTO_REEL_STATUS.md` | Add in later approved phases. |

## Retirement Candidates

| System | Files | Evidence | Phase 0 action |
| --- | --- | --- | --- |
| Placeholder reel stack | `src/premiere/reels/ReelPlanner.ts`, `story/StoryBuilder.ts`, `music/BeatAnalyzer.ts`, `face/FaceMatcher.ts`, `quality/QualityAnalyzer.ts`, `scoring/ClipScorer.ts`, `workflows/WeddingWorkflow.ts` | No imports outside this legacy tree. Values include fixed BPM, 100% face confidence, and fixed quality scores. | Keep untouched; mark deprecated after migration. |
| Random analysis services | `src/services/clipAnalysisService.ts`, `musicAnalysisService.ts`, `transitionService.ts` | No active imports. Uses random scores or static transition lists. | Keep untouched; do not use for Auto Reel. |
| Legacy command stack | `src/commands/executor/CommandExecutor.ts`, `src/commands/dispatcher/CommandDispatcher.ts`, `src/commands/registry/**`, `src/commands/validator/**` | Uses legacy `CommandRequest` intents; not the active Auto Reel executor. | Keep untouched; document and retire only after broader command audit. |
| Duplicate readers | `src/services/premiere/timeline/TimelineReader.ts`, `src/premiere/readers/**`, `src/core/premiere/**` | Not used by the active Auto Reel route. | Do not use or delete in Phase 0. |
| Duplicate screens | `src/components/ReferenceAIComponent.tsx`, `src/components/AIDirectorPanel.tsx`, `src/features/auto-edit/AutoEdit.tsx` | AppShell routes feature screens or `AutoEditComponent`, not these files. | Keep untouched; record for later UI cleanup. |
| Separate MCP product | `premiere-mcp-bridge/**` | Separate CEP/MCP package and manifest; not imported by the UXP app. | Treat as verified API research only. Do not integrate a second transport. |

## Placeholder And Fallback Inventory

| Feature | Actual current behavior | Required status label |
| --- | --- | --- |
| Wedding AI | Gemini structured classification from clip names, durations, track positions. | Metadata-only. |
| Face AI | Attempts Gemini Vision only when `FrameExtractor` succeeds; otherwise metadata fallback. No reference photos or embeddings. | Implemented but unverified visual path; metadata fallback. |
| Emotion/Camera AI | Same optional frame path, otherwise Gemini metadata classification. | Implemented but unverified visual path; metadata fallback. |
| Clip Intelligence | Metadata-derived technical score when frame extraction is unavailable. | Metadata-only fallback. |
| Music AI | Browser waveform energy and heuristic BPM; fixed-ratio sections; Gemini labels from file metadata. | Implemented but unverified in live file picker. |
| Story/transition planning | Prompt heuristics and template constants. | Placeholder planning, not AI wedding story building. |
| Reference AI | Gemini prompt about URL text; no URL media download or local reference-frame extraction. | Metadata/reference-only. |
| Motion, color, audio, SFX | Several PremiereBridge actions explicitly return unsupported. | Placeholder or suggestion-only. |

## Files Protected During Auto Reel Work

- `src/core/execution/**`, `src/commands/CommandExecutor.ts`, and the transaction
  semantics in `src/premiere/PremiereBridge.ts` remain the single execution path.
  Later changes must be additive, justified by a verified API, and manually tested.
- `src/ui/theme/**` and unrelated module styling must retain the existing visual
  language.
- `manifest.json`, `index.html`, `main.js`, and `dist/**` must not be manually
  edited. `dist/**` is webpack output only.
- `premiere-mcp-bridge/**` must not be copied into the UXP bundle or used as a
  second runtime pipeline.
- Retirement candidates remain untouched until an approved post-migration deletion
  phase.

## Security Scan

Phase 0 searched tracked project content, excluding generated bundles and
`node_modules`, for Gemini/API keys, private-key blocks, and common secret
assignments. No matching hardcoded secret was found.

The current application does store the user-provided Gemini key in browser
`localStorage`; this is a local configuration decision, not a hardcoded secret.

## Checkpoint Constraint

The worktree already contains 269 changed paths before this Phase 0 document.
Do not create the required checkpoint commit until the user approves capturing that
existing work, because a repository-wide checkpoint would include unrelated changes.
