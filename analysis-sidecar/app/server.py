from __future__ import annotations

import platform
from typing import Callable

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.responses import JSONResponse

from .models import ExtractionRequest
from .service import ExtractionService
from .vision_models import VisionRequest
from .vision_service import VISION_VERSION, VisionService, build_vision_capabilities


def create_app(service: ExtractionService, vision_service: VisionService, token: str) -> FastAPI:
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
            ],
        }

    @app.get("/vision/capabilities", dependencies=[Depends(require_token)])
    async def vision_capabilities():
        return build_vision_capabilities(vision_service.runtime).model_dump()

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

    return app
