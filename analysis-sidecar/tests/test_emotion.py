import asyncio
from typing import List, Optional
from app.emotion_models import EmotionReport, EmotionRequest
from app.emotion_service import EmotionService, ExpressionProvider, DisabledExpressionProvider
import pytest
from app.face_models import DetectedFace, FaceReport

class MockExpressionProvider(ExpressionProvider):
    def get_name(self) -> str:
        return "mock"
    def is_enabled(self) -> bool:
        return True
    def get_reason(self) -> Optional[str]:
        return None
    async def estimate(self, frame, faces):
        pass

@pytest.fixture
def service():
    service = EmotionService(bind="127.0.0.1", base_url="http://localhost:8000", version="test")
    service.providers = [MockExpressionProvider(service.runtime)]
    return service

@pytest.mark.anyio
async def test_no_faces(service: EmotionService):
    req = EmotionRequest(
        schemaVersion=1,
        jobId="test_no_faces",
        requestId="test_no_faces_req",
        requestedAt="now",
        approvedRoots=[],
        faceReport=FaceReport(
            jobId="face_job",
            requestId="face_req",
            status="completed",
            sidecar={"status": "available"},
            faceModelVersion="test",
            capabilities={"available": True, "detector": "test", "landmarksAvailable": True, "embeddingProviderEnabled": False},
            startedAt="now",
            faces=[],
            timeline=[]
        ),
        cache={},
        limits={}
    )
    job_id = await service.submit(req)
    await asyncio.sleep(0.1)
    report = await service.get(job_id)
    assert report.status == "completed"
    assert len(report.clips) == 0

@pytest.mark.anyio
async def test_one_face(service: EmotionService):
    req = EmotionRequest(
        schemaVersion=1,
        jobId="test_one_face",
        requestId="test_one_face_req",
        requestedAt="now",
        approvedRoots=[],
        faceReport=FaceReport(
            jobId="face_job",
            requestId="face_req",
            status="completed",
            sidecar={"status": "available"},
            faceModelVersion="test",
            capabilities={"available": True, "detector": "test", "landmarksAvailable": True, "embeddingProviderEnabled": False},
            startedAt="now",
            faces=[
                DetectedFace(
                    id="face1",
                    frameSampleId="frame1",
                    clipId="clip1",
                    boundingBox={"x": 0, "y": 0, "width": 10, "height": 10},
                    confidence=0.9,
                    faceSize=100,
                    frontalScore=0.9,
                    eyeVisibility=0.9,
                    occlusionEstimate=0.1,
                    blur=0.1,
                    lighting=0.9,
                    qualityScore=0.9,
                    rejectScore=0.1
                )
            ],
            timeline=[
                {"frameSampleId": "frame1", "timestampSeconds": 1.0, "clipId": "clip1", "faceId": "face1", "clusterId": "cluster1", "confidence": 0.9}
            ]
        ),
        cache={},
        limits={}
    )
    job_id = await service.submit(req)
    await asyncio.sleep(0.1)
    report = await service.get(job_id)
    assert report.status == "completed"
    assert len(report.clips) == 1
    assert report.clips[0].clipId == "clip1"

@pytest.mark.anyio
async def test_cancellation(service: EmotionService):
    req = EmotionRequest(
        schemaVersion=1,
        jobId="test_cancellation",
        requestId="test_cancellation_req",
        requestedAt="now",
        approvedRoots=[],
        faceReport=FaceReport(
            jobId="face_job",
            requestId="face_req",
            status="completed",
            sidecar={"status": "available"},
            faceModelVersion="test",
            capabilities={"available": True, "detector": "test", "landmarksAvailable": True, "embeddingProviderEnabled": False},
            startedAt="now",
            faces=[
                DetectedFace(
                    id="face1",
                    frameSampleId="frame1",
                    clipId="clip1",
                    boundingBox={"x": 0, "y": 0, "width": 10, "height": 10},
                    confidence=0.9,
                    faceSize=100,
                    frontalScore=0.9,
                    eyeVisibility=0.9,
                    occlusionEstimate=0.1,
                    blur=0.1,
                    lighting=0.9,
                    qualityScore=0.9,
                    rejectScore=0.1
                )
            ],
            timeline=[
                {"frameSampleId": "frame1", "timestampSeconds": 1.0, "clipId": "clip1", "faceId": "face1", "clusterId": "cluster1", "confidence": 0.9}
            ]
        ),
        cache={},
        limits={}
    )
    job_id = await service.submit(req)
    await service.cancel(job_id)
    report = await service.get(job_id)
    assert report.status == "cancelled"

@pytest.mark.anyio
async def test_disabled_provider(service: EmotionService):
    class DisabledProvider(ExpressionProvider):
        def get_name(self) -> str: return "disabled"
        def is_enabled(self) -> bool: return False
        def get_reason(self) -> Optional[str]: return "test"
        async def estimate(self, frame, faces): pass
    
    service.providers = [DisabledProvider(service.runtime), DisabledExpressionProvider(service.runtime)]
    caps = service.capabilities()
    assert not caps.available
    assert caps.providers[0].name == "disabled"
    assert not caps.providers[0].enabled
    assert caps.providers[1].name == "DisabledExpressionProvider"
    assert caps.providers[1].enabled is True
    
    active_provider = service._get_active_provider()
    assert isinstance(active_provider, DisabledExpressionProvider)
