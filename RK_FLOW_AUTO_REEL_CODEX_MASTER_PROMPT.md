# CODEX MASTER PROMPT — RK FLOW AUTO REEL PRODUCTION IMPLEMENTATION

You are working inside the existing repository `com.rkflow.v3`.

Your task is to turn **Auto Reel** into RK Flow’s flagship AI Wedding Editor. Do not rebuild the app from scratch. Audit and reuse the existing architecture first.

## Non-negotiable rules

1. Read these files before changing code:
   - `ARCHITECTURE.md`
   - `Premiere_Pro_UXP_API_Reference.txt`
   - `audit/AI_FLOW.md`
   - `audit/DUPLICATE_AI_COMPONENTS.md`
   - `src/core/execution/*`
   - `src/premiere/*`
   - `src/features/*`
   - `premiere-pro-mcp/RESEARCH.md`
   - `premiere-pro-mcp/src/tools/*`
   - `premiere-pro-mcp/src/platform-capabilities.ts`

2. Do not create a second AI, command, execution, timeline, or memory pipeline.
3. Keep the current tool-based flow:
   `UI → Context → Gemini/RK Brain → Structured Plan → PreviewGate → PremiereExecutor → ExecutionQueue → ActionDispatcher → PremiereBridge`
4. Use only Premiere APIs already verified in this repository.
5. Never report a host feature as working if it is mocked, simulated, metadata-only, or not manually verified in Premiere.
6. Preserve existing UI visual language and navigation. Upgrade Auto Reel screens without redesigning unrelated pages.
7. Every layout must work at approximately 280px, 500px, 900px, and wide panel widths with no overlap or horizontal scrolling.
8. After every numbered implementation phase run:
   `npm run build`
   Do not continue until it has zero TypeScript/webpack errors.
9. Before each phase create a Git checkpoint commit or backup.
10. Never hardcode API keys, user paths, model paths, or copyrighted media URLs.
11. All AI plans must be visible to the user as readable text and structured editable steps before execution.
12. Destructive Premiere operations require PreviewGate approval. New-sequence assembly may use the existing verified no-confirm path only where already allowed.
13. Keep source clips untouched. Auto Reel must create a new sequence by default.
14. Add tests for pure planning/scoring logic and validation.
15. Maintain a truthful implementation status document with:
    - Premiere-verified
    - implemented but unverified in host
    - metadata-only fallback
    - placeholder/not implemented
    - licensing limitation

---

# Product behavior

Auto Reel is not a sequence assembler. It must behave like an AI Indian Wedding Editor.

Final workflow:

`Media Selection → Timeline Reader → Clip Scanner → Frame/Audio Extraction → Vision AI → Face Recognition → Wedding Event Detection → Emotion Detection → Quality Scoring → Music Analysis → Story Builder → Reel Planner → Editable Preview → Premiere Execution → Export`

The user must always see:

- current analysis phase
- percent progress
- clip currently being analyzed
- counts completed/remaining
- warnings and fallback mode
- full text explanation of the plan
- why each clip was selected or rejected
- confidence and signal source
- duration decision reason
- transition, motion, SFX, music, and color suggestions
- execution results and failures

---

# Required architecture

## A. UXP frontend

Keep heavy ML out of the UXP UI thread.

Create or consolidate these UI-facing layers:

- `AutoReelWorkspace`
- `AutoReelSetup`
- `AutoReelProgress`
- `AutoReelPlanView`
- `AutoReelTimelinePreview`
- `AutoReelInspector`
- `AutoReelExecutionStatus`
- `MusicSourcePicker`
- `ReferenceReelInput`
- `PersonReferenceManager`

Use existing theme primitives and adaptive layout system.

## B. Local analysis sidecar

Implement a local-only Python service under a clearly named folder such as:

`analysis-sidecar/`

Recommended stack:

- Python 3.11+
- FastAPI
- Uvicorn
- Pydantic
- OpenCV
- NumPy
- FFmpeg/ffprobe integration
- MediaPipe Tasks
- librosa

The UXP plugin must communicate with it through one existing/approved local bridge mechanism. Reuse the existing MCP/bridge plumbing when appropriate instead of inventing another transport.

The sidecar must:

