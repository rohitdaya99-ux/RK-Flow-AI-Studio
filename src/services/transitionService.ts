import { LoggerService } from './loggerService';
import { TransitionSuggestion } from '../types';

const TRANSITION_POOL: TransitionSuggestion[] = [
  { type: 'Whip', reason: 'High motion connection between dance and procession shots.' },
  { type: 'Zoom', reason: 'Close framing and strong subject movement.' },
  { type: 'Push', reason: 'Directional camera movement into the next shot.' },
  { type: 'Slide', reason: 'Smooth story progression between ritual moments.' },
  { type: 'Motion Blur', reason: 'Adds polish to fast-paced dancing sequences.' },
  { type: 'Flash', reason: 'Ideal for audio drops and festive highlights.' },
  { type: 'Luma Fade', reason: 'Emphasizes mood changes in ceremony to reception.' },
  { type: 'Light Leak', reason: 'Adds warmth for romantic gold-tone scenes.' },
  { type: 'Cross Dissolve', reason: 'Softly blends emotional reaction shots.' },
  { type: 'Film Burn', reason: 'Luxury storytelling reveal for cinematic moments.' },
  { type: 'Speed Transition', reason: 'Dynamic cut for dance or travel shots.' },
  { type: 'Mask Reveal', reason: 'Stylish reveal for closeups and decor detail.' },
];

export class TransitionService {
  constructor(private readonly logger: LoggerService) {}

  async recommendTransitions(intensity: number): Promise<TransitionSuggestion[]> {
    this.logger.log(`Recommending transitions based on music intensity ${intensity.toFixed(2)}`, 'info');
    const count = Math.min(5, Math.max(3, Math.round(intensity * 6)));
    return TRANSITION_POOL.slice(0, count);
  }
}
