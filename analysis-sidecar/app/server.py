from __future__ import annotations

import platform
from typing import Callable

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.responses import JSONResponse

from .models import ExtractionRequest
from .service import ExtractionService


def create_app(service: ExtractionService, token: str) -> FastAPI:
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

    return app
