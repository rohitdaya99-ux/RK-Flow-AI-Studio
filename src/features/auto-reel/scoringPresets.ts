
import { ScorePreset, ScoringProfile } from "./models";

const cinematicProfile: ScoringProfile = {
  id: "cinematic-v1",
  name: "Cinematic",
  description: "Prioritizes technical quality and visual aesthetics for a film-like look.",
  weights: [
    { signal: "technical.sharpness", weight: 1.0, trust: {} },
    { signal: "technical.exposure", weight: 0.8, trust: {} },
    { signal: "technical.composition", weight: 0.9, trust: {} },
    { signal: "technical.framing", weight: 0.9, trust: {} },
    { signal: "technical.focus", weight: 0.7, trust: {} },
    { signal: "technical.stability", weight: 0.6, trust: {} },
    { signal: "vision.shotType.wide", weight: 0.8, trust: {} },
    { signal: "vision.shotType.drone", weight: 0.9, trust: {} },
    { signal: "vision.lighting", weight: 0.8, trust: {} },
    { signal: "vision.motion", weight: 0.5, trust: {} },
    { signal: "face.visibility", weight: 0.3, trust: {} },
    { signal: "emotion.mood.cinematic", weight: 0.7, trust: {} },
    { signal: "wedding.event.decor", weight: 0.6, trust: {} },
  ],
  penalties: [
    { id: "blur", signal: "technical.blur", threshold: 0.5, operator: ">", penaltyPoints: 20, reason: "Excessive blur" },
    { id: "shake", signal: "technical.stability", threshold: 0.5, operator: "<", penaltyPoints: 20, reason: "Excessive camera shake" },
    { id: "bad-exposure", signal: "technical.exposure", threshold: 0.2, operator: "<", penaltyPoints: 15, reason: "Severe under/over exposure" },
  ],
  diversity: [
    { id: "camera-angle", signal: "vision.cameraAngle", maxOccurrences: 3, penaltyPoints: 5, reason: "Repeated camera angle" },
    { id: "shot-type", signal: "vision.shotType", maxOccurrences: 4, penaltyPoints: 5, reason: "Repeated shot type" },
  ],
};

const emotionalProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "emotional-v1",
  name: "Emotional",
  description: "Focuses on clips with strong emotional content, like smiles and happy tears.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["technical.sharpness", "face.visibility"].includes(w.signal)),
    { signal: "emotion.smileScore", weight: 1.0, trust: {} },
    { signal: "emotion.expressionConfidence", weight: 0.8, trust: {} },
    { signal: "face.visibility", weight: 0.9, trust: {} },
    { signal: "face.quality", weight: 0.7, trust: {} },
    { signal: "technical.sharpness", weight: 0.6, trust: {} },
    { signal: "music.quietEmotional", weight: 0.8, trust: {} },
  ],
};

const coupleProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "couple-v1",
  name: "Couple",
  description: "Prioritizes shots of the couple together.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["technical.sharpness"].includes(w.signal)),
    { signal: "wedding.event.couple", weight: 1.0, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "face.count", weight: 0.8, trust: {} }, // Assuming lower is better for couple shots
    { signal: "emotion.smileScore", weight: 0.7, trust: {} },
    { signal: "technical.sharpness", weight: 0.6, trust: {} },
  ],
};

const familyProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "family-v1",
  name: "Family",
  description: "Highlights moments with family members.",
  weights: [
    ...cinematicProfile.weights,
    { signal: "wedding.event.family", weight: 1.0, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "face.count", weight: 0.8, trust: {} }, // Assuming higher is better for family shots
    { signal: "emotion.smileScore", weight: 0.6, trust: {} },
  ],
};

const danceProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "dance-v1",
  name: "Dance",
  description: "Creates a high-energy reel focused on dancing.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["technical.stability", "vision.motion"].includes(w.signal)),
    { signal: "wedding.event.dance", weight: 1.0, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "music.highEnergyDrop", weight: 0.9, trust: {} },
    { signal: "music.beatCompatibility", weight: 0.8, trust: {} },
    { signal: "vision.motion", weight: 0.7, trust: {} },
    { signal: "technical.stability", weight: 0.5, trust: {} },
  ],
};

const luxuryProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "luxury-v1",
  name: "Luxury",
  description: "Showcases high-end details, decor, and fashion.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["technical.sharpness", "technical.exposure", "wedding.event.decor"].includes(w.signal)),
    { signal: "wedding.event.decor", weight: 1.0, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "wedding.event.fashion", weight: 0.9, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "vision.shotType.detail", weight: 0.8, trust: {} },
    { signal: "technical.sharpness", weight: 0.9, trust: {} },
    { signal: "technical.exposure", weight: 0.8, trust: {} },
  ],
};

const documentaryProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "documentary-v1",
  name: "Documentary",
  description: "Tells the story of the day in a chronological, narrative style.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["technical.stability", "face.visibility"].includes(w.signal)),
    { signal: "wedding.event.importance", weight: 1.0, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "technical.stability", weight: 0.8, trust: {} },
    { signal: "face.visibility", weight: 0.7, trust: {} },
  ],
};

const viralProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "viral-v1",
  name: "Viral",
  description: "Optimized for social media with fast cuts and high-impact moments.",
  weights: [
    ...cinematicProfile.weights.filter(w => !["vision.motion", "technical.sharpness"].includes(w.signal)),
    { signal: "emotion.smileScore", weight: 0.9, trust: {} },
    { signal: "vision.motion", weight: 0.8, trust: {} },
    { signal: "music.highEnergyDrop", weight: 0.9, trust: {} },
    { signal: "technical.sharpness", weight: 0.7, trust: {} },
  ],
  penalties: [
      ...cinematicProfile.penalties,
      { id: "short-clip", signal: "technical.duration", threshold: 3, operator: "<", penaltyPoints: 10, reason: "Clip too short for viral content" },
  ]
};

const balancedProfile: ScoringProfile = {
  ...cinematicProfile,
  id: "balanced-v1",
  name: "Balanced",
  description: "A well-rounded mix of all the best moments.",
  weights: [
    { signal: "technical.sharpness", weight: 0.8, trust: {} },
    { signal: "technical.exposure", weight: 0.7, trust: {} },
    { signal: "emotion.smileScore", weight: 0.7, trust: {} },
    { signal: "wedding.event.importance", weight: 0.8, trust: { user_confirmed: 1.0, user_corrected: 1.0, provider_model: 0.7 } },
    { signal: "music.beatCompatibility", weight: 0.6, trust: {} },
    { signal: "vision.motion", weight: 0.5, trust: {} },
  ],
};

const technicalProfile: ScoringProfile = {
  id: "technical-v1",
  name: "Technical Only",
  description: "Relies entirely on low-level frame metrics (sharpness, exposure, stability). Skips Vision, Face, Emotion, and Music AI.",
  weights: [
    { signal: "technical.sharpness", weight: 1.0, trust: {} },
    { signal: "technical.exposure", weight: 0.9, trust: {} },
    { signal: "technical.stability", weight: 0.8, trust: {} },
    { signal: "technical.composition", weight: 0.7, trust: {} },
    { signal: "technical.focus", weight: 0.6, trust: {} },
  ],
  penalties: [
    { id: "blur", signal: "technical.blur", threshold: 0.5, operator: ">", penaltyPoints: 20, reason: "Excessive blur" },
    { id: "shake", signal: "technical.stability", threshold: 0.5, operator: "<", penaltyPoints: 20, reason: "Excessive camera shake" },
  ],
  diversity: [],
};


export const cinematicPreset: ScorePreset = { id: "cinematic", name: "Cinematic", description: "Creates a reel with a film-like, visually polished aesthetic.", profile: cinematicProfile };
export const emotionalPreset: ScorePreset = { id: "emotional", name: "Emotional", description: "Focuses on clips with strong emotional content.", profile: emotionalProfile };
export const couplePreset: ScorePreset = { id: "couple", name: "Couple", description: "Prioritizes shots of the couple.", profile: coupleProfile };
export const familyPreset: ScorePreset = { id: "family", name: "Family", description: "Highlights moments with family.", profile: familyProfile };
export const dancePreset: ScorePreset = { id: "dance", name: "Dance", description: "Creates a high-energy reel of dancing.", profile: danceProfile };
export const luxuryPreset: ScorePreset = { id: "luxury", name: "Luxury", description: "Showcases high-end details and decor.", profile: luxuryProfile };
export const documentaryPreset: ScorePreset = { id: "documentary", name: "Documentary", description: "Tells the story of the day.", profile: documentaryProfile };
export const viralPreset: ScorePreset = { id: "viral", name: "Viral", description: "Optimized for social media.", profile: viralProfile };
export const balancedPreset: ScorePreset = { id: "balanced", name: "Balanced", description: "A well-rounded mix of moments.", profile: balancedProfile };
export const technicalPreset: ScorePreset = { id: "technical", name: "Technical Only", description: "Fastest scoring using only frame metrics.", profile: technicalProfile };


export const scoringPresets: ScorePreset[] = [
  cinematicPreset,
  emotionalPreset,
  couplePreset,
  familyPreset,
  dancePreset,
  luxuryPreset,
  documentaryPreset,
  viralPreset,
  balancedPreset,
  technicalPreset,
];
