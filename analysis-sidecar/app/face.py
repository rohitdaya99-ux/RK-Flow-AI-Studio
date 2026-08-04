from __future__ import annotations
import hashlib, math
from typing import List, Tuple
import numpy as np
from .face_models import DetectedFace, FaceCluster, FaceTimeline

class FaceEmbeddingProvider:
    """Replaceable recognition boundary. Intentionally disabled pending a commercial model license."""
    enabled = False
    reason = "Reference matching unavailable: commercial recognition model not configured."
    def embed(self, image: np.ndarray) -> None: raise RuntimeError(self.reason)

class AnonymousFaceAnalyzer:
    def __init__(self, cv2: object) -> None:
        self.cv2 = cv2
        cascade = getattr(cv2, "data", None)
        self.detector = cv2.CascadeClassifier(f"{cascade.haarcascades}haarcascade_frontalface_default.xml") if cascade else None
    def detect(self, image: np.ndarray, frame_id: str, clip_id: str) -> List[DetectedFace]:
        if self.detector is None or self.detector.empty(): raise RuntimeError("OpenCV Haar detector artifact is unavailable.")
        gray = self.cv2.cvtColor(image, self.cv2.COLOR_BGR2GRAY)
        boxes = self.detector.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(24,24))
        faces=[]
        for n,(x,y,w,h) in enumerate(boxes):
            crop=gray[y:y+h,x:x+w]; blur=float(self.cv2.Laplacian(crop,self.cv2.CV_64F).var()) if crop.size else 0.; lighting=float(np.mean(crop)) if crop.size else 0.
            size=min(1., (w*h)/max(1,image.shape[0]*image.shape[1])); frontal=min(1., w/max(1,h)); quality=max(0.,min(100., 25+blur/20+size*45-(abs(lighting-128)/128)*25))
            faces.append(DetectedFace(id=f"face-{frame_id}-{n}",frameSampleId=frame_id,clipId=clip_id,boundingBox={"x":int(x),"y":int(y),"width":int(w),"height":int(h)},confidence=.7,faceSize=round(size,3),frontalScore=round(frontal,3),eyeVisibility=0.,occlusionEstimate=round(1-frontal,3),blur=round(blur,3),lighting=round(lighting,3),qualityScore=round(quality,2),rejectScore=round(100-quality,2),capabilityReasons=["Landmarks unavailable: MediaPipe task artifact is not configured.", FaceEmbeddingProvider.reason]))
        return faces

def cluster_anonymous(faces: List[DetectedFace], timestamps: dict) -> Tuple[List[FaceCluster],List[FaceTimeline]]:
    clusters=[]; timeline=[]
    for face in faces:
        # Stable anonymous tracking uses overlap only; it does not create or persist biometric embeddings.
        target=next((c for c in clusters if c.clipIds and face.clipId in c.clipIds),None)
        if target is None: target=FaceCluster(id=f"anonymous-{hashlib.sha1(face.clipId.encode()).hexdigest()[:10]}"); clusters.append(target)
        target.faceIds.append(face.id); target.clipIds=sorted(set(target.clipIds+[face.clipId])); target.bestFrameSampleId=target.bestFrameSampleId or face.frameSampleId
        timeline.append(FaceTimeline(clipId=face.clipId,frameSampleId=face.frameSampleId,timestampSeconds=timestamps.get(face.frameSampleId,0),clusterId=target.id,faceId=face.id,confidence=face.confidence))
    return clusters,timeline
