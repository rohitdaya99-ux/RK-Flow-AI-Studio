from abc import ABC, abstractmethod
from typing import List
from app.models import FacialExpressionEstimate, FrameSample, Face

class ExpressionProvider(ABC):
    """Abstract base class for expression estimation providers."""

    @abstractmethod
    def get_name(self) -> str:
        ...

    @abstractmethod
    def is_enabled(self) -> bool:
        ...

    @abstractmethod
    def get_reason(self) -> str:
        ...

    @abstractmethod
    def analyze_face(self, face: Face, frame_timestamp: float) -> FacialExpressionEstimate:
        ...


class DisabledExpressionProvider(ExpressionProvider):
    """A provider that is always disabled and returns a reason."""
    def __init__(self, reason: str = "Provider not configured or unavailable."):
        self._reason = reason

    def get_name(self) -> str:
        return "DisabledProvider"

    def is_enabled(self) -> bool:
        return False

    def get_reason(self) -> str:
        return self._reason

    def analyze_face(self, face: Face, frame_timestamp: float) -> FacialExpressionEstimate:
        return FacialExpressionEstimate(
            label='uncertain',
            confidence=0.0,
            provider=self.get_name(),
            face_id=face.anonymous_id,
            frame_timestamp=frame_timestamp,
            uncertainty_reason=self.get_reason()
        )


class LocalLandmarkExpressionProvider(ExpressionProvider):
    """
    Estimates expressions using geometric properties of facial landmarks.
    Does not use any identity recognition or complex classification model.
    """
    def get_name(self) -> str:
        return "LocalLandmarkExpressionProvider"

    def is_enabled(self) -> bool:
        # In a real scenario, this would check if landmark capabilities are present.
        return True

    def get_reason(self) -> str:
        return "Enabled. Uses geometric analysis of facial landmarks."

    def analyze_face(self, face: Face, frame_timestamp: float) -> FacialExpressionEstimate:
        # Basic quality checks
        if face.confidence < 0.7 or face.blur_score > 0.6:
            return FacialExpressionEstimate(label='uncertain', confidence=face.confidence, provider=self.get_name(), face_id=face.anonymous_id, frame_timestamp=frame_timestamp, qualityWarning="Low confidence or high blur")

        smile_confidence = self._calculate_smile_proxy(face.landmarks)
        eye_openness = self._calculate_eye_openness(face.landmarks)

        label = 'neutral'
        confidence = 1.0 - smile_confidence

        if smile_confidence > 0.5:
            label = 'smiling'
            confidence = smile_confidence
        
        if eye_openness < 0.15: # Example threshold for closed eyes
            label = 'eyes-closed'
            confidence = 1.0 - eye_openness

        return FacialExpressionEstimate(
            label=label,
            confidence=confidence,
            provider=self.get_name(),
            face_id=face.anonymous_id,
            frame_timestamp=frame_timestamp,
        )

    def _calculate_smile_proxy(self, landmarks) -> float:
        # Placeholder for geometric calculation based on mouth landmarks.
        try:
            mouth_width = abs(landmarks.mouth_right.x - landmarks.mouth_left.x)
            eye_dist = abs(landmarks.right_eye[0].x - landmarks.left_eye[0].x)
            if eye_dist > 0:
                ratio = mouth_width / eye_dist
                return min(1.0, max(0.0, (ratio - 0.45) * 2.5))
        except (AttributeError, IndexError):
            pass
        return 0.0

    def _calculate_eye_openness(self, landmarks) -> float:
        # Placeholder for geometric calculation based on eye landmarks (eye aspect ratio).
        return 0.8 # Default to open


class LocalModelExpressionProvider(DisabledExpressionProvider):
    """
    A provider that uses a local, pretrained model. Disabled by default.
    """
    def __init__(self):
        super().__init__(reason="No commercially-approved model artifact is configured or licensed.")

    def get_name(self) -> str:
        return "LocalModelExpressionProvider"