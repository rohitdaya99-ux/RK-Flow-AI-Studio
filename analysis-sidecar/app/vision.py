from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

import numpy as np

from .vision_models import (
    VisionConfidence,
    VisionFrameAnalysisResult,
    VisionFrameTask,
    VisionHorizonEstimate,
    VisionParameters,
    VisionSceneEstimate,
    VisionWarning,
    VisionWhiteBalanceEstimate,
)


class VisionDependencyError(RuntimeError):
    """Raised when required computer-vision modules are unavailable."""


class InvalidImageError(ValueError):
    """Raised when a frame cannot be decoded as an image."""


class UnsupportedImageError(ValueError):
    """Raised when a decoded image is in an unsupported mode or shape."""


class FrameLoader:
    """Loads only an extracted frame path approved by VisionService."""

    def __init__(self, runtime: "VisionRuntime") -> None:
        self.runtime = runtime

    def load(self, image_path: str) -> "np.ndarray":
        cv2 = self.runtime.cv2
        image = cv2.imread(image_path, cv2.IMREAD_COLOR)
        if image is None or image.size == 0:
            raise InvalidImageError(f"Frame at {image_path} could not be decoded as an image.")
        if image.ndim != 3 or image.shape[2] != 3:
            raise UnsupportedImageError(f"Frame at {image_path} has unsupported shape {image.shape}. Expected a 3-channel BGR image.")
        return image


@dataclass
class PreprocessResult:
    image: "np.ndarray"
    gray: "np.ndarray"
    color: "np.ndarray"
    rawGray: "np.ndarray"
    originalSize: Tuple[int, int]
    processedSize: Tuple[int, int]
    letterboxed: bool
    normalizedHistogram: bool
    brightnessNormalized: bool
    rotated: bool
    rotationDegrees: float


VISION_METRIC_NAMES = [
    "sharpness",
    "blur",
    "noise",
    "exposure",
    "brightness",
    "contrast",
    "saturation",
    "whiteBalance",
    "motion",
    "cameraShake",
    "edgeDensity",
    "composition",
    "ruleOfThirds",
    "horizon",
    "foregroundBackground",
    "scene",
]


class VisionRuntime:
    """Runtime probe that reports which vision modules are importable."""

    def __init__(self) -> None:
        self.cv2: Optional[object] = None
        self.numpy = np
        self.pillow: Optional[object] = None
        self.onnxruntime: Optional[object] = None
        self.openvinoAvailable = False
        self._probe()

    def _probe(self) -> None:
        try:
            import cv2  # type: ignore

            self.cv2 = cv2
        except Exception:
            self.cv2 = None
        try:
            from PIL import Image  # noqa: F401

            self.pillow = True
        except Exception:
            self.pillow = None
        try:
            import onnxruntime  # type: ignore

            self.onnxruntime = onnxruntime
        except Exception:
            self.onnxruntime = None
        try:
            import openvino  # noqa: F401

            self.openvinoAvailable = True
        except Exception:
            self.openvinoAvailable = False


