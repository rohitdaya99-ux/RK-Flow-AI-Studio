from __future__ import annotations

import platform
from typing import Callable

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.responses import JSONResponse

from .models import ExtractionRequest
from .service import ExtractionService
from .vision_models import VisionRequest
from .vision_service import VISION_VERSION, VisionService, build_vision_capabilities
from .face_models import FaceRequest
from .face_service import FaceService
from .emotion_models import EmotionRequest
from .emotion_service import EmotionService


def create_app(
    service: ExtractionService,
    vision_service: VisionService,
    token: str,
    face_service: FaceService | None = None,
    emotion_service: EmotionService | None = None,
) -> FastAPI:
    face_service = face_service or FaceService(service.bind, service.base_url, service.version)
    emotion_service = emotion_service or EmotionService(service.bind, service.base_url, service.version)
    app = FastAPI(title="RK Flow Analysis Sidecar", version=service.version)

    def require_token(authorization: str = Header(default="")) -> None:
        expected = f"Bearer {token}"
        if authorization != expected:
            raise HTTPException(status_code=401, detail="Unauthorized")

    @app.get("/health", dependencies=[Depends(require_token)])
    async def health() -> dict:
        return {
            "status": "ok",
            "bind": service.bind,
            "version": service.version,
        }

    @app.get("/capabilities", dependencies=[Depends(require_token)])
    async def capabilities() -> dict:
        return {
            "bind": service.bind,
            "version": service.version,
            "python_version": platform.python_version(),
            "features": [
                "ffprobe-metadata",
                "frame-extraction",
                "audio-proxy-extraction",
                "cache-cleanup",
                "job-cancellation",
                "vision-analysis",
                "face-detection",
                "emotion-estimation",
            ],
        }

    @app.get("/vision/capabilities", dependencies=[Depends(require_token)])
    async def vision_capabilities():
        return build_vision_capabilities(vision_service.runtime).model_dump()

    @app.get("/face/capabilities", dependencies=[Depends(require_token)])
    async def face_capabilities(): return face_service.capabilities().model_dump()

    @app.get("/emotion/capabilities", dependencies=[Depends(require_token)])
    async def emotion_capabilities(): return emotion_service.capabilities().model_dump()

    @app.post("/face/jobs", dependencies=[Depends(require_token)])
    async def face_submit(request: FaceRequest): return {"jobId": await face_service.submit(request)}

    @app.get("/face/jobs/{job_id}", dependencies=[Depends(require_token)])
    async def face_get(job_id: str):
        try: return await face_service.get(job_id)
        except KeyError as exc: raise HTTPException(status_code=404,detail=f"Unknown face job: {job_id}") from exc

    @app.post("/face/jobs/{job_id}/cancel", dependencies=[Depends(require_token)])
    async def face_cancel(job_id: str): await face_service.cancel(job_id); return JSONResponse({"ok":True})

    @app.post("/emotion/jobs", dependencies=[Depends(require_token)])
    async def emotion_submit(request: EmotionRequest): return {"jobId": await emotion_service.submit(request)}

    @app.get("/emotion/jobs/{job_id}", dependencies=[Depends(require_token)])
    async def emotion_get(job_id: str):
        try: return await emotion_service.get(job_id)
        except KeyError as exc: raise HTTPException(status_code=404,detail=f"Unknown emotion job: {job_id}") from exc

    @app.post("/emotion/jobs/{job_id}/cancel", dependencies=[Depends(require_token)])
    async def emotion_cancel(job_id: str): await emotion_service.cancel(job_id); return JSONResponse({"ok":True})

    @app.post("/vision/jobs", dependencies=[Depends(require_token)])
    async def submit_vision_job(request: VisionRequest) -> dict:
        job_id = await vision_service.submit(request)
        return {"jobId": job_id}

    @app.get("/vision/jobs/{job_id}", dependencies=[Depends(require_token)])
    async def get_vision_job(job_id: str):
        try:
            return await vision_service.get(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail=f"Unknown vision job: {job_id}") from exc

    @app.post("/vision/jobs/{job_id}/cancel", dependencies=[Depends(require_token)])
    async def cancel_vision_job(job_id: str) -> JSONResponse:
        try:
            await vision_service.cancel(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail=f"Unknown vision job: {job_id}") from exc
        return JSONResponse({"ok": True})

    @app.post("/extraction/jobs", dependencies=[Depends(require_token)])
    async def submit_extraction_job(request: ExtractionRequest) -> dict:
        job_id = await service.submit(request)
        return {"jobId": job_id}

    @app.get("/extraction/jobs/{job_id}", dependencies=[Depends(require_token)])
    async def get_extraction_job(job_id: str):
        try:
            return await service.get(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail=f"Unknown extraction job: {job_id}") from exc

    @app.post("/extraction/jobs/{job_id}/cancel", dependencies=[Depends(require_token)])
    async def cancel_extraction_job(job_id: str) -> JSONResponse:
        try:
            await service.cancel(job_id)
        except KeyError as exc:
            raise HTTPException(status_code=404, detail=f"Unknown extraction job: {job_id}") from exc
        return JSONResponse({"ok": True})

    @app.on_event("shutdown")
    async def shutdown() -> None:
        await service.shutdown()
        await vision_service.shutdown()
        await face_service.shutdown()
        await emotion_service.shutdown()

    return app