- bind to localhost only
- use a per-session random token
- expose `/health`
- expose version/capability information
- reject arbitrary filesystem access outside user-approved project/media paths
- support cancellation
- stream progress events
- cache analysis by media fingerprint + model version + parameters
- run without sending frames to a cloud service unless the user explicitly enables cloud analysis

Do not silently upload wedding footage.

---

# Open-source module policy

Before installing any dependency, create:

`docs/THIRD_PARTY_AI_MODULES.md`

For every module record:

- repository
- exact version/commit
- code license
- model/weights license
- commercial-use status
- bundled or downloaded at runtime
- attribution requirements
- fallback if unavailable

Preferred modules:

## Computer vision

1. OpenCV
   - use for frame sampling, Laplacian blur score, exposure histogram, noise estimate, optical flow, motion, camera shake, scene change, framing helpers, perceptual hash, duplicate detection

2. MediaPipe Tasks
   - use for face detection and landmarks
   - derive smile/eye openness/head pose as measured signals
   - do not claim a medical or absolute emotional truth

3. HSEmotion
   - optional facial-expression classification
   - label output as “facial expression estimate”
   - aggregate across multiple frames
   - expose confidence and uncertainty

4. Face identity
   - user supplies reference photos for bride, groom, family, friends, kids, photographer, pandit
   - create embeddings and compare with calibrated thresholds
   - do not auto-label sensitive identity without user confirmation
   - InsightFace/DeepFace models must pass a commercial model-license gate before being enabled
   - if model license is unclear, keep the adapter disabled and show the licensing reason
   - support a replaceable `FaceEmbeddingProvider` interface

## Audio/music

1. librosa
   - BPM/tempo
   - beat positions
   - onset strength
   - RMS energy
   - spectral features
   - segmentation helpers

2. Optional providers must be license-gated:
   - Essentia is not the default because its open-source distribution is AGPL
   - aubio is not the default because it is GPL
   - madmom pretrained models are not suitable as a default commercial dependency without a licensing review

3. FFmpeg/ffprobe
   - media probing
   - audio extraction
   - representative frame extraction
   - waveform proxy generation
   - verify redistribution/legal packaging before bundling binaries

Do not scrape or download copyrighted songs/SFX from social platforms.

---

# Phase 0 — Repository audit and consolidation

1. Map the currently active Auto Reel pipeline.
2. Identify duplicate planners, beat analyzers, story builders, face analyzers, and execution paths.
3. Choose the active files based on actual imports.
4. Do not delete duplicates yet. Mark retirement candidates in:
   `docs/AUTO_REEL_CONSOLIDATION.md`
5. Confirm current Premiere-verified insertion path from `ARCHITECTURE.md` and MCP research.
6. Confirm one Gemini SDK import path and one Premiere execution pipeline.
7. Search for secrets and remove any hardcoded API keys.
8. Build.

Deliver:
- audit table
- active dependency graph
- list of files to modify
- list of files to leave untouched

---

# Phase 1 — Auto Reel domain model and job state

Create strict typed models without `any`:

- `AutoReelJob`
- `AutoReelRequest`
- `MediaSelection`
- `ClipDescriptor`
- `FrameSample`
- `VisionSignals`
- `FaceSignals`
- `ExpressionSignals`
- `WeddingEventSignals`
- `AudioAnalysis`
- `ClipScoreBreakdown`
- `StoryBeat`
- `ReelSegment`
- `TransitionDecision`
- `MotionDecision`
- `SFXDecision`
- `ColorSuggestion`
- `ReelPlan`
- `PlanRevision`
- `ExecutionReport`

Job states:

- idle
- validating
- scanning
- extracting
- analyzing_vision
- analyzing_faces
- analyzing_emotion
- analyzing_music
- scoring
- building_story
- planning
- awaiting_review
- executing
- completed
- cancelled
- failed

Persist resumable job metadata using the existing MemoryEngine.

Build and test.

---

# Phase 2 — Media selection and setup UI

Implement user controls:

## Source

- selected timeline clips
- entire active sequence
- sequence In/Out range
- selected Project panel bin
- manually selected project items
- user-chosen minimum and maximum clip count
- no fixed 15-clip cap
- include/exclude locked tracks
- include/exclude audio-only and still images

## Reel settings

- target duration
- aspect ratio
- frame rate policy
- style mode
- story mode
- emotion priority
- bride/groom balance
- family balance
- energy level
- cut density
- transition intensity
- motion intensity
- SFX intensity
- color look
- output sequence name
- create new sequence default ON

