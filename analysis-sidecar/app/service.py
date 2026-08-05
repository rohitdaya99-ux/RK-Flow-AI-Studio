import subprocess
import json
import os
import hashlib
import time
from typing import List, Optional, Dict
import librosa
import numpy as np
import soundfile as sf

from app.models import (
    MusicAnalysisRequest, MusicAnalysisReport, MusicCapabilities, MusicProviderStatus,
    MusicSource, AudioProbeResult, BeatPoint, OnsetPoint, EnergyPoint, MusicSection,
    MusicEditorialProfile, AudioAnalysis, SFXOpportunity,
    TempoCategory, EditorialCategory, MusicSectionType, EmotionEvidence
)
from .providers import (
    MusicCatalogProvider, LocalMusicLibraryProvider,
    PremiereProjectMusicProvider, DisabledMusicCatalogProvider, LicensedCatalogProvider
)

class MusicService:
    def __init__(self, approved_roots: Optional[List[str]] = None):
        self._providers: List[MusicCatalogProvider] = [
            LicensedCatalogProvider(), # Disabled by default
            LocalMusicLibraryProvider(),
            PremiereProjectMusicProvider(),
            DisabledMusicCatalogProvider("No music catalog providers are enabled.")
        ]
        self.approved_roots = [os.path.abspath(p) for p in approved_roots] if approved_roots else []
        self.ffmpeg_path = "ffmpeg" # Assume ffmpeg is in PATH for production
        self.ffprobe_path = "ffprobe" # Assume ffprobe is in PATH for production
        self.music_analysis_version = "0.1.0"
        self._cache: Dict[str, MusicAnalysisReport] = {}
        self._cancellation_requested = False

    def request_cancellation(self):
        self._cancellation_requested = True

    def _check_ffmpeg_available(self) -> bool:
        try:
            subprocess.run([self.ffmpeg_path, "-version"], capture_output=True, check=True)
            subprocess.run([self.ffprobe_path, "-version"], capture_output=True, check=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False

    def _check_librosa_available(self) -> bool:
        try:
            import librosa
            import numpy
            import soundfile
            return True
        except ImportError:
            return False

    def get_capabilities(self) -> MusicCapabilities:
        ffmpeg_available = self._check_ffmpeg_available()
        librosa_available = self._check_librosa_available()
        
        providers_status = [
            MusicProviderStatus(
                provider_name=p.get_name(),
                enabled=p.is_enabled(),
                reason=p.get_reason()
            ) for p in self._providers
        ]

        return MusicCapabilities(
            available=ffmpeg_available and librosa_available,
            version=self.music_analysis_version,
            ffmpeg_available=ffmpeg_available,
            librosa_available=librosa_available,
            providers=providers_status,
            reason="FFmpeg or librosa not found." if not (ffmpeg_available and librosa_available) else None
        )

    def _probe_audio_file(self, file_path: str) -> AudioProbeResult:
        try:
            cmd = [
                self.ffprobe_path,
                "-v", "quiet",
                "-print_format", "json",
                "-show_format",
                "-show_streams",
                file_path
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            probe_data = json.loads(result.stdout)

            format_data = probe_data.get("format", {})
            audio_stream = next((s for s in probe_data.get("streams", []) if s.get("codec_type") == "audio"), {})

            duration = float(format_data.get("duration", 0))
            codec = audio_stream.get("codec_name")
            container = format_data.get("format_name")
            sample_rate = int(audio_stream.get("sample_rate", 0))
            channels = int(audio_stream.get("channels", 0))
            bit_depth = int(audio_stream.get("bits_per_sample", 0))
            file_size = int(format_data.get("size", 0))

            # Placeholder for actual fingerprinting
            file_hash = self._generate_file_hash(file_path)

            return AudioProbeResult(
                duration_seconds=duration,
                codec=codec,
                container=container,
                sample_rate=sample_rate,
                channels=channels,
                bit_depth=bit_depth,
                file_size=file_size,
                fingerprint=file_hash,
                source_path_status="approved", # Assuming path is already approved by caller
            )
        except (subprocess.CalledProcessError, FileNotFoundError, json.JSONDecodeError) as e:
            return AudioProbeResult(
                duration_seconds=0.0,
                fingerprint="unknown",
                source_path_status="unavailable",
                capability_reason=f"Failed to probe audio: {e}"
            )

    def _generate_file_hash(self, file_path: str) -> str:
        """Generates a SHA256 hash of the file content."""
        sha256_hash = hashlib.sha256()
        try:
            with open(file_path, "rb") as f:
                # Read and update hash in chunks to handle large files
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            return sha256_hash.hexdigest()
        except IOError:
            return "unknown"

    def _is_path_approved(self, file_path: str) -> bool:
        """Checks if the file path is within one of the approved root directories."""
        if not self.approved_roots:
            return True # If no roots are configured, allow all for local dev.
        
        abs_file_path = os.path.abspath(file_path)
        for root in self.approved_roots:
            if os.path.commonpath([root, abs_file_path]) == root:
                return True
        return False

    def analyze_audio(self, request: MusicAnalysisRequest) -> MusicAnalysisReport:
        capabilities = self.get_capabilities()
        if not capabilities.available:
            return MusicAnalysisReport(
                job_id=request.clip_id, # Using clip_id as job_id for simplicity
                request_id="music-analysis-request",
                status="failed",
                sidecar={"status": "unavailable", "reason": capabilities.reason},
                music_analysis_version=self.music_analysis_version,
                capabilities=capabilities,
                progress={"completedAudioSources": 0, "totalAudioSources": 1},
                audio_analyses=[],
                sfx_opportunities=[],
                failures=[{"message": capabilities.reason}],
                warnings=[],
                started_at=self._get_current_utc_time()
            )

        audio_path = request.music_source.path

        if request.music_source.type == "social_reference":
            # Do not analyze, just return a report indicating it's a reference.
            return MusicAnalysisReport(
                job_id=request.clip_id, request_id="music-analysis-request", status="completed",
                sidecar={"status": "available", "version": self.music_analysis_version},
                music_analysis_version=self.music_analysis_version, capabilities=capabilities,
                progress={"completedAudioSources": 1, "totalAudioSources": 1},
                audio_analyses=[], sfx_opportunities=[], failures=[],
                warnings=["Social link is reference-only; no audio analysis performed."],
                started_at=self._get_current_utc_time(), completed_at=self._get_current_utc_time()
            )

        if not audio_path:
            return self._create_failure_report(request, capabilities, "Music source path is missing.")

        if not self._is_path_approved(audio_path):
            return self._create_failure_report(request, capabilities, f"Path is not in approved roots: {audio_path}")
        if not os.path.exists(audio_path):
            return MusicAnalysisReport(
                job_id=request.clip_id,
                request_id="music-analysis-request",
                status="failed",
                sidecar={"status": "available", "version": self.music_analysis_version},
                music_analysis_version=self.music_analysis_version,
                capabilities=capabilities,
                progress={"completedAudioSources": 0, "totalAudioSources": 1},
                audio_analyses=[],
                sfx_opportunities=[],
                failures=[{"message": "Audio file not found or path not provided."}],
                warnings=[],
                started_at=self._get_current_utc_time()
            )

        # Caching logic
        cache_key = f"music_analysis_{self._generate_file_hash(audio_path)}_{self.music_analysis_version}"
        if cache_key in self._cache:
            cached_report = self._cache[cache_key]
            # Update cache status in the nested AudioAnalysis object
            if cached_report.audio_analyses:
                cached_report.audio_analyses[0].cache_status = "hit"
            return cached_report

        probe_result = self._probe_audio_file(audio_path)
        if probe_result.source_path_status == "unavailable":
             return MusicAnalysisReport(
                job_id=request.clip_id,
                request_id="music-analysis-request",
                status="failed",
                sidecar={"status": "available", "version": self.music_analysis_version},
                music_analysis_version=self.music_analysis_version,
                capabilities=capabilities,
                progress={"completedAudioSources": 0, "totalAudioSources": 1},
                audio_analyses=[],
                sfx_opportunities=[],
                failures=[{"message": probe_result.capability_reason}],
                warnings=[],
                started_at=self._get_current_utc_time()
            )

        if probe_result.duration_seconds == 0:
            return self._create_failure_report(request, capabilities, "Audio file is empty or has zero duration.")

        if self._cancellation_requested:
            self._cancellation_requested = False # Reset for next run
            return self._create_cancellation_report(request, capabilities)

        # Load audio
        try:
            y, sr = librosa.load(audio_path, sr=None, mono=False)
            if y.ndim > 1:
                y = librosa.to_mono(y)
        except Exception as e:
            return self._create_failure_report(request, capabilities, f"Failed to load audio file: {e}")

        # Tempo and Beat Analysis
        # PLACEHOLDER: Confidence for BPM is not directly provided by librosa.
        bpm, beats = librosa.beat.beat_track(y=y, sr=sr, units='time', tightness=100)
        beat_points = [BeatPoint(timestamp=float(b), confidence=0.8, is_downbeat=False) for b in beats]

        # Onset Detection
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        onsets = librosa.onset.onset_detect(y=y, sr=sr, onset_envelope=onset_env, units='time')
        onset_strengths = onset_env[librosa.time_to_frames(onsets, sr=sr)]
        onset_points = [OnsetPoint(timestamp=float(o), strength=float(s)) for o, s in zip(onsets, onset_strengths)]

        # Energy Curve (RMS)
        rms = librosa.feature.rms(y=y).flatten()
        times = librosa.times_like(rms, sr=sr)
        silence_thresh = rms.mean() * 0.1 # Simple silence threshold
        energy_curve = [
            EnergyPoint(
                timestamp=float(t),
                rms=float(r),
                normalized_energy=float(np.interp(r, (rms.min(), rms.max()), (0, 1))),
                # PLACEHOLDER: These are simple estimations
                onset_strength=float(np.interp(t, librosa.times_like(onset_env, sr=sr), onset_env)),
                beat_proximity=0.0,
                confidence=1.0,
                is_silence=r < silence_thresh
            ) for t, r in zip(times, rms)
        ]

        # Section Analysis (simplified heuristic)
        sections = self._estimate_sections(y, sr, beats, bpm)

        # Editorial Profile
        editorial_profile = self._create_editorial_profile(bpm, sections, energy_curve)

        # SFX Opportunities
        sfx_opportunities = self._generate_sfx_opportunities(energy_curve, sections)

        audio_analysis = AudioAnalysis(
            clip_id=request.clip_id,
            source=request.music_source,
            probe_result=probe_result,
            bpm_estimate=float(bpm),
            bpm_confidence=0.8, # PLACEHOLDER: Confidence is not provided by librosa.
            beat_timestamps=beat_points,
            onset_timestamps=onset_points,
            energy_curve=energy_curve,
            sections=sections,
            editorial_profile=editorial_profile,
            tempo_stability=0.9, # PLACEHOLDER: Requires more complex analysis.
            transient_density=len(onset_points) / probe_result.duration_seconds,
            cache_key=cache_key,
            cache_status="miss", # Always a miss for now
            analysis_version=self.music_analysis_version,
        )

        return MusicAnalysisReport(
            job_id=request.clip_id,
            request_id="music-analysis-request",
            status="completed",
            sidecar={"status": "available", "version": self.music_analysis_version},
            music_analysis_version=self.music_analysis_version,
            capabilities=capabilities,
            progress={"completedAudioSources": 1, "totalAudioSources": 1},
            audio_analyses=[audio_analysis],
            sfx_opportunities=sfx_opportunities,
            failures=[],
            warnings=[],
            started_at=self._get_current_utc_time(),
            completed_at=self._get_current_utc_time()
        )
        
        self._cache[cache_key] = report
        return report

    def _estimate_sections(self, y: np.ndarray, sr: int, beats: np.ndarray, bpm: float) -> List[MusicSection]:
        # HEURISTIC: Simplified section estimation for demonstration. Not a robust segmentation.
        sections: List[MusicSection] = []
        
        # Example: Simple intro/outro based on energy
        if len(y) > 0:
            total_duration = librosa.get_duration(y=y, sr=sr)
            
            # Intro candidate (first 10% of duration or max 15s)
            intro_end = min(total_duration * 0.1, 15.0)
            if intro_end > 0:
                sections.append(MusicSection(
                    id="intro-01", start_seconds=0.0, end_seconds=intro_end,
                    duration_seconds=intro_end, type="intro_candidate", confidence=0.7,
                    energy_average=0.0, energy_peak=0.0, beat_density=0.0, onset_density=0.0,
                    repetition_score=0.0, editorial_suitability=["calm", "build-up"]
                ))
            
            # Outro candidate (last 10% of duration or max 15s)
            outro_start = max(0.0, total_duration - min(total_duration * 0.1, 15.0))
            if outro_start < total_duration:
                sections.append(MusicSection(
                    id="outro-01", start_seconds=outro_start, end_seconds=total_duration,
                    duration_seconds=total_duration - outro_start, type="outro_candidate", confidence=0.7,
                    energy_average=0.0, energy_peak=0.0, beat_density=0.0, onset_density=0.0,
                    repetition_score=0.0, editorial_suitability=["calm", "fade-out"]
                ))

        return sections

    def _create_editorial_profile(self, bpm: float, sections: List[MusicSection], energy_curve: List[EnergyPoint]) -> MusicEditorialProfile:
        # HEURISTIC: This profile is a simple estimation based on basic features.
        tempo_category: TempoCategory = "unknown"
        if bpm < 80: tempo_category = "very_slow"
        elif bpm < 100: tempo_category = "slow"
        elif bpm < 130: tempo_category = "medium"
        elif bpm < 160: tempo_category = "fast"
        else: tempo_category = "very_fast"

        # Simplified energy category
        avg_energy = np.mean([ep.normalized_energy for ep in energy_curve]) if energy_curve else 0.0
        energy_category: EditorialCategory = "unknown"
        if avg_energy < 0.3: energy_category = "calm"
        elif avg_energy < 0.6: energy_category = "mixed"
        else: energy_category = "energetic"

        return MusicEditorialProfile(
            overall_tempo_category=tempo_category,
            overall_energy_category=energy_category,
            cut_density_recommendation="balanced", # PLACEHOLDER
            confidence=0.7,
            evidence=[EmotionEvidence(source="temporal_context", confidence=0.7, details="Heuristic based on BPM and energy.")]
        )

    def _generate_sfx_opportunities(self, energy_curve: List[EnergyPoint], sections: List[MusicSection]) -> List[SFXOpportunity]:
        # HEURISTIC: Generates SFX opportunities based on simple heuristics.
        opportunities: List[SFXOpportunity] = []
        # Example: Add a "Rise" SFX opportunity at the start of a high-energy section
        for section in sections:
            if section.type == "high_energy" and section.start_seconds > 0:
                opportunities.append(SFXOpportunity(
                    category="Rise",
                    timestamp=section.start_seconds - 1.0, # 1 second before
                    reason="Start of high-energy section",
                    intensity=0.8,
                    confidence=0.7,
                    required_asset_availability="unknown",
                    source_provider_status="unknown"
                ))
        return opportunities

    def _create_failure_report(self, request: MusicAnalysisRequest, capabilities: MusicCapabilities, message: str) -> MusicAnalysisReport:
        return MusicAnalysisReport(
            job_id=request.clip_id,
            request_id="music-analysis-request",
            status="failed",
            sidecar={"status": "available", "version": self.music_analysis_version},
            music_analysis_version=self.music_analysis_version,
            capabilities=capabilities,
            progress={"completedAudioSources": 0, "totalAudioSources": 1},
            audio_analyses=[],
            sfx_opportunities=[],
            failures=[{"message": message}],
            warnings=[],
            started_at=self._get_current_utc_time()
        )

    def _create_cancellation_report(self, request: MusicAnalysisRequest, capabilities: MusicCapabilities) -> MusicAnalysisReport:
        return MusicAnalysisReport(
            job_id=request.clip_id,
            request_id="music-analysis-request",
            status="cancelled",
            sidecar={"status": "available", "version": self.music_analysis_version},
            music_analysis_version=self.music_analysis_version,
            capabilities=capabilities,
            progress={"completedAudioSources": 0, "totalAudioSources": 1},
            audio_analyses=[],
            sfx_opportunities=[],
            failures=[],
            warnings=["Analysis was cancelled by user request."],
            started_at=self._get_current_utc_time()
        )

    def _get_current_utc_time(self) -> str:
        # Helper to get current UTC time in ISO format
        return datetime.utcnow().isoformat() + "Z"

from datetime import datetime # Added import