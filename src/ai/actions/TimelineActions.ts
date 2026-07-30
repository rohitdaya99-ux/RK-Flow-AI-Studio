export default class TimelineActions {

  async razorAtPlayhead() {
    return { success: true };
  }

  async addMarker(name: string) {
    return { success: true, marker: name };
  }

  async deleteGaps() {
    return { success: true };
  }

  async applyTransition(name: string) {
    return { success: true, transition: name };
  }

}
