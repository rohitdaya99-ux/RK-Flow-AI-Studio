from typing import List, Optional
from app.models import (
    EmotionAnalysisRequest, EmotionReport, ClipMoodEstimate, EmotionEvidence,
    FacialExpressionEstimate, ClipExpressionSummary
)
from .providers import (
    ExpressionProvider, LocalLandmarkExpressionProvider,
    LocalModelExpressionProvider, DisabledExpressionProvider
)
from .temporal import aggregate_expressions_to_summary

class EmotionService:
    def __init__(self):
        self._providers: List[ExpressionProvider] = [
            LocalModelExpressionProvider(),
            LocalLandmarkExpressionProvider(),
            DisabledExpressionProvider("No providers are enabled.")
        ]

    def get_active_provider(self) -> ExpressionProvider:
        for provider in self._providers:
            if provider.is_enabled():
                return provider
        return self._providers[-1] # The DisabledProvider

    def get_capabilities(self):
        return {
            "providers": [
                {"provider_name": p.get_name(), "enabled": p.is_enabled(), "reason": p.get_reason()}
                for p in self._providers
            ]
        }

    def analyze_clip(self, request: EmotionAnalysisRequest) -> EmotionReport:
        provider = self.get_active_provider()
        
        all_face_expressions: List[FacialExpressionEstimate] = []
        if provider.is_enabled():
            for frame in request.frames:
                if frame.status == 'available' and frame.face_analysis:
                    for face in frame.face_analysis.faces:
                        all_face_expressions.append(provider.analyze_face(face, frame.timestamp))
        
        expression_summary = aggregate_expressions_to_summary(all_face_expressions)
        mood_estimate = self._estimate_clip_mood(
            request, all_face_expressions, expression_summary
        )

        return EmotionReport(
            clip_id=request.clip_id,
            expression_summary=expression_summary,
            mood_estimate=mood_estimate,
            face_expressions=all_face_expressions,
        )

    def _estimate_clip_mood(
        self,
        request: EmotionAnalysisRequest,
        expressions: List[FacialExpressionEstimate],
        summary: Optional[ClipExpressionSummary],
    ) -> ClipMoodEstimate:
        evidence: List[EmotionEvidence] = []
        mood: str = 'neutral'
        confidence: float = 0.5

        # Multi-modal logic combining signals from vision, face, expression, and wedding events.
        
        if summary and summary.smile_score > 40:
            mood = 'joyful'
            confidence = summary.smile_score / 100.0
            evidence.append(EmotionEvidence(source='facial_expression', confidence=confidence, details=f"High smile score of {summary.smile_score:.0f}"))

        if request.vision_signals and request.vision_signals.optical_flow_motion > 0.7:
             if mood == 'joyful':
                 mood = 'celebratory'
                 confidence = (confidence + request.vision_signals.optical_flow_motion) / 2
             else:
                 mood = 'energetic'
                 confidence = request.vision_signals.optical_flow_motion
             evidence.append(EmotionEvidence(source='vision_motion', confidence=request.vision_signals.optical_flow_motion, details="High motion detected"))

        if request.wedding_event_signals:
            event = request.wedding_event_signals.dominant_event
            event_confidence = request.wedding_event_signals.confidence
            if event in ['Bidaai', 'Pheras'] and event_confidence > 0.5:
                mood = 'emotional'
                confidence = event_confidence
                evidence.append(EmotionEvidence(source='wedding_event', confidence=confidence, details=f"Detected event: {event}"))
            elif event in ['Dance', 'Baraat', 'Sangeet'] and event_confidence > 0.5:
                mood = 'celebratory'
                confidence = max(confidence, event_confidence)
                evidence.append(EmotionEvidence(source='wedding_event', confidence=confidence, details=f"Detected event: {event}"))

        if not evidence:
            mood = 'uncertain'
            confidence = 0.3
            evidence.append(EmotionEvidence(source='temporal_context', confidence=confidence, details="Insufficient evidence from available signals."))

        return ClipMoodEstimate(
            dominant_mood=mood,
            confidence=confidence,
            evidence=evidence,
            usable_for_edit=confidence > 0.4,
            recommended_handling='normal'
        )