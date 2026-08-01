export interface TimelineClip {
  name: string;
  track: number;
  start: number;
  end: number;
  duration: number;
  selected: boolean;
}

export async function getSelectedClips(): Promise<TimelineClip[]> {
  const PPRO = (window as any).PPRO;

  const project = await PPRO.Project.getActiveProject();
  const sequence = await project.getActiveSequence();

  const trackCount = await sequence.getVideoTrackCount();

  const clips: TimelineClip[] = [];

  for (let t = 0; t < trackCount; t++) {
    const track = await sequence.getVideoTrack(t);

    const items = await track.getTrackItems(t, 1);

    if (!items || !items.length) continue;

    for (const clip of items) {
      try {
        if (!clip) continue;

        clips.push({
          name: clip.getName(),
          track: clip.getTrackIndex(),
          selected: clip.getIsSelected(),
          start: clip.getStartTime().seconds,
          end: clip.getEndTime().seconds,
          duration: clip.getDuration().seconds,
        });
      } catch (err) {
        console.log("Skipped invalid clip:", err);
      }
    }
  }

  return clips;
}
