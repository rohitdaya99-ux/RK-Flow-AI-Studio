import { premiereAPI } from "../../services/PremiereAPI";

export default class EditActions {

  async trimSelected() {
    const ctx = await premiereAPI.getTimelineContext();
    return {
      success: true,
      selection: ctx?.selection ?? []
    };
  }

  async razorAtPlayhead() {
    return { success: true };
  }

  async rippleDelete() {
    return { success: true };
  }

  async addTransition(
    matchName = "AE.ADBE Cross Dissolve New",
    trackIndex = 0,
    clipIndex = 0
  ) {

    const PPRO = premiereAPI.getPPRO();

    const project = await PPRO.Project.getActiveProject();
    const sequence = await project.getActiveSequence();

    const selection = await sequence.getSelection();
    const selected = await selection.getTrackItems();

    if (!selected || selected.length === 0) {
      throw new Error("No clip selected.");
    }

    const clip = selected[0];

    console.log("USING SELECTED CLIP");

    const available = Array.from(
      await PPRO.TransitionFactory.getVideoTransitionMatchNames()
    );

    console.log("================================");
    console.log("AVAILABLE TRANSITIONS");
    console.log(available);
    console.log("REQUESTED:", matchName);
    console.log("================================");

    if (!available.includes(matchName)) {
      throw new Error(matchName);
    }

    const transition =
      await PPRO.TransitionFactory.createVideoTransition(matchName);

    console.log("TRANSITION OBJECT:", transition);

    if (!transition) {
      throw new Error("TransitionFactory returned null");
    }

    const options = PPRO.AddTransitionOptions();

    options.setApplyToStart(false);

    console.log("OPTIONS:", options);

    let committed = false;

    await project.lockedAccess(() => {

      committed = project.executeTransaction((compound:any)=>{

        const action = clip.createAddVideoTransitionAction(
          transition,
          options
        );

        console.log("ACTION:", action);

        const accepted = compound.addAction(action);

        console.log("ADD ACTION RESULT:", accepted);

        if (accepted === false) {
          throw new Error("compound.addAction returned false");
        }

      }, "RK Flow Add Transition");

    });

    console.log("TRANSACTION COMMITTED:", committed);

    console.log("CLIP NAME:", await clip.getName());
    console.log("SELECTED:", await clip.getIsSelected());
    console.log("START:", await clip.getStartTime());
    console.log("END:", await clip.getEndTime());
    console.log("IN:", await clip.getInPoint());
    console.log("OUT:", await clip.getOutPoint());

    console.log("TRACK:", trackIndex);
    console.log("INDEX:", clipIndex);

    return {
      success: committed,
      committed
    };

  }

  async addAudioFade() {
    return { success: true };
  }

}
