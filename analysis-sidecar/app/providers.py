from abc import ABC, abstractmethod
from typing import List, Optional, Dict
from app.models import MusicSource, MusicCatalogRecommendation, MusicProviderStatus

class MusicCatalogProvider(ABC):
    """Abstract base class for music catalog providers."""

    @abstractmethod
    def get_name(self) -> str:
        ...

    @abstractmethod
    def is_enabled(self) -> bool:
        ...

    @abstractmethod
    def get_reason(self) -> str:
        ...

    @abstractmethod
    def get_recommendations(self, mood: str, tempo_range: Dict[str, float], duration_range: Dict[str, float]) -> List[MusicCatalogRecommendation]:
        """
        Provides music recommendations based on editorial criteria.
        This is a placeholder for future functionality.
        """
        ...

class DisabledMusicCatalogProvider(MusicCatalogProvider):
    """A provider that is always disabled and returns a reason."""
    def __init__(self, reason: str = "Music catalog provider not configured or unavailable."):
        self._reason = reason

    def get_name(self) -> str:
        return "DisabledMusicCatalogProvider"

    def is_enabled(self) -> bool:
        return False

    def get_reason(self) -> str:
        return self._reason

    def get_recommendations(self, mood: str, tempo_range: Dict[str, float], duration_range: Dict[str, float]) -> List[MusicCatalogRecommendation]:
        return []

class LocalMusicLibraryProvider(MusicCatalogProvider):
    """
    A provider that allows selecting music from a user's local library.
    Does not provide recommendations directly, but enables local file analysis.
    """
    def get_name(self) -> str:
        return "LocalMusicLibraryProvider"

    def is_enabled(self) -> bool:
        return True # Always enabled to allow local file selection

    def get_reason(self) -> str:
        return "Enabled. Allows selection of local audio files for analysis."

    def get_recommendations(self, mood: str, tempo_range: Dict[str, float], duration_range: Dict[str, float]) -> List[MusicCatalogRecommendation]:
        return [] # No recommendations from local library, only direct selection

class PremiereProjectMusicProvider(MusicCatalogProvider):
    """
    A provider that allows selecting music from Premiere project items.
    """
    def get_name(self) -> str:
        return "PremiereProjectMusicProvider"

    def is_enabled(self) -> bool:
        # In a real scenario, this would check Premiere Bridge connectivity
        return True

    def get_reason(self) -> str:
        return "Enabled. Allows selection of audio from Premiere project items."

    def get_recommendations(self, mood: str, tempo_range: Dict[str, float], duration_range: Dict[str, float]) -> List[MusicCatalogRecommendation]:
        return []

class LicensedCatalogProvider(DisabledMusicCatalogProvider):
    """
    A placeholder for a licensed music catalog provider, disabled by default.
    """
    def __init__(self):
        super().__init__(reason="No commercially-approved licensed music catalog is configured.")

    def get_name(self) -> str:
        return "LicensedCatalogProvider"