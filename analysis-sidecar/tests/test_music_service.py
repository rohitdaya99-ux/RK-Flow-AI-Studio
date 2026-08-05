import os
import shutil
import pytest
import numpy as np
import soundfile as sf
from unittest.mock import patch

from app.services.music_analysis.service import MusicService
from app.models import MusicAnalysisRequest, MusicSource

@pytest.fixture(scope="module")
def audio_fixtures(tmp_path_factory):
    """Creates a temporary directory with synthetic audio files for testing."""
    temp_dir = tmp_path_factory.mktemp("audio_fixtures")
    fixtures = {}
    sr = 44100

    def create_wav(filename, data, sample_rate):
        path = temp_dir / filename
        sf.write(path, data, sample_rate)
        return str(path)

    # 1. Steady click track (120 BPM)
    steady_clicks = np.zeros(sr * 5)
    for i in range(10):
        steady_clicks[int(i * sr * 0.5)] = 1.0
    fixtures["steady_120bpm.wav"] = create_wav("steady_120bpm.wav", steady_clicks, sr)

    # 2. Unstable BPM track (accelerando)
    unstable_clicks = np.zeros(sr * 5)
    t = 0
    i = 0
    while t < sr * 5:
        unstable_clicks[int(t)] = 1.0
        i += 1
        t += sr * (0.6 - i * 0.04)
    fixtures["unstable_bpm.wav"] = create_wav("unstable_bpm.wav", unstable_clicks, sr)

    # 3. Silent section
    signal = np.sin(2 * np.pi * 440 * np.linspace(0, 1, sr))
    silence = np.zeros(sr * 2)
    with_silence = np.concatenate([signal, silence, signal])
    fixtures["with_silence.wav"] = create_wav("with_silence.wav", with_silence, sr)

    # 4. Short mono file
    fixtures["short_mono.wav"] = create_wav("short_mono.wav", signal, sr)

    # 5. Stereo file
    stereo_signal = np.stack([signal, np.sin(2 * np.pi * 660 * np.linspace(0, 1, sr))], axis=-1)
    fixtures["stereo.wav"] = create_wav("stereo.wav", stereo_signal, sr)

    # 6. Empty file
    empty_path = temp_dir / "empty.wav"
    empty_path.touch()
    fixtures["empty.wav"] = str(empty_path)

    # 7. Unsupported format
    unsupported_path = temp_dir / "unsupported.txt"
    unsupported_path.write_text("not audio")
    fixtures["unsupported.txt"] = str(unsupported_path)

    return {"dir": str(temp_dir), "files": fixtures}


@pytest.fixture
def music_service(audio_fixtures):
    """Provides a MusicService instance with an approved root."""
    return MusicService(approved_roots=[audio_fixtures["dir"]])

def test_capabilities_all_available(music_service):
    """Test /music/capabilities when all dependencies are available."""
    with patch('subprocess.run', return_value=True):
        with patch('app.services.music_analysis.service.MusicService._check_librosa_available', return_value=True):
            caps = music_service.get_capabilities()
            assert caps.available is True
            assert caps.ffmpeg_available is True
            assert caps.librosa_available is True
            assert caps.reason is None

def test_capabilities_missing_ffmpeg(music_service):
    """Test /music/capabilities when FFmpeg is missing."""
    with patch('subprocess.run', side_effect=FileNotFoundError):
        with patch('app.services.music_analysis.service.MusicService._check_librosa_available', return_value=True):
            caps = music_service.get_capabilities()
            assert caps.available is False
            assert caps.ffmpeg_available is False
            assert caps.librosa_available is True
            assert "FFmpeg or librosa not found" in caps.reason

def test_disabled_licensed_catalog_provider(music_service):
    """Test that the licensed catalog provider is disabled by default."""
    caps = music_service.get_capabilities()
    licensed_provider_status = next((p for p in caps.providers if p.provider_name == "LicensedCatalogProvider"), None)
    assert licensed_provider_status is not None
    assert licensed_provider_status.enabled is False
    assert "not configured" in licensed_provider_status.reason

def test_path_escape_rejection(music_service, tmp_path):
    """Test that paths outside the approved root are rejected."""
    disallowed_path = tmp_path / "outside.wav"
    disallowed_path.touch()
    
    req = MusicAnalysisRequest(
        clip_id="test_clip",
        music_source=MusicSource(type="local_file", path=str(disallowed_path))
    )
    report = music_service.analyze_audio(req)
    assert report.status == "failed"
    assert "Path is not in approved roots" in report.failures[0]["message"]

