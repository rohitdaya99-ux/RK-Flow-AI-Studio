from fastapi import APIRouter, Security
from app.auth import bearer_scheme
from app.models import (
    MusicAnalysisRequest,
    MusicAnalysisReport,
    MusicCapabilities,
)
from app.services.music_analysis.service import MusicService

router = APIRouter()
music_service = MusicService()

@router.get("/music/capabilities", response_model=MusicCapabilities, tags=["Music"])
async def get_music_capabilities(token: str = Security(bearer_scheme)):
    # Token validation would be handled by the dependency
    return music_service.get_capabilities()

@router.post("/music/analyze", response_model=MusicAnalysisReport, tags=["Music"])
async def analyze_music(request: MusicAnalysisRequest, token: str = Security(bearer_scheme)):
    # Token and path validation would occur here in a real implementation
    report = music_service.analyze_audio(request)
    # Caching logic would wrap this call
    return report