class ImagePreprocessor:
    def __init__(self, runtime: VisionRuntime) -> None:
        self.runtime = runtime
        self._temporary_cache: Dict[str, PreprocessResult] = {}
        self.loader = FrameLoader(runtime)
        if runtime.cv2 is None:
            raise VisionDependencyError(
                "OpenCV is unavailable. Install opencv-python-headless to enable local frame analysis."
            )

    def preprocess(self, image_path: str, parameters: VisionParameters) -> PreprocessResult:
        cache_key = f"{image_path}:{parameters.maxDimension}:{parameters.letterboxSize}:{parameters.normalizeHistogram}:{parameters.brightnessNormalize}"
        cached = self._temporary_cache.get(cache_key)
        if cached is not None:
            return cached
        cv2 = self.runtime.cv2
        image = self.loader.load(image_path)

        original_size = (image.shape[1], image.shape[0])
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        processed, rotationDegrees = self._rotate_and_reorient(image, gray)
        raw_gray = cv2.cvtColor(processed, cv2.COLOR_BGR2GRAY)
        processed, letterboxed = self._letterbox(processed, parameters)
        normalized, histogramNormalized = self._normalize_histogram(processed, parameters)
        brightened, brightnessNormalized = self._normalize_brightness(normalized, parameters)
        resultColor = brightened
        resultGray = cv2.cvtColor(resultColor, cv2.COLOR_BGR2GRAY)

        result = PreprocessResult(
            image=resultColor,
            gray=resultGray,
            color=resultColor,
            rawGray=raw_gray,
            originalSize=original_size,
            processedSize=(resultColor.shape[1], resultColor.shape[0]),
            letterboxed=letterboxed,
            normalizedHistogram=histogramNormalized,
            brightnessNormalized=brightnessNormalized,
            rotated=abs(rotationDegrees) > 0.01,
            rotationDegrees=rotationDegrees,
        )
        # This cache is process-local and intentionally temporary: persistent
        # results belong in VisionCache, while preprocessing avoids repeated
        # decode/normalization within a running job.
        self._temporary_cache[cache_key] = result
        return result

    def _rotate_and_reorient(
        self, image: "np.ndarray", gray: "np.ndarray"
    ) -> Tuple["np.ndarray", float]:
        cv2 = self.runtime.cv2
        height, width = gray.shape
        if min(height, width) < 32:
            return image, 0.0

        try:
            edges = cv2.Canny(gray, 50, 150, apertureSize=3)
            lines = cv2.HoughLinesP(
                edges,
                1,
                np.pi / 180.0,
                threshold=80,
                minLineLength=max(24, int(min(height, width) * 0.08)),
                maxLineGap=8,
            )
        except Exception:
            return image, 0.0

        if lines is None or len(lines) == 0:
            return image, 0.0

        angles: List[float] = []
        for line in lines:
            x1, y1, x2, y2 = line[0]
            delta_x = x2 - x1
            delta_y = y2 - y1
            if abs(delta_x) < 1e-6:
                continue
            angle = math.degrees(math.atan2(delta_y, delta_x))
            if abs(angle) < 45.0:
                angles.append(angle)

        if not angles:
            return image, 0.0

        histogram = np.histogram(np.asarray(angles), bins=90, range=(-45.0, 45.0))[0]
        dominant_index = int(np.argmax(histogram))
        dominant_angle = -45.0 + dominant_index * 1.0 + 0.5
        if abs(dominant_angle) < 1.5:
            return image, 0.0

        center = (width / 2.0, height / 2.0)
        matrix = cv2.getRotationMatrix2D(center, dominant_angle, 1.0)
        rotated = cv2.warpAffine(
            image,
            matrix,
            (width, height),
            flags=cv2.INTER_LINEAR,
            borderMode=cv2.BORDER_REPLICATE,
        )
        return rotated, dominant_angle

    def _letterbox(
        self, image: "np.ndarray", parameters: VisionParameters
    ) -> Tuple["np.ndarray", bool]:
        cv2 = self.runtime.cv2
        height, width = image.shape[:2]
        max_dimension = max(width, height)
        if max_dimension <= parameters.maxDimension:
            return image, False

        scale = parameters.maxDimension / max_dimension
        new_width = max(1, int(round(width * scale)))
        new_height = max(1, int(round(height * scale)))
        resized = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)

        target = parameters.letterboxSize
        if new_width == target and new_height == target:
            return resized, True
        if new_width > target or new_height > target:
            return resized, True

        padded = np.full((target, target, 3), 0, dtype=np.uint8)
        offset_x = (target - new_width) // 2
        offset_y = (target - new_height) // 2
        padded[offset_y : offset_y + new_height, offset_x : offset_x + new_width] = resized
        return padded, True

    def _normalize_histogram(
        self, image: "np.ndarray", parameters: VisionParameters
    ) -> Tuple["np.ndarray", bool]:
        if not parameters.normalizeHistogram:
            return image, False
        cv2 = self.runtime.cv2
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        l_channel, a_channel, b_channel = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        l_channel = clahe.apply(l_channel)
        merged = cv2.merge((l_channel, a_channel, b_channel))
        return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR), True

    def _normalize_brightness(
        self, image: "np.ndarray", parameters: VisionParameters
    ) -> Tuple["np.ndarray", bool]:
        if not parameters.brightnessNormalize:
            return image, False
        cv2 = self.runtime.cv2
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        mean_brightness = float(np.mean(gray))
        if abs(mean_brightness - 128.0) < 8.0:
            return image, False
        gamma = math.log(0.5) / math.log(max(1e-6, mean_brightness / 255.0))
        lookup = np.array(
            [((index / 255.0) ** gamma) * 255.0 for index in range(256)],
            dtype=np.uint8,
        )
        return cv2.LUT(image, lookup), True


