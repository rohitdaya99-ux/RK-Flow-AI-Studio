from __future__ import annotations

from pathlib import Path
from typing import Iterable, List


class PathAccessError(ValueError):
    """Raised when a requested path escapes approved roots."""


def normalize_path(value: str) -> Path:
    return Path(value).expanduser().resolve(strict=False)


def normalize_roots(values: Iterable[str]) -> List[Path]:
    roots = []
    for value in values:
        if not value:
            continue
        roots.append(normalize_path(value))
    return roots


def ensure_within_roots(candidate: str, approved_roots: Iterable[str]) -> Path:
    candidate_path = normalize_path(candidate)
    roots = normalize_roots(approved_roots)
    for root in roots:
        try:
            candidate_path.relative_to(root)
            return candidate_path
        except ValueError:
            continue
    raise PathAccessError(f"Path is outside approved roots: {candidate}")
