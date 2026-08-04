from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import wave
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

from .cache import CacheStore
from .models import (
    AudioExtractionResult,
    AudioExtractionTask,
    AudioWaveformPoint,
    FrameExtractionTask,
    FrameSamplePlan,
    FrameSampleResult,
)


class ExtractionDependencyError(RuntimeError):
    """Raised when ffmpeg or ffprobe is unavailable."""


def ensure_ffmpeg_tools() -> None:
    if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
        raise ExtractionDependencyError("FFmpeg and ffprobe must be installed and available on PATH.")


def probe_media(media_path: Path) -> Dict[str, object]:
    ensure_ffmpeg_tools()
    command = [
        "ffprobe",
        "-v",
        "error",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        str(media_path),
    ]
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    if completed.returncode != 0:
        raise RuntimeError(completed.stderr.strip() or f"ffprobe failed for {media_path}")
    return json.loads(completed.stdout)


def extract_frame_sample(
    cache_store: CacheStore,
    task: FrameExtractionTask,
    sample: FrameSamplePlan,
) -> Tuple[FrameSampleResult, bool]:
    ensure_ffmpeg_tools()
    output_path = cache_store.frame_output_path(task.cacheKey, sample.id)
    cache_hit = output_path.exists()

    if not cache_hit:
        command = [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-ss",
            f"{sample.sourceTimeSeconds:.3f}",
            "-i",
            task.mediaPath,
            "-frames:v",
            "1",
            "-vf",
            "scale='if(gt(iw,ih),min(640,iw),-2)':'if(gt(ih,iw),min(640,ih),-2)'",
            str(output_path),
        ]
        completed = subprocess.run(command, capture_output=True, text=True, check=False)
        if completed.returncode != 0:
            raise RuntimeError(completed.stderr.strip() or f"FFmpeg frame extraction failed for {task.clipName}")

    content_hash = hashlib.sha1(output_path.read_bytes()).hexdigest()
    return (
        FrameSampleResult(
            id=sample.id,
            clipId=task.clipId,
            sourceTimeSeconds=sample.sourceTimeSeconds,
            sampleKind=sample.sampleKind,
            imagePath=str(output_path),
            contentHash=content_hash,
            cacheKey=task.cacheKey,
            cacheStatus="hit" if cache_hit else "miss",
            extractionStatus="available",
            capturedAt=_now_iso(),
        ),
        cache_hit,
    )


def extract_audio_proxy(
    cache_store: CacheStore,
    task: AudioExtractionTask,
) -> Tuple[AudioExtractionResult, bool]:
    ensure_ffmpeg_tools()
    output_path = cache_store.audio_output_path(task.cacheKey, task.id)
    cache_hit = output_path.exists()
    metadata = probe_media(Path(task.mediaPath))

    if not cache_hit:
        command = [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-i",
            task.mediaPath,
            "-vn",
            "-acodec",
            "pcm_s16le",
            "-ar",
            "16000",
            "-ac",
            "1",
            str(output_path),
        ]
        completed = subprocess.run(command, capture_output=True, text=True, check=False)
        if completed.returncode != 0:
            raise RuntimeError(completed.stderr.strip() or f"FFmpeg audio extraction failed for {task.label}")

    format_info = metadata.get("format", {}) if isinstance(metadata, dict) else {}
    streams = metadata.get("streams", []) if isinstance(metadata, dict) else []
    audio_stream = next((stream for stream in streams if stream.get("codec_type") == "audio"), {})

    return (
        AudioExtractionResult(
            id=task.id,
            taskId=task.id,
            sourceKind=task.sourceKind,
            clipId=task.clipId,
            sourcePath=task.mediaPath,
            outputPath=str(output_path),
            cacheKey=task.cacheKey,
            cacheStatus="hit" if cache_hit else "miss",
            extractionStatus="available",
            durationSeconds=float(format_info.get("duration", 0.0)) if format_info.get("duration") else None,
            sampleRate=int(audio_stream.get("sample_rate")) if audio_stream.get("sample_rate") else None,
            channels=int(audio_stream.get("channels")) if audio_stream.get("channels") else None,
            codec=str(audio_stream.get("codec_name")) if audio_stream.get("codec_name") else None,
            waveform=build_waveform_points(output_path),
            extractedAt=_now_iso(),
        ),
        cache_hit,
    )


def build_waveform_points(audio_path: Path, sample_points: int = 24) -> List[AudioWaveformPoint]:
    with wave.open(str(audio_path), "rb") as wav_file:
        frame_count = wav_file.getnframes()
        sample_width = wav_file.getsampwidth()
        sample_rate = wav_file.getframerate()
        if frame_count == 0 or sample_width <= 0:
            return []

        window = max(1, frame_count // sample_points)
        points: List[AudioWaveformPoint] = []

        for index in range(sample_points):
            wav_file.setpos(min(frame_count - 1, index * window))
            chunk = wav_file.readframes(window)
            if not chunk:
                break
            samples = [
                int.from_bytes(chunk[offset : offset + sample_width], "little", signed=True)
                for offset in range(0, len(chunk), sample_width)
            ]
            if not samples:
                continue
            amplitude = sum(abs(value) for value in samples) / len(samples)
            points.append(
                AudioWaveformPoint(
                    timeSeconds=round((index * window) / max(1, sample_rate), 3),
                    amplitude=round(amplitude, 3),
                )
            )
        return points


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