class VisionAnalyzer:
    def __init__(self, runtime: VisionRuntime) -> None:
        self.runtime = runtime
        if runtime.cv2 is None:
            raise VisionDependencyError(
                "OpenCV is unavailable. Install opencv-python-headless to enable local frame analysis."
            )

    def analyze(
        self,
        preprocess: PreprocessResult,
        task: VisionFrameTask,
        vision_version: str,
        cache_key: str,
        cache_status: str,
        processed_at: str,
    ) -> VisionFrameAnalysisResult:
        cv2 = self.runtime.cv2
        # Technical quality must be measured before histogram/brightness
        # normalization; those transforms exist for stable composition analysis,
        # not to hide an under- or over-exposed source frame.
        gray = preprocess.rawGray
        color = preprocess.color
        gray_float = gray.astype(np.float32)

        sharpness = self.measure_sharpness(gray, cv2)
        blur_score = 1.0 - sharpness
        noise_score = self.measure_noise(gray_float, cv2)
        edge_density = self.measure_edge_density(gray, cv2)

        brightness = self.measure_brightness(gray_float)
        contrast = self.measure_contrast(gray_float)
        saturation = self.measure_saturation(color)
        exposure = self.measure_exposure(gray_float, brightness)
        white_balance = self.estimate_white_balance(color)

        motion = self.estimate_motion(gray_float, sharpness, noise_score)
        camera_shake = self.estimate_camera_shake(gray, cv2, sharpness)
        composition = self.estimate_composition(gray, cv2)
        rule_of_thirds = self.estimate_rule_of_thirds(gray, cv2)
        horizon = self.estimate_horizon(gray, cv2)
        foreground_background = self.estimate_foreground_background(gray, cv2, preprocess)
        scene = self.estimate_scene(color, gray, brightness)

        warnings: List[VisionWarning] = []
        warnings.extend(self._build_focus_warnings(blur_score, sharpness))
        warnings.extend(self._build_exposure_warnings(exposure, brightness))
        warnings.extend(self._build_shake_warnings(camera_shake))
        warnings.extend(self._build_detail_warnings(edge_density))

        quality_score = self.compute_quality_score(
            sharpness=sharpness,
            blur_score=blur_score,
            exposure=exposure,
            contrast=contrast,
            composition=composition,
            rule_of_thirds=rule_of_thirds,
            noise_score=noise_score,
        )
        reject_score = self.compute_reject_score(
            warnings=warnings,
            blur_score=blur_score,
            exposure=exposure,
            camera_shake=camera_shake,
            edge_density=edge_density,
        )

        confidence = VisionConfidence(
            sharpness=_bounded(sharpness),
            blur=_bounded(blur_score),
            noise=_bounded(noise_score),
            exposure=_bounded(exposure / 100.0),
            brightness=_bounded(abs(brightness - 128.0) / 128.0),
            contrast=_bounded(contrast / 255.0),
            saturation=_bounded(saturation / 255.0),
            whiteBalance=_bounded(white_balance.confidence),
            motion=_bounded(motion),
            cameraShake=_bounded(camera_shake),
            edgeDensity=_bounded(edge_density / 100.0),
            composition=_bounded(composition),
            ruleOfThirds=_bounded(rule_of_thirds),
            horizon=_bounded(horizon.confidence if horizon.present else 0.0),
            foregroundBackground=_bounded(_mean([
                foreground_background[0],
                foreground_background[1],
                foreground_background[2],
            ])),
            scene=_bounded(scene.confidence),
        )

        capabilities = []
        capabilities.append("sharpness")
        capabilities.append("blur")
        capabilities.append("noise")
        capabilities.append("exposure")
        capabilities.append("brightness")
        capabilities.append("contrast")
        capabilities.append("saturation")
        capabilities.append("white-balance")
        capabilities.append("edge-density")
        capabilities.append("composition")
        capabilities.append("rule-of-thirds")
        capabilities.append("foreground-background-ratio")
        capabilities.append("scene-estimate")
        if horizon.present:
            capabilities.append("horizon")
        if preprocess.rotated:
            capabilities.append("rotation-handling")
        if preprocess.letterboxed:
            capabilities.append("letterbox")
        if preprocess.normalizedHistogram:
            capabilities.append("histogram-normalization")
        if preprocess.brightnessNormalized:
            capabilities.append("brightness-normalization")

        return VisionFrameAnalysisResult(
            frameSampleId=task.frameSampleId,
            clipId=task.clipId,
            clipName=task.clipName,
            sampleKind=task.sampleKind,
            sourceTimeSeconds=task.sourceTimeSeconds,
            contentHash=task.contentHash,
            visionVersion=vision_version,
            processedAt=processed_at,
            cacheKey=cache_key,
            cacheStatus=cache_status,
            sharpness=_bounded(sharpness),
            blurScore=_bounded(blur_score),
            noiseScore=_bounded(noise_score),
            exposure=_bounded(exposure),
            brightness=round(brightness, 3),
            contrast=round(contrast, 3),
            saturation=round(saturation, 3),
            whiteBalanceEstimate=white_balance,
            motionEstimate=_bounded(motion),
            cameraShake=_bounded(camera_shake),
            edgeDensity=round(edge_density, 3),
            compositionEstimate=_bounded(composition),
            ruleOfThirdsEstimate=_bounded(rule_of_thirds),
            horizonEstimate=horizon,
            foregroundRatio=_bounded(foreground_background[0]),
            backgroundRatio=_bounded(foreground_background[1]),
            sceneEstimate=scene,
            qualityScore=_bounded(quality_score),
            rejectScore=_bounded(reject_score),
            warnings=warnings,
            confidence=confidence,
            capabilities=capabilities,
            fallbackReason=None,
            error=None,
        )

    def measure_sharpness(self, gray: "np.ndarray", cv2: object) -> float:
        return _bounded(float(cv2.Laplacian(gray, cv2.CV_64F).var()))

    def measure_noise(self, gray: "np.ndarray", cv2: object) -> float:
        try:
            denoised = cv2.medianBlur(gray.astype(np.uint8), 5)
        except Exception:
            return 0.0
        residual = gray - denoised.astype(np.float32)
        return _bounded(float(np.std(residual)))

    def measure_edge_density(self, gray: "np.ndarray", cv2: object) -> float:
        edges = cv2.Canny(gray.astype(np.uint8), 100, 200)
        return float(np.count_nonzero(edges)) / max(1, edges.size) * 100.0

    def measure_brightness(self, gray: "np.ndarray") -> float:
        return float(np.mean(gray))

    def measure_contrast(self, gray: "np.ndarray") -> float:
        return float(np.std(gray))

    def measure_saturation(self, color: "np.ndarray") -> float:
        hsv = self.runtime.cv2.cvtColor(color, self.runtime.cv2.COLOR_BGR2HSV)
        saturation_channel = hsv[:, :, 1].astype(np.float32)
        return float(np.mean(saturation_channel))

    def measure_exposure(self, gray: "np.ndarray", brightness: float) -> float:
        clipped_high = float(np.mean(gray >= 250))
        clipped_low = float(np.mean(gray <= 5))
        if clipped_high > 0.02:
            return 0.0
        if clipped_low > 0.02:
            return 0.0
        return max(0.0, min(100.0, (brightness / 255.0) * 100.0))

    def estimate_white_balance(self, color: "np.ndarray") -> VisionWhiteBalanceEstimate:
        average_b = float(np.mean(color[:, :, 0].astype(np.float32)))
        average_g = float(np.mean(color[:, :, 1].astype(np.float32)))
        average_r = float(np.mean(color[:, :, 2].astype(np.float32)))
        scale = (average_r + average_g + average_b) / 3.0 + 1e-6
        ratios = (average_r / scale, average_g / scale, average_b / scale)
        normalized_ratios: List[float] = []
        for value in ratios:
            if value > 1.015:
                normalized_ratios.append((value - 1.015) / 0.10)
            elif value < 0.985:
                normalized_ratios.append((0.985 - value) / 0.10)
            else:
                normalized_ratios.append(0.0)
        deviation = max(normalized_ratios)
        neutral = deviation < 0.15
        confidence = max(0.0, 1.0 - deviation)
        tint = round((average_b - average_r) / 10.0, 3)

        temperature_k: Optional[int] = None
        if average_r > 0 and average_b > 0 and average_r + average_b > 0:
            ratio = average_r / max(1e-6, average_b)
            if ratio > 1.1:
                temperature_k = 3500
            elif ratio < 0.9:
                temperature_k = 7500
            else:
                temperature_k = 5500

        return VisionWhiteBalanceEstimate(
            temperatureK=temperature_k,
            tint=tint,
            neutral=neutral,
            confidence=round(confidence, 3),
        )

    def estimate_motion(self, gray: "np.ndarray", sharpness: float, noise_score: float) -> float:
        motion_blur_proxy = 1.0 - max(0.0, min(1.0, sharpness / 2000.0))
        noise_penalty = max(0.0, min(1.0, noise_score / 30.0)) * 0.4
        return max(0.0, min(1.0, motion_blur_proxy + noise_penalty))

    def estimate_camera_shake(self, gray: "np.ndarray", cv2: object, sharpness: float) -> float:
        height, width = gray.shape
        if min(height, width) < 48:
            return _bounded(1.0 - sharpness / 1000.0) * 0.5
        try:
            corners = cv2.goodFeaturesToTrack(
                gray.astype(np.uint8),
                maxCorners=64,
                qualityLevel=0.03,
                minDistance=12,
            )
        except Exception:
            return _bounded(1.0 - sharpness / 2000.0) * 0.5
        if corners is None or len(corners) == 0:
            return _bounded(1.0 - sharpness / 2000.0) * 0.5
        return 0.0

    def estimate_composition(self, gray: "np.ndarray", cv2: object) -> float:
        height, width = gray.shape
        if height < 32 or width < 32:
            return 0.5
        thirds_x = [width * 0.33, width * 0.5, width * 0.66]
        thirds_y = [height * 0.33, height * 0.5, height * 0.66]
        try:
            edges = cv2.Canny(gray.astype(np.uint8), 100, 200)
        except Exception:
            return 0.5
        total_edge = float(np.count_nonzero(edges))
        if total_edge < 1:
            return 0.5
        sampled = 0.0
        for x in thirds_x:
            for y in thirds_y:
                px = int(round(x))
                py = int(round(y))
                if px < width and py < height:
                    window = edges[max(0, py - 4) : py + 5, max(0, px - 4) : px + 5]
                    sampled += float(np.count_nonzero(window))
        sampled_density = sampled / 9.0
        score = max(0.0, min(1.0, 0.5 + (sampled_density / 8.0)))
        return _bounded(score)

    def estimate_rule_of_thirds(self, gray: "np.ndarray", cv2: object) -> float:
        height, width = gray.shape
        try:
            edges = cv2.Canny(gray.astype(np.uint8), 100, 200)
        except Exception:
            return 0.5
        total_edge = float(np.count_nonzero(edges))
        if total_edge < 1:
            return 0.5
        third_columns = [int(round(width / 3.0)), int(round(width * 2 / 3.0))]
        third_rows = [int(round(height / 3.0)), int(round(height * 2 / 3.0))]
        band_half = max(2, int(round(min(height, width) * 0.02)))
        line_density = 0.0
        for x in third_columns:
            window = edges[:, max(0, x - band_half) : min(width, x + band_half + 1)]
            line_density += float(np.count_nonzero(window))
        for y in third_rows:
            window = edges[max(0, y - band_half) : min(height, y + band_half + 1), :]
            line_density += float(np.count_nonzero(window))
        line_density /= total_edge
        return _bounded(0.5 + line_density * 2.5)

    def estimate_horizon(self, gray: "np.ndarray", cv2: object) -> VisionHorizonEstimate:
        height, width = gray.shape
        try:
            edges = cv2.Canny(gray.astype(np.uint8), 50, 150)
            lines = cv2.HoughLinesP(
                edges,
                1,
                np.pi / 180.0,
                threshold=60,
                minLineLength=max(24, int(min(height, width) * 0.15)),
                maxLineGap=10,
            )
        except Exception:
            return VisionHorizonEstimate(present=False, confidence=0.0, note="Edge detection unavailable.")
        if lines is None or len(lines) == 0:
            return VisionHorizonEstimate(present=False, confidence=0.0, note="No strong horizontal lines found.")
        angles: List[float] = []
        horizontal_lines: List[Tuple[int, int, int, int]] = []
        for line in lines:
            x1, y1, x2, y2 = line[0]
            delta_x = x2 - x1
            if abs(delta_x) < 1e-6:
                continue
            angle = abs(math.degrees(math.atan2(y2 - y1, delta_x)))
            if angle < 15.0 or abs(angle - 180.0) < 15.0:
                angles.append(angle if angle <= 90.0 else 180.0 - angle)
                horizontal_lines.append((x1, y1, x2, y2))
        if not angles:
            return VisionHorizonEstimate(present=False, confidence=0.0, note="No horizontal line candidates detected.")
        orientation = float(np.mean(angles))
        line_count = len(horizontal_lines)
        center_y = height / 2.0
        distances: List[float] = []
        for x1, y1, x2, y2 in horizontal_lines:
            midpoint_y = (y1 + y2) / 2.0
            distances.append(abs(midpoint_y - center_y) / max(1, height))
        coverage = 1.0 - min(1.0, float(np.mean(distances)) * 2.0)
        confidence = max(0.0, min(1.0, line_count / 12.0 * coverage))
        return VisionHorizonEstimate(
            angleDegrees=round(orientation, 3),
            present=True,
            confidence=round(confidence, 3),
            note=f"{line_count} horizontal line candidate(s) detected.",
        )

    def estimate_foreground_background(
        self,
        gray: "np.ndarray",
        cv2: object,
        preprocess: PreprocessResult,
    ) -> Tuple[float, float, float]:
        height, width = gray.shape
        if height < 4 or width < 4:
            return (0.5, 0.5, 0.5)
        try:
            canny = cv2.Canny(gray.astype(np.uint8), 50, 150)
        except Exception:
            return (0.5, 0.5, 0.5)

        center_crop_rows = int(round(height * 0.5))
        start_row = int(round((height - center_crop_rows) / 2.0))
        center_edges = canny[start_row : start_row + center_crop_rows, :]
        total_edges = float(np.count_nonzero(canny))
        center_edges_count = float(np.count_nonzero(center_edges))
        if total_edges < 1:
            return (0.5, 0.5, 0.5)

        edge_density_center = center_edges_count / max(1.0, total_edges)
        depth_separation = max(0.0, min(1.0, (edge_density_center - 0.5) / 0.5))
        foreground_ratio = 0.5 + depth_separation * 0.35
        background_ratio = 1.0 - foreground_ratio
        return (
            round(foreground_ratio, 3),
            round(background_ratio, 3),
            round(0.4 + total_edges / max(1.0, width * height) * 10.0, 3),
        )

    def estimate_scene(
        self,
        color: "np.ndarray",
        gray: "np.ndarray",
        brightness: float,
    ) -> VisionSceneEstimate:
        cv2 = self.runtime.cv2
        height, width = gray.shape
        hsv = cv2.cvtColor(color, cv2.COLOR_BGR2HSV)
        hue = hsv[:, :, 0].astype(np.float32)
        saturation_channel = hsv[:, :, 1].astype(np.float32)
        value_channel = hsv[:, :, 2].astype(np.float32)

        green_mask = ((hue >= 35) & (hue <= 85)) & (saturation_channel > 40) & (value_channel > 40)
        blue_sky_mask = (
            ((hue >= 95) & (hue <= 130) | (hue >= 0) & (hue <= 20))
            & (saturation_channel > 60)
            & (value_channel > 90)
            & (gray > 90)
        )
        warm_skin_mask = (
            ((hue >= 0) & (hue <= 25))
            & (saturation_channel > 30)
            & (value_channel > 60)
        )
        green_ratio = float(np.mean(green_mask))
        blue_sky_ratio = float(np.mean(blue_sky_mask))
        warm_ratio = float(np.mean(warm_skin_mask))
        brightness_ratio = float(np.mean(value_channel > 180))

        indoor_outdoor: str
        day_night: str
        shot_type_confidence: float = 0.4
        scene_confidence = 0.5
        notes: List[str] = []

        if brightness < 50:
            day_night = "night"
            if green_ratio > 0.05 or blue_sky_ratio > 0.02:
                indoor_outdoor = "outdoor"
                scene_confidence = 0.55
            else:
                indoor_outdoor = "indoor"
                scene_confidence = 0.45
        elif blue_sky_ratio > 0.12 or green_ratio > 0.25:
            indoor_outdoor = "outdoor"
            day_night = "day"
            scene_confidence = 0.72
            notes.append("High sky or greenery ratio suggests outdoor.")
        elif brightness > 190 and brightness_ratio > 0.6:
            indoor_outdoor = "indoor"
            day_night = "day"
            scene_confidence = 0.6
            notes.append("Bright high-key lighting suggests a studio or bright indoor scene.")
        elif warm_ratio > 0.25 and brightness < 140:
            indoor_outdoor = "indoor"
            day_night = "night"
            scene_confidence = 0.6
            notes.append("Warm low-key lighting suggests a warm indoor scene.")
        else:
            indoor_outdoor = "unknown"
            day_night = "day" if brightness >= 50 else "night"
            scene_confidence = 0.4
            notes.append("Scene cues are mixed; the estimate is low confidence.")

        edge_density = float(np.mean(cv2.Canny(gray.astype(np.uint8), 50, 150)))
        face_sized_warmth = warm_ratio
        if face_sized_warmth > 0.12:
            shot_type = "close"
            shot_type_confidence = 0.5
        elif edge_density > 0.04 or green_ratio > 0.4 or blue_sky_ratio > 0.25:
            shot_type = "wide"
            shot_type_confidence = 0.55
        elif edge_density > 0.02:
            shot_type = "medium"
            shot_type_confidence = 0.5
        else:
            shot_type = "detail"
            shot_type_confidence = 0.45

        drone_likelihood = 0.0
        if indoor_outdoor == "outdoor":
            if blue_sky_ratio > 0.3:
                drone_likelihood = min(0.9, 0.4 + blue_sky_ratio * 0.8)
                notes.append("Large sky region and high viewpoint cues suggest elevated drone-like framing.")
            elif green_ratio > 0.4:
                drone_likelihood = min(0.7, 0.2 + green_ratio * 0.6)
                notes.append("Extensive ground/landscape coverage suggests elevated framing.")

        return VisionSceneEstimate(
            indoorOutdoor=indoor_outdoor,
            dayNight=day_night,
            shotType=shot_type,
            droneLikelihood=round(min(1.0, drone_likelihood), 3),
            confidence=round(min(0.9, max(0.3, scene_confidence + shot_type_confidence * 0.2)), 3),
            notes=notes,
        )

    def compute_quality_score(
        self,
        sharpness: float,
        blur_score: float,
        exposure: float,
        contrast: float,
        composition: float,
        rule_of_thirds: float,
        noise_score: float,
    ) -> float:
        sharpness_norm = max(0.0, min(1.0, sharpness / 1000.0))
        exposure_norm = max(0.0, min(1.0, exposure / 100.0))
        contrast_norm = max(0.0, min(1.0, contrast / 128.0))
        noise_penalty = max(0.0, min(1.0, noise_score / 25.0))
        focus_penalty = max(0.0, min(1.0, blur_score / 1.4))
        score = (
            sharpness_norm * 0.25
            + exposure_norm * 0.25
            + contrast_norm * 0.15
            + composition * 0.15
            + rule_of_thirds * 0.10
            + (1.0 - noise_penalty) * 0.10
        ) * 100.0
        score -= focus_penalty * 22.0
        return max(0.0, min(100.0, score))

    def compute_reject_score(
        self,
        warnings: List[VisionWarning],
        blur_score: float,
        exposure: float,
        camera_shake: float,
        edge_density: float,
    ) -> float:
        reject = 0.0
        for warning in warnings:
            if warning.severity == "reject":
                reject += 25.0
            elif warning.severity == "warning":
                reject += 12.0
            else:
                reject += 4.0
        if blur_score > 0.85:
            reject += 15.0
        if exposure < 8.0 or exposure > 92.0:
            reject += 12.0
        reject += camera_shake * 25.0
        if edge_density < 0.05:
            reject += 8.0
        return max(0.0, min(100.0, reject))

    def _build_focus_warnings(self, blur_score: float, sharpness: float) -> List[VisionWarning]:
        if blur_score > 0.75:
            return [VisionWarning(code="too-blurry", label="Too blurry", severity="reject", reason=f"Estimated blur score {blur_score:.2f} with Laplacian variance {sharpness:.1f}.")]
        if blur_score > 0.6:
            return [VisionWarning(code="soft-focus", label="Soft focus", severity="warning", reason=f"Estimated blur score {blur_score:.2f} suggests soft focus.")]
        return []

    def _build_exposure_warnings(self, exposure: float, brightness: float) -> List[VisionWarning]:
        warnings: List[VisionWarning] = []
        if brightness > 245.0:
            warnings.append(VisionWarning(code="over-exposed", label="Over exposed", severity="reject", reason=f"Mean brightness {brightness:.1f} indicates clipped highlights."))
        elif exposure <= 8.0:
            warnings.append(VisionWarning(code="under-exposed", label="Under exposed", severity="reject", reason=f"Estimated exposure {exposure:.1f} indicates crushed shadows."))
        elif exposure <= 18.0:
            warnings.append(VisionWarning(code="too-dark", label="Too dark", severity="warning", reason=f"Estimated exposure {exposure:.1f} is very low."))
        elif brightness >= 235.0:
            warnings.append(VisionWarning(code="over-exposed", label="Over exposed", severity="warning", reason=f"Mean brightness {brightness:.1f} is near clipping."))
        return warnings

    def _build_shake_warnings(self, camera_shake: float) -> List[VisionWarning]:
        if camera_shake > 0.75:
            return [VisionWarning(code="camera-shake", label="Camera shake", severity="warning", reason=f"Motion/shake proxy {camera_shake:.2f} suggests unstable framing.")]
        return []

    def _build_detail_warnings(self, edge_density: float) -> List[VisionWarning]:
        if edge_density < 0.05:
            return [VisionWarning(code="low-detail", label="Low detail", severity="warning", reason=f"Edge density {edge_density:.3f} is very low; frame may be a flat surface.")]
        return []


def cluster_frame_analyses(
    analyses: List[VisionFrameAnalysisResult],
) -> Dict[str, VisionFrameAnalysisResult]:
    return {analysis.frameSampleId: analysis for analysis in analyses}


def build_clip_analysis(
    clip_id: str,
    clip_name: str,
    analyses: List[VisionFrameAnalysisResult],
) -> VisionFrameAnalysisResult | None:
    if not analyses:
        return None
    best = max(analyses, key=lambda analysis: analysis.qualityScore)
    return best


def _bounded(value: float) -> float:
    if not math.isfinite(value):
        return 0.0
    return max(0.0, min(100.0, float(value)))


def _mean(values: List[float]) -> float:
    if not values:
        return 0.0
    return float(sum(values) / len(values))
