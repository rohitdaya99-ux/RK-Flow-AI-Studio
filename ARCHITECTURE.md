CONTEXT: Phases 1-3 of "RK Flow AI Studio" are complete. Real Premiere execution is 
wired (PremiereExecutor → ExecutionQueue → ActionDispatcher → CommandExecutor → 
PremiereBridge, using seq.insertClip()/seq.overwriteClip() as the proven clip-insertion 
path). All 24 nav items route correctly, render real content (not just headers), and 
a shared ErrorBoundary contains any single-module crash. Manual testing inside a live 
Premiere session confirmed the panel loads, navigates, and does not crash.

HARD RULES FOR THIS SESSION (same as before, still non-negotiable):
1. After EVERY numbered step/module below, run `npm run build` and paste the exact 
   output. Do not proceed until it shows zero errors.
2. NEVER report a feature as "implemented" if the underlying Premiere/host interaction 
   is simulated, mocked, or stubbed. If a real API for something doesn't exist or you 
   can't confirm it, say so explicitly in your summary — do not describe a simulated 
   version as done. This project has been burned by overclaiming before; a smaller 
   honest feature set is strictly preferred over a larger fake one.
3. Before implementing anything that touches Premiere, check premiere-pro-mcp/ 
   (RESEARCH.md, src/tools/*, platform-capabilities.ts) for an already-verified API 
   approach before assuming something isn't possible or inventing a new call.

GOAL OF PHASE 4: production/ops layer — delivery, team features, insight, final 
polish. Lower AI-density than Phase 3, more real-world plumbing (file export, local 
persistence, diagnostics).

═══════════════════════════════════════
MODULE 1 — Asset AI (src/features/asset-ai/)
═══════════════════════════════════════
Smart search across project assets, auto-tagging (reuse Wedding AI segments + Face AI 
+ Emotion AI tags already stored in MemoryEngine — do not re-analyze), duplicate 
finder (reuse Clip Intelligence's pHash results if already computed), collections 
(user-defined groups, persisted via MemoryEngine), and a metadata panel per asset 
(resolution, codec, duration, frame rate — read via existing PremiereAPI/ProjectItem 
methods, real values only).

>>> BUILD-CHECK: npm run build, paste output, 0 errors. <

═══════════════════════════════════════
MODULE 2 — Export AI (src/features/export-ai/)
═══════════════════════════════════════
Presets for Instagram Reel, YouTube Shorts, YouTube Highlight, Facebook, WhatsApp, 
Master Export — each preset is a config object (resolution, aspect ratio, target 
bitrate/format) in src/features/export-ai/presets.ts. Auto-naming convention (define 
a clear, editable naming template, e.g. {sequenceName}_{preset}_{date}). Export queue 
UI showing progress per job.
- Investigate the real Premiere export API (Exporter, EncoderManager — both already 
  visible in the PPRO Constants dump logged earlier in this project) and use it for 
  real if a confirmed working method exists (check premiere-pro-mcp for any 
  export-related tool first). If real programmatic export isn't confirmed-reliable, 
  say so plainly and implement the queue/preset UI with an honest "Export via 
  Premiere's native Media Encoder" hand-off instead of faking a working export button.

>>> BUILD-CHECK: npm run build, paste output, 0 errors. <

═══════════════════════════════════════
MODULE 3 — Team Workspace (src/features/team-workspace/)
═══════════════════════════════════════
Scope this realistically for a local CEP/UXP plugin with no backend server: 
- Comments on clips/timeline: store as local structured data in MemoryEngine, keyed 
  per clip/sequence, with a simple comment thread UI.
- Review mode: a read-only shareable summary view (can export as JSON/markdown) that 
  another user could import.
- Version history: snapshot the current sequence structure (clip list, order, 
  in/outs) into MemoryEngine on demand ("Save version"), with a way to view/compare 
  past snapshots.
- Approval workflow: simple status field per version/comment (Pending/Approved/
  Changes Requested), locally stored.
Be explicit in the UI and in your summary that this is LOCAL-ONLY (no real-time 
multi-user sync) unless you find a genuine lightweight sync mechanism already set up 
in this repo — do not imply real-time collaboration if it's actually just local 
storage.

>>> BUILD-CHECK: npm run build, paste output, 0 errors. <

═══════════════════════════════════════
MODULE 4 — Analytics (src/features/analytics/)
═══════════════════════════════════════
GPU/CPU usage, timeline performance, AI usage stats (count/cost of GeminiService calls 
— add simple call-counting/logging inside GeminiService if not already tracked), 
render performance. Feed the SAME real numbers already wired into the Phase-1 status 
bar (GPU/RAM) — don't build a second data source. Where GPU/CPU genuinely aren't 
obtainable via UXP host APIs, keep showing "—" as Phase 1 already does, consistent 
with that earlier honest choice — don't fabricate numbers here either.

>>> BUILD-CHECK: npm run build, paste output, 0 errors. <

═══════════════════════════════════════
MODULE 5 — Developer Center (src/features/developer-center/)
═══════════════════════════════════════
- Diagnostics: surface real environment info (Premiere version if obtainable, plugin 
  version, active provider = Gemini, model = gemini-3.6-flash).
- Logs viewer: read from whatever logging service already exists (src/ai/logging/
  AILogger.ts or similar found during Step 0's audit) — a scrollable, filterable log 
  view, not a new logging system.
- Prompt Builder: show the exact prompts GeminiService actually sends for a selected 
  recent call (reuse existing history/telemetry if AIChatService or AITelemetry 
  already capture this — check before building new storage).
- AI Debugger: trace RK Brain's reasoning steps per action — reuse the same live 
  step-log mechanism already built for AI Director's progress panel, don't build a 
  parallel one.
- API testing panel: a simple form to send a raw prompt to GeminiService and see the 
  raw response — useful for debugging, gated so it's clearly a dev tool not a 
  user-facing feature.
- Performance monitor: reuse Module 4's Analytics data.

>>> BUILD-CHECK: npm run build, paste output, 0 errors. <

═══════════════════════════════════════
MODULE 6 — FINAL PASS
═══════════════════════════════════════
1. Resize QA: check all 24 screens at narrow (~280px), medium, and wide (~900px+) 
   panel widths — confirm no horizontal scrollbars, no clipped buttons, no overlapping 
   text (this project has had layout regressions before — check carefully, don't just 
   assume flex/grid still works after 4 phases of edits).
2. Grep for hardcoded API keys or secrets anywhere in src/ — confirm none exist 
   (this was fixed in Phase 1's security pass; confirm it hasn't regressed).
3. Confirm exactly ONE file imports the Gemini SDK client (grep the whole src/ tree).
4. Confirm no duplicate execution/command pipeline was created anywhere across all 
   4 phases (grep for any second PremiereExecutor-like class).
5. Run the full build one final time and fix all errors/warnings.
6. Produce a final, honest project summary:
   - What is fully real and Premiere-verified (based on what WE actually manually 
     tested together across this whole project, not just what compiled).
   - What is real code but still needs manual verification.
   - What is explicitly a placeholder/local-only/simulated, and why (API limitation, 
     no live host in dev session, etc.) — be specific per item, not a vague "some 
     features may need further testing."
   - A "known limitations" list a real user should know about before relying on this 
     for actual wedding editing work.

>>> FINAL BUILD-CHECK: npm run build, paste output, 0 errors. <