## Modes

- Cinematic Reel
- Emotional Reel
- Couple Reel
- Family Reel
- Drone Reel
- Dance Reel
- Reception Reel
- Baraat Reel
- Haldi Reel
- Mehndi Reel
- Sangeet Reel
- Baby Shower Reel
- Engagement Reel
- Save The Date
- Pre-Wedding Reel
- Instagram Viral Reel
- YouTube Shorts
- Facebook Reel
- Story Mode
- Emotion Mode
- Music Mode
- Viral Mode
- Luxury Wedding Mode
- Documentary Mode
- Cinematic Mode

Build and resize-test.

---

# Phase 3 — Real timeline/media scanner

Extend the existing TimelineReader/TimelineSDK, do not replace it.

Read:

- project
- sequence
- In/Out
- playhead
- tracks
- selected clips
- all eligible clips
- project item ID
- media path when host API exposes it
- source In/Out
- timeline start/end
- duration
- speed
- media type
- track index
- disabled state
- linked audio/video relationship where verifiable
- resolution
- FPS/timebase
- proxy status if available
- metadata available through verified APIs

Create stable clip IDs that survive plan revisions.

Add media fingerprinting and cache keys.

No fake metadata.

Build and test in Premiere.

---

# Phase 4 — Frame and audio extraction

Create an extraction queue.

For each clip:

- sample adaptive representative frames
- include start, middle, end
- add more samples near scene changes and motion peaks
- never analyze every frame by default
- use proxy resolution
- store temporary files in an RK Flow cache directory
- clean expired cache
- cancellation support
- concurrency limit for Apple Silicon
- track extraction failures per clip

Extract audio from the chosen song and clips only when needed.

Expose progress to UI.

Build and test.

---

# Phase 5 — Clip intelligence

Implement measured signals:

- sharpness
- blur
- exposure
- highlight clipping
- crushed shadows
- noise estimate
- focus consistency
- camera shake
- optical-flow motion
- static shot
- framing
- horizon/rotation estimate
- shot-size estimate
- face visibility
- occlusion
- duplicate/near-duplicate score
- scene-change positions
- duration
- speed
- camera-angle probability:
  - Wide
  - Medium
  - Close
  - Drone
  - Detail

Output:

- quality score 0–100
- reject score 0–100
- measured reasons
- confidence
- source frames
- fallback reason

Do not use filenames as the primary signal except as a low-weight fallback.

Build and test using fixture media.

---

# Phase 6 — Face AI, person references, smile and expression

Implement `PersonReferenceManager`.

User can:

- import one or more reference photos
- capture a reference frame from a selected clip
- label bride, groom, family, friend, kid, photographer, pandit, or custom person
- edit/delete reference identities
- confirm uncertain matches

Pipeline:

- face detection
- alignment
- landmarks
- embedding
- clustering
- reference matching
- best-shot ranking

Signals:

- face count
- primary face
- smile estimate
- eyes open
- frontal/profile
- face size
- occlusion
- expression estimate:
  - happy
  - emotional/sad
  - surprise
  - neutral
  - energetic proxy
- confidence per frame and aggregated per clip

Important:

- call this “expression/emotion estimate,” not objective human emotion
- do not infer race, religion, health, sexuality, or other sensitive traits
- bride/groom labels come from user references or explicit confirmation
- cache embeddings locally
- provide metadata-only fallback clearly labelled

Build and test.

---

# Phase 7 — Wedding event detection

Implement multimodal event classification using:

- visual signals
- faces/person references
- clothing/color/decor cues
- motion
- audio energy
- Gemini structured reasoning only when enabled
- temporal neighborhood of adjacent clips

Events:

- Venue
- Decor
- Invitation
- Jewellery
- Bride Prep
- Groom Prep
- Bride Entry
- Groom Entry
- Haldi
- Mehndi
- Sangeet
- Baraat
- Varmala
- Pheras
- Sindoor
- Mangalsutra
- Bidaai
- Reception
- Cake
- Dance
- Couple Portrait
- Family Emotion
- Crowd Reaction
- Drone
- Detail
- Fireworks
- Unknown

Every output requires:

- event
- confidence
- evidence
- alternative events
- source
- editable user correction

Use user corrections to update project memory, not global model weights.

Build and test.

---

# Phase 8 — Music AI and source picker

