# Third-Party AI Modules

Status: Phase 5 Vision AI foundation. The local-only sidecar uses the pinned,
code-only modules listed below. It downloads no model weights and sends no media
to a cloud service.

## Existing Runtime Dependencies

| Module | Current version | Code license | Model/weight license | Commercial status | Delivery | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `@google/generative-ai` | `^0.24.1` | Apache-2.0 | Gemini service terms, not local weights | Requires API/billing terms review | npm dependency | Current planner and optional Vision path. Wedding frames must not be sent without explicit cloud consent. |
| `premiere-pro-mcp` | `1.4.0` local package | MIT | N/A | Permissive code license | Separate local CEP/MCP package | Research/capability reference only; it is not part of the UXP runtime. |

## Approved Candidates, Not Yet Installed

| Module | Version/commit | Code license | Model/weight license | Commercial status | Delivery | Attribution/fallback |
| --- | --- | --- | --- | --- | --- | --- |
| FastAPI | `0.115.0` | MIT | N/A | Permissive | Python sidecar dependency | Include MIT notice; fallback is no sidecar/metadata-only extraction. |
| Pydantic | `2.9.2` | MIT | N/A | Permissive | Python sidecar dependency | Include MIT notice; fallback is manual JSON validation disabled. |
| Uvicorn | `0.30.6` | BSD-3-Clause | N/A | Permissive | Python sidecar dependency | Include BSD notice; fallback is no sidecar server. |
| NumPy | `2.0.2` | BSD-3-Clause | N/A | Permissive | Pinned Python sidecar dependency | Include BSD notice; unavailable means Vision analysis reports its capability reason. |
| OpenCV (`opencv-python-headless`) | `4.10.0.84` | Apache-2.0 | N/A | Permissive code license | Pinned Python sidecar dependency | Include Apache notice; unavailable means full Vision frame analysis is disabled. |
| Pillow | `11.3.0` | HPND | N/A | Permissive | Pinned Python sidecar dependency | Used only for capability probing and image-format support; OpenCV is the required analyzer. |
| ONNX Runtime | `1.19.2` | MIT | No model weights bundled | Permissive | Pinned optional Python sidecar dependency | Provider probe only in Phase 5; no ONNX model is loaded. CPU remains required fallback. |
| OpenCV Zoo YuNet | `face_detection_yunet_2023mar.onnx` | MIT | MIT | Commercial use permitted | Optional local sidecar artifact; never auto-downloaded | Artifact is documented but not bundled; OpenCV Haar is the local fallback. |
| MediaPipe Tasks | Not selected | Apache-2.0 | Verify task-model package before pinning | Conditional pending model review | Runtime model download or bundled model, decision pending | Include notices and user consent for its telemetry; fallback is face detection unavailable. |
| librosa | Not selected | ISC | N/A | Permissive | Python sidecar dependency | Include ISC notice; fallback is no local music analysis. |
| FFmpeg/ffprobe | User-installed initially | LGPL/GPL depends on build configuration | N/A | Conditional | External executables, not bundled in this repository | Do not distribute until codec/build license review. Fallback is no frame/audio extraction. |

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
- The current implementation binds specifically to `127.0.0.1` and rejects non-localhost health states.
- No cloud frame/audio upload without an explicit user opt-in per project.
- Phase 4 extraction accepts only user-approved local filesystem roots collected from verified Premiere media paths or explicit local-song paths. Remote URLs and social links remain unavailable/reference-only.
- Phase 5 Vision accepts only extracted frame paths produced by the existing extraction cache. It does not read the Premiere timeline, decode source media, run face recognition, classify weddings, infer emotion, analyze music, or build a story.
- Limited Phase 6 runs local anonymous face detection/tracking/clustering only. Its current OpenCV Haar fallback is bundled with OpenCV; YuNet is accepted only when an administrator provisions the exact MIT artifact locally. MediaPipe Tasks is not enabled because an exact Face Landmarker artifact license and local provisioning record have not been added. No embeddings, names, reference matching, cloud uploads, or permanent biometric storage are created.
- Limited Phase 7 uses only existing local Vision cues. Grounding DINO is not enabled: no exact local weight artifact, hash, or license record is configured. Ultralytics YOLO is not enabled because its AGPL obligations have not been accepted and no enterprise license is configured. No weights are downloaded automatically.
- The Phase 4 sidecar uses a dedicated RK Flow cache root under the local temp directory unless `RKFLOW_CACHE_ROOT` is set, tracks cache size, applies TTL cleanup, and refuses deletion outside that cache root.
- Face references and embeddings remain local, are deletable, and require user
  confirmation before bride/groom labels are used.
- Social links are metadata/style references only. RK Flow must not download
  copyrighted Instagram or YouTube media/audio.
- FFmpeg/ffprobe are invoked only as local subprocesses. This repository does not bundle binaries and does not download media from cloud/social platforms on the user's behalf.
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
