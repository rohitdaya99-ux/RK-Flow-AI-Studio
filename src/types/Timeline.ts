export type TimelineTrackType = "video" | "audio";
export type TimelineClipMediaType = "video" | "audio" | "still" | "unknown";
export type TimelineMetadataSource = "host-verified" | "metadata-fallback" | "unavailable";

export interface TimelineCapabilityNote {
  field: string;
  source: TimelineMetadataSource;
  reason: string;
}

export interface TimelineFrameSize {
  width: number;
  height: number;
}

export interface TimelineClip {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  trackIndex: number;
  selected: boolean;
  mediaPath: string | null;
  projectItemId: string | null;
  projectItemNodeId: string | null;
  projectItemGuid?: string | null;
  projectItem?: any;
  mediaType: TimelineClipMediaType;
  trackType?: TimelineTrackType;
  itemType: string | null;
  sourceIn: number | null;
  sourceOut: number | null;
  speed: number | null;
  disabled: boolean | null;
  linkedClipIds: string[] | null;
  proxyState: boolean | null;
  sourceFrameSize: TimelineFrameSize | null;
  capabilityNotes: TimelineCapabilityNote[];
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: TimelineTrackType;
  locked: boolean | null;
  capabilityNotes: TimelineCapabilityNote[];
  clips: TimelineClip[];
}

export interface TimelineMarker {
  id: string;
  name: string;
  time: number;
  color?: string;
}

export interface TimelineState {
  sequenceName: string;
  fps: number;
  timebase: number | null;
  frameSize: TimelineFrameSize | null;
  duration: number;
  playhead: number;
  inPoint: number;
  outPoint: number;
  videoTracks: TimelineTrack[];
  audioTracks: TimelineTrack[];
  markers: TimelineMarker[];
  capabilityNotes: TimelineCapabilityNote[];
}

export interface InOutRange {
  inPoint: number;
  outPoint: number;
}

export function createEmptyTimeline(): TimelineState {
  return {
    sequenceName: "",
    fps: 0,
    timebase: null,
    frameSize: null,
    duration: 0,
    playhead: 0,
    inPoint: 0,
    outPoint: 0,
    videoTracks: [],
    audioTracks: [],
    markers: [],
    capabilityNotes: []
  };
}
