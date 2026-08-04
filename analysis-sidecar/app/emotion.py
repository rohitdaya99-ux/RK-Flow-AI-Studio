from fastapi import APIRouter, Security
from app.auth import bearer_scheme
from app.models import (
    EmotionAnalysisRequest,
    EmotionReport,
    EmotionCapabilities,
)
from app.services.emotion_analysis.service import EmotionService

router = APIRouter()
emotion_service = EmotionService()

@router.get("/emotion/capabilities", response_model=EmotionCapabilities, tags=["Emotion"])
async def get_emotion_capabilities(token: str = Security(bearer_scheme)):
    # Token validation would be handled by the dependency
    return emotion_service.get_capabilities()

@router.post("/emotion/analyze", response_model=EmotionReport, tags=["Emotion"])
async def analyze_emotion(request: EmotionAnalysisRequest, token: str = Security(bearer_scheme)):
    # Token and path validation would occur here in a real implementation
    report = emotion_service.analyze_clip(request)
    # Caching logic would wrap this call
    return report