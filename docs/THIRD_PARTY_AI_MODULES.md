# Third-Party AI Modules

Status: Phase 0 inventory. No analysis-sidecar dependency has been installed.
Every candidate remains blocked until a version or immutable commit, its model
weights, redistribution terms, and notices are recorded here.

## Existing Runtime Dependencies

| Module | Current version | Code license | Model/weight license | Commercial status | Delivery | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `@google/generative-ai` | `^0.24.1` | Apache-2.0 | Gemini service terms, not local weights | Requires API/billing terms review | npm dependency | Current planner and optional Vision path. Wedding frames must not be sent without explicit cloud consent. |
| `premiere-pro-mcp` | `1.4.0` local package | MIT | N/A | Permissive code license | Separate local CEP/MCP package | Research/capability reference only; it is not part of the UXP runtime. |

## Approved Candidates, Not Yet Installed

| Module | Version/commit | Code license | Model/weight license | Commercial status | Delivery | Attribution/fallback |
| --- | --- | --- | --- | --- | --- | --- |
| FastAPI | Not selected | MIT | N/A | Permissive | Python sidecar dependency | Include MIT notice; fallback is no sidecar/metadata-only analysis. |
| Pydantic | Not selected | MIT | N/A | Permissive | Python sidecar dependency | Include MIT notice; fallback is manual JSON validation disabled. |
| Uvicorn | Not selected | BSD-3-Clause | N/A | Permissive | Python sidecar dependency | Include BSD notice; fallback is no sidecar server. |
| NumPy | Not selected | BSD-3-Clause | N/A | Permissive | Python sidecar dependency | Include BSD notice; fallback is reduced pure-Python metrics. |
| OpenCV | Not selected | Apache-2.0 | N/A | Permissive code license | Python sidecar dependency | Include Apache notice; use measured OpenCV signals only. |
| MediaPipe Tasks | Not selected | Apache-2.0 | Verify task-model package before pinning | Conditional pending model review | Runtime model download or bundled model, decision pending | Include notices and user consent for its telemetry; fallback is face detection unavailable. |
| librosa | Not selected | ISC | N/A | Permissive | Python sidecar dependency | Include ISC notice; fallback is no local music analysis. |
| FFmpeg/ffprobe | User-installed initially | LGPL/GPL depends on build configuration | N/A | Conditional | External executable, not bundled initially | Do not distribute until codec/build license review. Fallback is no media extraction. |

## Explicitly Blocked Candidates

| Module | Reason | Required gate |
| --- | --- | --- |
| InsightFace / DeepFace | Face-model weights and downstream assets require separate commercial-use review. | Pin exact model plus written license decision before enabling. |
| HSEmotion | Code and pretrained-weight terms are not yet reviewed. | License and accuracy/claims review before enabling. |
| Essentia | AGPL distribution is unsuitable as the default commercial dependency. | Legal approval and isolated deployment decision. |
| aubio | GPL distribution is unsuitable as the default commercial dependency. | Legal approval and isolated deployment decision. |
| madmom | Pretrained model licensing is not cleared. | Model-weight license review. |

## Policy Requirements

- Sidecar binds to localhost only and requires a random per-session token.
- No cloud frame/audio upload without an explicit user opt-in per project.
- Face references and embeddings remain local, are deletable, and require user
  confirmation before bride/groom labels are used.
- Social links are metadata/style references only. RK Flow must not download
  copyrighted Instagram or YouTube media/audio.
- Every installed module must be updated with its exact version or commit, source
  URL, notice text, model download source, cache location, and commercial-use
  determination before installation.

## License Sources

- FastAPI: https://github.com/fastapi/fastapi
- Pydantic: https://github.com/pydantic/pydantic
- OpenCV: https://github.com/opencv/opencv
- MediaPipe: https://github.com/google-ai-edge/mediapipe
- librosa: https://github.com/librosa/librosa
- NumPy: https://numpy.org/doc/stable/license.html
- FFmpeg: https://ffmpeg.org/legal.html
