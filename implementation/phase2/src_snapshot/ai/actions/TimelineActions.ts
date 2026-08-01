export default class TimelineActions {

  async razorAtPlayhead() {
    return {
      success: true,
      operation: "razorAtPlayhead"
    };
  }

  async addMarker(name: string) {
    return {
      success: true,
      operation: "addMarker",
      marker: name
    };
  }

  async deleteGaps() {
    return {
      success: true,
      operation: "deleteGaps"
    };
  }

  async applyTransition(name: string) {
    return {
      success: true,
      operation: "applyTransition",
      transition: name
    };
  }

  async trimSelectedClips() {
    return {
      success: true,
      operation: "trimSelectedClips"
    };
  }

  async rippleDelete() {
    return {
      success: true,
      operation: "rippleDelete"
    };
  }

}
