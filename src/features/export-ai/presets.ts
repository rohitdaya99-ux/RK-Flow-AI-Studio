export interface ExportPresetConfig {
  id:
    | "instagram-reel"
    | "youtube-shorts"
    | "youtube-highlight"
    | "facebook"
    | "whatsapp"
    | "master-export";
  label: string;
  resolution: string;
  aspectRatio: string;
  targetBitrate: string;
  format: string;
  notes: string;
}

export const EXPORT_PRESETS: ExportPresetConfig[] = [
  {
    id: "instagram-reel",
    label: "Instagram Reel",
    resolution: "1080x1920",
    aspectRatio: "9:16",
    targetBitrate: "10-16 Mbps",
    format: "H.264 MP4",
    notes: "Vertical social delivery with compact bitrate for fast upload."
  },
  {
    id: "youtube-shorts",
    label: "YouTube Shorts",
    resolution: "1080x1920",
    aspectRatio: "9:16",
    targetBitrate: "12-20 Mbps",
    format: "H.264 MP4",
    notes: "Vertical short-form preset for YouTube mobile playback."
  },
  {
    id: "youtube-highlight",
    label: "YouTube Highlight",
    resolution: "1920x1080",
    aspectRatio: "16:9",
    targetBitrate: "16-30 Mbps",
    format: "H.264 MP4",
    notes: "Standard highlight export for long-form wedding edits."
  },
  {
    id: "facebook",
    label: "Facebook",
    resolution: "1920x1080",
    aspectRatio: "16:9",
    targetBitrate: "10-18 Mbps",
    format: "H.264 MP4",
    notes: "Balanced delivery for Facebook feed playback."
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    resolution: "1280x720",
    aspectRatio: "16:9",
    targetBitrate: "4-8 Mbps",
    format: "H.264 MP4",
    notes: "Mobile-friendly compressed export for direct sharing."
  },
  {
    id: "master-export",
    label: "Master Export",
    resolution: "Sequence Native",
    aspectRatio: "Sequence Native",
    targetBitrate: "High / mezzanine",
    format: "ProRes / DNx / H.264 depending on editor preset",
    notes: "Archive-quality delivery. Requires an explicit Premiere export preset."
  }
];
