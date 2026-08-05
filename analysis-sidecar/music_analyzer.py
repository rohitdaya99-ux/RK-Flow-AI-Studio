import librosa
import librosa.display
import numpy as np
import soundfile as sf
import subprocess
import os
from typing import List, Dict, Any, Optional

from models import MusicAnalysisReport, BeatPosition

def check_ffmpeg_available() -> bool:
    """Checks if FFmpeg is available in the system's PATH."""
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def check_ffprobe_available() -> bool:
    """Checks if FFprobe is available in the system's PATH."""
    try:
        subprocess.run(["ffprobe", "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def get_audio_duration(audio_path: str) -> Optional[float]:
    """Gets audio duration using ffprobe."""
    if not check_ffprobe_available():
        return None
    try:
        cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration",
               "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    except (subprocess.CalledProcessError, ValueError):
        return None

def analyze_music_file(audio_path: str, cache_key: str, model_version: str, parameters: Dict[str, Any]) -> MusicAnalysisReport:
    """
    Performs comprehensive music analysis on an audio file.
    """
    warnings: List[str] = []
    errors: List[str] = []
    fallback_reason: Optional[str] = None

    if not os.path.exists(audio_path):
        errors.append(f"Audio file not found: {audio_path}")
        return MusicAnalysisReport(
            cache_key=cache_key,
            model_version=model_version,
            audio_path=audio_path,
            duration=0.0,
            errors=errors,
            fallback_reason="Audio file not found."
        )

    try:
        # Load audio file
        y, sr = librosa.load(audio_path, sr=None)
        duration = librosa.get_duration(y=y, sr=sr)

        # BPM and Beat Tracking
        tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
        beat_positions = [BeatPosition(timestamp=librosa.frames_to_time(b, sr=sr), confidence=1.0) for b in beats]

        # Onset Detection
        onset_env = librosa.onset.onset_detect(y=y, sr=sr, units='frames')
        # Downsample for storage/transfer if too long
        onset_envelope_downsampled = y[onset_env].tolist() if len(onset_env) < 1000 else [] # Example downsampling
        if len(onset_env) >= 1000:
            warnings.append("Onset envelope was too long and was downsampled/skipped for storage.")

        # RMS Energy
        rms = librosa.feature.rms(y=y).flatten()
        rms_energy_downsampled = rms.tolist() if len(rms) < 1000 else [] # Example downsampling
        if len(rms) >= 1000:
            warnings.append("RMS energy was too long and was downsampled/skipped for storage.")

        # Spectral Centroid
        cent = librosa.feature.spectral_centroid(y=y, sr=sr).flatten()
        spectral_centroid_downsampled = cent.tolist() if len(cent) < 1000 else [] # Example downsampling
        if len(cent) >= 1000:
            warnings.append("Spectral centroid was too long and was downsampled/skipped for storage.")

        # Heuristic for energy and loudness curves (simplified)
        energy_curve = (rms / np.max(rms) * 100).tolist() if np.max(rms) > 0 else [0.0] * len(rms)
        loudness_curve = energy_curve # Simplified, can be improved with more advanced psychoacoustic models

        # Heuristic for quiet/emotional sections (very basic)
        quiet_sections = []
        emotional_sections = []
        # This would require more sophisticated analysis, e.g., using dynamics, timbre, etc.
        # For now, just a placeholder.
        warnings.append("Quiet and emotional section detection is currently heuristic and basic.")

        return MusicAnalysisReport(
            cache_key=cache_key,
            model_version=model_version,
            audio_path=audio_path,
            duration=duration,
            bpm=float(tempo),
            beats=beat_positions,
            onset_envelope=onset_envelope_downsampled,
            rms_energy=rms_energy_downsampled,
            spectral_centroid=spectral_centroid_downsampled,
            energy_curve=energy_curve,
            loudness_curve=loudness_curve,
            quiet_sections=quiet_sections,
            emotional_sections=emotional_sections,
            warnings=warnings
        )
    except Exception as e:
        errors.append(f"Music analysis failed: {e}")
        return MusicAnalysisReport(
            cache_key=cache_key,
            model_version=model_version,
            audio_path=audio_path,
            duration=get_audio_duration(audio_path) or 0.0,
            errors=errors,
            fallback_reason="Music analysis library error."
        )
