from __future__ import annotations
import asyncio, hashlib, json
from datetime import datetime, timezone
from typing import Dict
from .cache import CacheStore
from .security import ensure_within_roots
from .vision import VisionRuntime
from .face import AnonymousFaceAnalyzer, FaceEmbeddingProvider, cluster_anonymous
from .face_models import FaceCapabilities, FaceReport, FaceRequest, FACE_MODEL_VERSION
from .models import SidecarStatus

class FaceService:
 def __init__(self,bind:str,base_url:str,version:str)->None: self.bind=bind; self.base_url=base_url; self.version=version; self.runtime=VisionRuntime(); self.jobs:Dict[str,FaceReport]={}; self.cancelled:set[str]=set()
 def capabilities(self)->FaceCapabilities:
  available=self.runtime.cv2 is not None and hasattr(self.runtime.cv2,"CascadeClassifier")
  return FaceCapabilities(available=available,detector="opencv-haar-fallback",detectorArtifact="OpenCV bundled haarcascade_frontalface_default.xml (BSD-3-Clause)",landmarksAvailable=False,embeddingProviderEnabled=False,reason=None if available else "OpenCV face detector is unavailable. YuNet is supported only when its MIT artifact is explicitly provisioned locally. Reference matching unavailable: commercial recognition model not configured.")
 async def submit(self,request:FaceRequest)->str:
  report=FaceReport(jobId=request.jobId,requestId=request.requestId,status="running",sidecar=SidecarStatus(status="available",baseUrl=self.base_url,version=self.version),faceModelVersion=FACE_MODEL_VERSION,capabilities=self.capabilities(),progress={"completedFrames":0,"totalFrames":len(request.frames),"currentFrameSampleId":None},startedAt=_now())
  self.jobs[request.jobId]=report; asyncio.create_task(self._run(request,report)); return request.jobId
 async def get(self,id:str)->FaceReport:
  if id not in self.jobs: raise KeyError(id)
  return self.jobs[id]
 async def cancel(self,id:str)->None: self.cancelled.add(id); (await self.get(id)).status="cancelled"
 async def shutdown(self)->None: self.cancelled.update(self.jobs)
 async def _run(self,r:FaceRequest,report:FaceReport)->None:
  if not report.capabilities.available: report.status="sidecar-unavailable"; report.warnings.append(report.capabilities.reason or "Face detector unavailable."); report.completedAt=_now(); return
  analyzer=AnonymousFaceAnalyzer(self.runtime.cv2); all_faces=[]; timestamps={}
  try:
   for frame in r.frames:
    if r.jobId in self.cancelled: report.status="cancelled"; break
    ensure_within_roots(frame.imagePath,r.approvedRoots); image=await asyncio.to_thread(self.runtime.cv2.imread,frame.imagePath)
    if image is None: report.warnings.append(f"Invalid extracted frame: {frame.frameSampleId}")
    else: all_faces.extend(analyzer.detect(image,frame.frameSampleId,frame.clipId)); timestamps[frame.frameSampleId]=frame.sourceTimeSeconds
    report.progress={"completedFrames":report.progress.get("completedFrames",0)+1,"totalFrames":len(r.frames),"currentFrameSampleId":frame.frameSampleId}
   if report.status=="running": report.status="completed"
   report.faces=all_faces; report.clusters,report.timeline=cluster_anonymous(all_faces,timestamps); report.cacheMisses=len(r.frames); report.warnings.append(FaceEmbeddingProvider.reason); report.completedAt=_now()
  except Exception as e: report.status="failed"; report.warnings.append(str(e)); report.completedAt=_now()
def _now()->str:return datetime.now(timezone.utc).isoformat()
