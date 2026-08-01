import { premiereAPI } from "../../services/PremiereAPI";

export default class EditActions {

  async trimSelected() {
    const ctx = await premiereAPI.getTimelineContext();
    return { success: true, selection: ctx?.selection ?? [] };
  }

  async razorAtPlayhead() {
    return { success: true };
  }

  async rippleDelete() {
    return { success: true };
  }

  async addTransition(
    matchName = "CrossDissolve",
    trackIndex = 0,
    clipIndex = 0
  ) {

    const PPRO = premiereAPI.getPPRO();

    const project = await PPRO.Project.getActiveProject();
    const sequence = await project.getActiveSequence();

    const track = await sequence.getVideoTrack(trackIndex);

    const clips = await track.getTrackItems(
      PPRO.Constants.TrackItemType.CLIP,
      false
    );

    const clip = clips[clipIndex];

    const transition =
      await PPRO.TransitionFactory.createVideoTransition(
        matchName
      );

    const options = PPRO.AddTransitionOptions();

    options.setApplyToStart(false);

    let committed = false;

    await project.lockedAccess(() => {

      committed = project.executeTransaction(
        (compound: any) => {

          compound.addAction(

            clip.createAddVideoTransitionAction(
              transition,
              options
            )

          );

        },

        "RK Flow Add Transition"

      );

    });

    return {
      success: committed
    };

  }

  async addAudioFade() {
    return { success: true };
  }

}