Implement music sources:

1. local imported song
2. existing Premiere project item
3. approved user-provided direct URL
4. pasted link metadata/reference only
5. “no music yet” planning mode

Do not automatically download Instagram/YouTube copyrighted audio.

For unsupported links:

- show “Import an authorized local audio file”
- allow user to manually choose the downloaded/licensed file

Analyze:

- duration
- BPM
- beat positions
- downbeat candidates
- onset/transient positions
- intro/outro
- verse/chorus/drop candidates
- energy curve
- loudness curve
- quiet/emotional sections
- key/chroma if useful
- section confidence

Music suggestions:

- suggest mood, tempo range, instrumentation, and edit compatibility
- search only user local library or configured licensed provider adapters
- provide an interface for future licensed catalog APIs
- never claim a song is royalty-free without provider metadata

User controls:

- choose song
- replace song
- lock song
- choose section
- trim song
- align first beat
- manually add/remove beat markers
- select music importance
- import from file
- choose an existing Premiere project item
- paste an authorized direct file URL
- paste a social reference link for style analysis only

Build and test.

---

# Phase 9 — SFX AI

Create typed SFX taxonomy:

- Whoosh
- Hit
- Rise
- Drop
- Impact
- Transition
- Crowd
- Applause
- Temple Bell
- Firework
- Camera Shutter
- Sparkle
- Soft Swell
- Emotional Boom
- Ambient Room Tone

Sources:

- user local SFX library
- Premiere project items
- configured licensed SFX provider
- no unlicensed downloading

For each suggestion show:

- category
- proposed timestamp
- reason
- intensity
- gain
- duration
- source availability
- missing-asset state

User can:

- approve/reject
- replace
- import local file
- select a project asset
- paste an authorized direct file link
- disable a whole SFX category

Build and test.

---

# Phase 10 — AI scoring

Create a configurable scoring engine with normalized weights.

Signals:

- quality
- sharpness
- exposure
- stability
- expression/emotion
- smile
- bride
- groom
- family
- wedding event importance
- camera angle
- composition
- motion
- uniqueness
- story relevance
- music compatibility
- user preference
- locked/required status

Output per clip:

- final score
- component scores
- selected/rejected
- top reasons
- penalties
- confidence
- model/source
- recommended duration range

Rules:

- no hidden magic constants
- all weights defined in config
- presets per mode
- deterministic result with same inputs
- prevent duplicate moments
- prevent one person/event dominating unless selected mode requests it
- honour required clips
- no fixed clip count
- duration and clip count adapt to target length and storytelling

Build unit tests.

---

# Phase 11 — Story Builder

Implement narrative graphs/templates, not a random ranked list.

Example wedding story:

- opening hook
- venue/decor
- bride prep
- groom prep
- family
- bride entry
- groom entry
- varmala
- pheras
- reception
- dance/energy
- emotional payoff
- ending

Modes alter story structure.

Story Builder must:

- work with missing event categories
- use graceful substitutions
- avoid repeated adjacent shot types
- balance wide/medium/close/detail/drone
- balance people
- maintain continuity
- place emotional moments in suitable music sections
- place energetic clips around drops
- include an opening hook within first seconds
- create a clear ending

Show the full story plan as user-readable text.

Build and test.

---

# Phase 12 — Dynamic duration engine

Do not use fixed 3-second cuts.

Use ranges based on:

- emotional reaction: longer
- romantic/couple close-up: medium-long
- drone/establishing: long
- action/dance: short-medium
- quick reaction: short
- smile: short-medium
- detail: short
- speech/dialogue: preserve meaningful phrase
- music section and beat spacing
- source motion
- source duration
- target duration
- edit density

Output:

- selected source In/Out
- timeline duration
- reason
- beat alignment
- minimum handles
- alternative duration

Ensure selected durations sum to target within tolerance.

Build tests.

---

# Phase 13 — Transition, motion, color and SFX planning

## Transitions

Choose among only Premiere-verified transitions/assets:

- hard cut
- cross dissolve
- dip
- whip
- zoom
- flash
- match cut
- user-installed transition presets when discoverable

Avoid transitions on every cut.

## Motion

- scale
- position
- pan
- zoom
- speed ramp
- stabilization suggestion
- reframe suggestion

Only execute what verified Premiere APIs support. Otherwise show as suggestion/unverified.

