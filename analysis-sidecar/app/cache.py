from __future__ import annotations

import os
import tempfile
import time
from pathlib import Path
from typing import Dict, Iterable


class CacheStore:
    def __init__(self, root: Path, ttl_seconds: int, max_bytes: int) -> None:
        self.root = root.resolve(strict=False)
        self.ttl_seconds = ttl_seconds
        self.max_bytes = max_bytes
        self.root.mkdir(parents=True, exist_ok=True)

    @classmethod
    def from_runtime(cls, ttl_seconds: int, max_bytes: int) -> "CacheStore":
        env_root = os.environ.get("RKFLOW_CACHE_ROOT", "").strip()
        base_root = Path(env_root).expanduser() if env_root else Path(tempfile.gettempdir()) / "rkflow-cache"
        return cls(base_root / "analysis-sidecar", ttl_seconds, max_bytes)

    def frame_output_path(self, cache_key: str, sample_id: str) -> Path:
        path = self.root / "frames" / cache_key / f"{sample_id}.jpg"
        path.parent.mkdir(parents=True, exist_ok=True)
        return path

    def audio_output_path(self, cache_key: str, task_id: str) -> Path:
        path = self.root / "audio" / cache_key / f"{task_id}.wav"
        path.parent.mkdir(parents=True, exist_ok=True)
        return path

    def contains(self, path: Path) -> bool:
        try:
            path.resolve(strict=False).relative_to(self.root)
            return True
        except ValueError:
            return False

    def safe_delete(self, path: Path) -> bool:
        resolved = path.resolve(strict=False)
        if not self.contains(resolved):
            return False
        if resolved.exists():
            resolved.unlink()
            self._prune_empty_parents(resolved.parent)
        return True

    def cleanup(self) -> Dict[str, int]:
        deleted = self.cleanup_expired()
        deleted += self.cleanup_oversize()
        return {
            "deletedFiles": deleted,
            "sizeBytes": self.size_bytes(),
        }

    def cleanup_expired(self) -> int:
        cutoff = time.time() - self.ttl_seconds
        deleted = 0
        for file_path in list(self.root.rglob("*")):
            if not file_path.is_file():
                continue
            if file_path.stat().st_mtime < cutoff and self.safe_delete(file_path):
                deleted += 1
        return deleted

    def cleanup_oversize(self) -> int:
        deleted = 0
        files = sorted(
            [path for path in self.root.rglob("*") if path.is_file()],
            key=lambda item: item.stat().st_mtime,
        )
        while self.size_bytes() > self.max_bytes and files:
            if self.safe_delete(files.pop(0)):
                deleted += 1
        return deleted

    def size_bytes(self) -> int:
        return sum(path.stat().st_size for path in self.root.rglob("*") if path.is_file())

    def _prune_empty_parents(self, path: Path) -> None:
        current = path
        while self.contains(current) and current != self.root:
            try:
                current.rmdir()
            except OSError:
                return
            current = current.parent
