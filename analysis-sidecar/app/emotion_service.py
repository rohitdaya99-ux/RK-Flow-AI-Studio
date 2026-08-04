from __future__ import annotations
import asyncio
from datetime import datetime, timezone
from typing import Dict, List, Optional, Type
import abc

from .models import SidecarStatus
from .vision import VisionRuntime
from .emotion_models import (
    ClipMoodEstimate,
    ClipMoodLabel,
    EmotionCapabilities,
    EmotionClipReport,
    EmotionReport,
    EmotionRequest,
    ExpressionLabel,
    ExpressionProviderStatus,
    FacialExpressionEstimate,
    FaceExpressionFrame,
    ClipExpressionSummary,
    EditorialRecommendation,
    EMOTION_MODEL_VERSION,
)
from .face_models import DetectedFace, FaceReport

def _now() -> str:
    return datetime.now(timezone.utc).isoformat()

class ExpressionProvider(abc.ABC):
    """Abstract base class for expression providers."""
    def __init__(self, runtime: VisionRuntime):
        self.runtime = runtime

    @abc.abstractmethod
    def get_name(self) -> str: ...

    @abc.abstractmethod
    def is_enabled(self) -> bool: ...
    
    @abc.abstractmethod
    def get_reason(self) -> Optional[str]: ...

    @abc.abstractmethod
    async def estimate(self, frame: FaceExpressionFrame, faces: List[DetectedFace]) -> None: ...

class LocalLandmarkExpressionProvider(ExpressionProvider):
    """Estimates expression from geometric facial landmarks."""
    def get_name(self) -> str:
        return "LocalLandmarkExpressionProvider"

    def is_enabled(self) -> bool:
        # This would check for a landmark model, which is not available in Phase 6.
        return False

    def get_reason(self) -> Optional[str]:
        return "Face landmark detection capability not available in the current Face AI foundation."

    async def estimate(self, frame: FaceExpressionFrame, faces: List[DetectedFace]) -> None:
        # Placeholder for logic that uses landmarks to detect smiles, eye openness, etc.
        # Since this provider is disabled, this will not be called.
        pass

class LocalModelExpressionProvider(ExpressionProvider):
    """Estimates expression using a local pretrained model."""
    def get_name(self) -> str:
        return "LocalModelExpressionProvider"

    def is_enabled(self) -> bool:
        return False

    def get_reason(self) -> Optional[str]:
        return "A commercially usable local expression model has not been approved or configured. See docs/THIRD_PARTY_AI_MODULES.md."

    async def estimate(self, frame: FaceExpressionFrame, faces: List[DetectedFace]) -> None:
        pass # This provider is disabled.

class DisabledExpressionProvider(ExpressionProvider):
    """A fallback provider that does nothing."""
    def get_name(self) -> str:
        return "DisabledExpressionProvider"

    def is_enabled(self) -> bool:
        # This provider is always enabled as a fallback, but it does no work.
        return True
        
    def get_reason(self) -> Optional[str]:
        return "No expression providers are enabled."

    async def estimate(self, frame: FaceExpressionFrame, faces: List[DetectedFace]) -> None:
        for face in faces:
            estimate = FacialExpressionEstimate(
                faceId=face.id,
                label="uncertain",
                confidence=0.5,
                provider=self.get_name(),
                uncertainty_reason="No active expression analysis provider.",
            )
            frame.expressions.append(estimate)