def test_steady_bpm_analysis(music_service, audio_fixtures):
    """Test BPM and beat detection on a steady click track."""
    req = MusicAnalysisRequest(
        clip_id="steady_bpm",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["steady_120bpm.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "completed"
    analysis = report.audio_analyses[0]
    assert 118 <= analysis.bpm_estimate <= 122
    assert len(analysis.beat_timestamps) > 8
    assert abs(analysis.beat_timestamps[1].timestamp - analysis.beat_timestamps[0].timestamp - 0.5) < 0.05

def test_unstable_bpm_analysis(music_service, audio_fixtures):
    """Test BPM and beat detection on a track with changing tempo."""
    req = MusicAnalysisRequest(
        clip_id="unstable_bpm",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["unstable_bpm.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "completed"
    analysis = report.audio_analyses[0]
    # The BPM will be an average, but we can check beat intervals
    intervals = np.diff([b.timestamp for b in analysis.beat_timestamps])
    assert intervals[0] > intervals[-1] # Check that tempo increases (intervals decrease)

def test_stereo_and_mono_processing(music_service, audio_fixtures):
    """Test that both stereo and mono files are processed correctly."""
    # Mono
    req_mono = MusicAnalysisRequest(
        clip_id="mono_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["short_mono.wav"])
    )
    report_mono = music_service.analyze_audio(req_mono)
    assert report_mono.status == "completed"
    assert report_mono.audio_analyses[0].probe_result.channels == 1

    # Stereo
    req_stereo = MusicAnalysisRequest(
        clip_id="stereo_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["stereo.wav"])
    )
    report_stereo = music_service.analyze_audio(req_stereo)
    assert report_stereo.status == "completed"
    assert report_stereo.audio_analyses[0].probe_result.channels == 2

def test_energy_curve_and_silence(music_service, audio_fixtures):
    """Test energy curve generation and silence detection."""
    req = MusicAnalysisRequest(
        clip_id="silence_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["with_silence.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "completed"
    energy_curve = report.audio_analyses[0].energy_curve
    
    silent_points = [p for p in energy_curve if 1.5 < p.timestamp < 2.5]
    signal_points = [p for p in energy_curve if p.timestamp < 0.5]

    assert all(p.is_silence for p in silent_points)
    assert any(not p.is_silence for p in signal_points)
    assert np.mean([p.rms for p in silent_points]) < np.mean([p.rms for p in signal_points]) / 10

def test_onset_detection(music_service, audio_fixtures):
    """Test onset timestamp and strength detection."""
    req = MusicAnalysisRequest(
        clip_id="onset_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["steady_120bpm.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "completed"
    onsets = report.audio_analyses[0].onset_timestamps
    assert len(onsets) > 8
    assert all(o.strength > 0 for o in onsets)

def test_intro_outro_candidates(music_service, audio_fixtures):
    """Test heuristic-based intro/outro section detection."""
    req = MusicAnalysisRequest(
        clip_id="section_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["steady_120bpm.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "completed"
    sections = report.audio_analyses[0].sections
    intro = next((s for s in sections if s.type == "intro_candidate"), None)
    outro = next((s for s in sections if s.type == "outro_candidate"), None)
    assert intro is not None
    assert outro is not None
    assert intro.start_seconds == 0.0
    assert outro.end_seconds > 4.0

def test_empty_audio_file(music_service, audio_fixtures):
    """Test handling of an empty (zero-byte) audio file."""
    req = MusicAnalysisRequest(
        clip_id="empty_file_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["empty.wav"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "failed"
    assert "Audio file is empty" in report.failures[0]["message"]

def test_unsupported_format(music_service, audio_fixtures):
    """Test handling of an unsupported file format."""
    req = MusicAnalysisRequest(
        clip_id="unsupported_format_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["unsupported.txt"])
    )
    report = music_service.analyze_audio(req)
    assert report.status == "failed"
    assert "Failed to probe audio" in report.failures[0]["message"]

def test_cache_hit_and_miss(audio_fixtures):
    """Test that caching provides a hit on the second identical request."""
    # Use a fresh service instance for isolated cache testing
    service = MusicService(approved_roots=[audio_fixtures["dir"]])
    req = MusicAnalysisRequest(
        clip_id="cache_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["short_mono.wav"])
    )

    # 1. First run (miss)
    report_miss = service.analyze_audio(req)
    assert report_miss.status == "completed"
    assert report_miss.audio_analyses[0].cache_status == "miss"
    
    # 2. Second run (hit)
    report_hit = service.analyze_audio(req)
    assert report_hit.status == "completed"
    assert report_hit.audio_analyses[0].cache_status == "hit"
    assert report_hit.audio_analyses[0].bpm_estimate == report_miss.audio_analyses[0].bpm_estimate

def test_cancellation(music_service, audio_fixtures):
    """Test that analysis can be cancelled."""
    req = MusicAnalysisRequest(
        clip_id="cancellation_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["steady_120bpm.wav"])
    )
    
    music_service.request_cancellation()
    report = music_service.analyze_audio(req)
    
    assert report.status == "cancelled"
    assert "Analysis was cancelled" in report.warnings[0]

def test_serialization(music_service, audio_fixtures):
    """Test that the report model can be serialized to JSON without errors."""
    req = MusicAnalysisRequest(
        clip_id="serialization_test",
        music_source=MusicSource(type="local_file", path=audio_fixtures["files"]["stereo.wav"])
    )
    report = music_service.analyze_audio(req)
    try:
        json_output = report.model_dump_json()
        assert '"status": "completed"' in json_output
        assert '"bpm_estimate":' in json_output
    except Exception as e:
        pytest.fail(f"Serialization of MusicAnalysisReport failed: {e}")