## Color

Suggest:

- exposure correction
- white balance
- shot match
- skin-tone protection
- LUT/look recommendation

Do not claim automatic color correction is executed unless real host APIs are verified.

Build and document capability status.

---

# Phase 14 — Reference Reel AI

This is a key differentiator.

Inputs:

- Instagram/YouTube link
- user-authorized local reference video
- extracted frames/audio from a local file

Safe contract:

- learn pacing
- shot taxonomy
- duration distribution
- beat structure
- transition rhythm
- motion rhythm
- story structure
- color mood
- typography category

Do not:

- copy source footage
- copy copyrighted audio
- recreate logos/watermarks
- reproduce the reference shot-for-shot
- bypass platform restrictions

For URL-only mode:

- use accessible metadata/text only
- label limitations honestly
- request a local authorized file for real frame/audio analysis

Output a `ReferenceStyleProfile` with confidence and source.

Allow the user to choose which style attributes to apply.

Build and test.

---

# Phase 15 — Reel Planner

Combine:

- eligible clips
- scores
- story beats
- dynamic durations
- music
- reference profile
- transition decisions
- motion
- SFX
- color suggestions
- user locks

Create:

- primary plan
- at least two alternatives when enough footage exists
- warnings
- missing assets
- duration summary
- person/event balance
- source coverage
- rejected-clip summary

The plan must be deterministic and serializable.

Build tests.

---

# Phase 16 — Editable timeline preview

Before Premiere execution show:

- complete ordered segment list
- clip thumbnails
- source In/Out
- timeline In/Out
- score
- reasons
- event
- people
- expression
- transition
- motion
- SFX
- color suggestion
- beat marker
- warnings

User actions:

- change
- replace
- remove
- lock
- reorder
- adjust duration
- adjust source In/Out
- change transition
- change motion
- change SFX
- change song
- regenerate selected section
- regenerate full plan
- compare alternatives

Every edit creates a `PlanRevision`.

Build adaptive UI and test narrow widths.

---

# Phase 17 — Premiere execution

Use the existing execution pipeline only.

Execution order:

1. validate project/sequence/media
2. create new sequence
3. add selected song
4. add ordered clips
5. apply source In/Out
6. set timeline positions
7. apply supported transitions
8. add markers
9. add supported motion/SFX actions
10. return per-action results

Requirements:

- PreviewGate approval
- transaction/queue safety
- undo-friendly operations
- cancellation
- partial failure reporting
- do not silently continue after a structural failure
- preserve original sequence
- sequence naming collision handling
- execution log visible in UI

Manually verify in Premiere and document exact tested operations.

---

# Phase 18 — Export

Create presets:

- Instagram Reel
- YouTube Shorts
- Facebook Reel
- WhatsApp
- Highlight
- Master
- Archive

Use real Premiere export/Encoder APIs only if verified in this repository.

Otherwise implement an honest handoff to Premiere’s export UI and do not fake completion.

Add naming templates and queue UI.

Build and test.

---

# Phase 19 — Acceptance criteria

Auto Reel is complete only when:

- reads more than 15 eligible clips
- respects selected source mode and In/Out
- no fixed segment duration
- analyzes real frames/audio or clearly labels fallback
- face identity uses user references
- expression/smile confidence visible
- blur/exposure/shake scores visible
- wedding events visible and editable
- song can be local, project item, or authorized direct URL
- social link mode does not illegally download audio/video
- SFX source can be user library/project item/provider
- full plan is shown as text
- full editable timeline preview exists
- user can lock/change/delete/replace/reorder
- execution creates a new Premiere sequence
- original timeline is preserved
- failed actions are reported
- project builds with zero errors
- responsive at narrow/medium/wide widths
- third-party licenses documented
- no secrets committed
- all placeholder/fallback behavior is labelled honestly

---

# Required final report from Codex

After implementation, produce:

1. changed files
2. architecture diagram
3. installed open-source modules and licenses
4. exact commands to install/start sidecar
5. exact commands to build UXP
6. Premiere manual test checklist
7. real verified features
8. implemented but unverified features
9. metadata-only fallbacks
10. blocked features and reasons
11. known licensing limitations
12. performance numbers on Apple Silicon
13. cache/storage behavior
14. security/privacy behavior
15. remaining roadmap

Do not claim the whole roadmap is done just because it compiles.