class EmotionService:
    def __init__(self, bind: str, base_url: str, version: str) -> None:
        self.bind = bind
        self.base_url = base_url
        self.version = version
        self.runtime = VisionRuntime()
        self.jobs: Dict[str, EmotionReport] = {}
        self.cancelled: set[str] = set()
        self.providers: List[ExpressionProvider] = [
            LocalLandmarkExpressionProvider(self.runtime),
            LocalModelExpressionProvider(self.runtime),
            DisabledExpressionProvider(self.runtime),
        ]

    def _get_active_provider(self) -> ExpressionProvider:
        for provider in self.providers:
            if provider.is_enabled():
                # Return the first enabled provider. DisabledExpressionProvider is last as a fallback.
                return provider
        # This should not be reached if DisabledExpressionProvider is always available
        raise RuntimeError("No expression provider available, including the fallback.")

    def capabilities(self) -> EmotionCapabilities:
        provider_statuses = [
            ExpressionProviderStatus(name=p.get_name(), enabled=p.is_enabled(), reason=p.get_reason())
            for p in self.providers
        ]
        active_provider = self._get_active_provider()
        is_available = not isinstance(active_provider, DisabledExpressionProvider)

        return EmotionCapabilities(
            available=is_available,
            providers=provider_statuses,
            reason=None if is_available else "No active expression analysis provider could be loaded. Using fallback."
        )

    async def submit(self, request: EmotionRequest) -> str:
        caps = self.capabilities()
        report = EmotionReport(
            jobId=request.jobId,
            requestId=request.requestId,
            status="running",
            sidecar=SidecarStatus(status="available", baseUrl=self.base_url, version=self.version),
            capabilities=caps,
            progress={"completed_clips": 0, "total_clips": 0, "current_clip_id": None},
            startedAt=_now(),
        )
        self.jobs[request.jobId] = report
        asyncio.create_task(self._run(request, report))
        return request.jobId

    async def get(self, job_id: str) -> EmotionReport:
        if job_id not in self.jobs:
            raise KeyError(f"Emotion job {job_id} not found.")
        return self.jobs[job_id]

    async def cancel(self, job_id: str) -> None:
        self.cancelled.add(job_id)
        report = await self.get(job_id)
        report.status = "cancelled"

    async def shutdown(self) -> None:
        self.cancelled.update(self.jobs.keys())

    async def _run(self, request: EmotionRequest, report: EmotionReport) -> None:
        provider = self._get_active_provider()
        face_report = request.faceReport
        
        # Create a timestamp lookup for frames
        timestamps = {t.frameSampleId: t.timestampSeconds for t in face_report.timeline}
        
        # Group faces by clip and then by frame
        faces_by_clip: Dict[str, Dict[str, List[DetectedFace]]] = {}
        for face in face_report.faces:
            faces_by_clip.setdefault(face.clipId, {}).setdefault(face.frameSampleId, []).append(face)

        report.progress["total_clips"] = len(faces_by_clip)

        for clip_id, frames_in_clip in faces_by_clip.items():
            if report.jobId in self.cancelled:
                report.status = "cancelled"
                break
            
            report.progress["current_clip_id"] = clip_id
            
            clip_face_expression_frames: List[FaceExpressionFrame] = []
            
            # 1. Expression Provider
            for frame_id, faces_in_frame in frames_in_clip.items():
                timestamp = timestamps.get(frame_id, 0.0)
                face_expression_frame = FaceExpressionFrame(frameSampleId=frame_id, timestamp=timestamp, expressions=[])
                await provider.estimate(face_expression_frame, faces_in_frame)
                clip_face_expression_frames.append(face_expression_frame)

            # 2. Temporal Aggregation
            expression_summary = self._temporal_aggregation(clip_face_expression_frames)
            
            # 3. Clip Mood Estimator
            mood_estimate = self._estimate_clip_mood(expression_summary, clip_id)

            report.clips.append(
                EmotionClipReport(
                    clipId=clip_id,
                    expression_summary=expression_summary,
                    mood_estimate=mood_estimate
                )
            )
            report.progress["completed_clips"] += 1
        
        if report.status == "running":
            report.status = "completed"
        report.completedAt = _now()

    def _temporal_aggregation(self, frames: List[FaceExpressionFrame]) -> ClipExpressionSummary:
        # Placeholder for temporal aggregation logic.
        # This would calculate smile scores, expression stability, etc.
        
        all_expressions = [expr for frame in frames for expr in frame.expressions]
        
        smile_score = 0.0
        if all_expressions:
             smile_score = sum(1 for expr in all_expressions if expr.label == 'smiling') / len(all_expressions) * 100.0

        return ClipExpressionSummary(
            dominant_expression="uncertain",
            smile_score=smile_score,
            expression_score=50.0 # dummy value
        )

    def _estimate_clip_mood(self, summary: ClipExpressionSummary, clip_id: str) -> ClipMoodEstimate:
        # Placeholder for clip mood estimation logic.
        # This would use expression summary, vision signals, etc.
        
        mood: ClipMoodLabel = "neutral"
        confidence = 0.6
        if summary.smile_score > 50:
            mood = "joyful"
            confidence = 0.75

        return ClipMoodEstimate(
            dominant_mood=mood,
            confidence=confidence,
            usable_for_edit=True,
            recommended_handling="normal",
            uncertainty_reason="Mood estimation is based on limited signals."
        )

