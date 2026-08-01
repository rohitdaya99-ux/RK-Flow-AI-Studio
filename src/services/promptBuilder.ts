import { analyzeTimeline } from "./timelineAnalysisService";

export async function buildWeddingPrompt() {

  const t = await analyzeTimeline();

  return `
You are RK Flow AI.

Analyze this Adobe Premiere Pro timeline.

Timeline Information:

Project: ${t.project}
Sequence: ${t.sequence}
Resolution: ${t.resolution}
Duration: ${t.duration}
Video Tracks: ${t.videoTracks}
Audio Tracks: ${t.audioTracks}
Health Score: ${t.score}

Return ONLY valid JSON.

Schema:

{
  "timelineScore": number,
  "editingStyle": "",
  "musicStyle": "",
  "reel": {
    "duration": "",
    "hook": "",
    "bestMoments": []
  },
  "highlight": {
    "duration": "",
    "importantMoments": []
  },
  "transitions": [],
  "slowMotion": [],
  "colorSuggestions": [],
  "exportPreset": "",
  "warnings": [],
  "nextActions": []
}

No markdown.

No explanation.

Only JSON.
`;

}
