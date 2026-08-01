import { ExportPreset } from '../types';

export const EXPORT_PRESETS: ExportPreset[] = [
  'Instagram Reels',
  'YouTube Shorts',
  'YouTube Highlight',
  'YouTube 4K',
  'Facebook',
  'WhatsApp',
  'Master Archive',
];

export const EXPORT_PRESET_LABELS: Record<ExportPreset, string> = {
  'Instagram Reels': 'Vertical 9:16 social reel optimized for Instagram',
  'YouTube Shorts': 'Short-form vertical edit for YouTube Shorts',
  'YouTube Highlight': 'Landscape 16:9 highlight edit for YouTube',
  'YouTube 4K': 'Full-quality master export for YouTube 4K upload',
  'Facebook': 'High-quality 16:9 export tuned for Facebook playback',
  'WhatsApp': 'Small size mobile-friendly share export',
  'Master Archive': 'Highest fidelity archival master for finishing',
};
