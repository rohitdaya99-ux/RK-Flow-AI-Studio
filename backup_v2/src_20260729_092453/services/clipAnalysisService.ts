import { ClipAnalysis, EventTag } from '../types';
import { LoggerService } from './loggerService';

const SAMPLE_EVENT_TAGS: EventTag[] = [
  'Bride Entry',
  'Groom Entry',
  'Haldi',
  'Mehndi',
  'Sangeet',
  'Baraat',
  'Varmala',
  'Sindoor',
  'Mangalsutra',
  'Pheras',
  'Reception',
  'Bidaai',
  'Parents Emotion',
  'Couple Emotion',
  'Family Moments',
  'Kids',
  'Dance',
  'Fireworks',
  'Drone Shots',
];

export class ClipAnalysisService {
  constructor(private readonly logger: LoggerService) {}

  async analyzeClips(clips: Array<{ id: string; name: string }>): Promise<ClipAnalysis[]> {
    this.logger.log(`Analyzing ${clips.length} clips for emotion, quality, and story importance`, 'info');
    return clips.map((clip, index) => ({
      clipId: clip.id,
      clipName: clip.name,
      emotionScore: Number((Math.random() * 0.4 + 0.6).toFixed(2)),
      qualityScore: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
      sharpnessScore: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
      exposureScore: Number((Math.random() * 0.4 + 0.55).toFixed(2)),
      motionScore: Number((Math.random() * 0.35 + 0.5).toFixed(2)),
      compositionScore: Number((Math.random() * 0.35 + 0.55).toFixed(2)),
      faceDetected: Math.random() > 0.12,
      smileDetected: Math.random() > 0.3,
      crowdEnergy: Number((Math.random() * 0.4 + 0.4).toFixed(2)),
      storyImportance: Number((Math.random() * 0.4 + 0.5).toFixed(2)),
      detectedEvents: [SAMPLE_EVENT_TAGS[index % SAMPLE_EVENT_TAGS.length]],
      isDiscarded: Math.random() < 0.08,
    }));
  }
}
