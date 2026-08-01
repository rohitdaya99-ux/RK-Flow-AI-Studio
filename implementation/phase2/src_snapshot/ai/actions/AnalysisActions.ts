export default class AnalysisActions {

  async detectFaces() {
    return {
      success: true,
      analysis: "faces"
    };
  }

  async detectSmile() {
    return {
      success: true,
      analysis: "smile"
    };
  }

  async detectBlur() {
    return {
      success: true,
      analysis: "blur"
    };
  }

  async detectClosedEyes() {
    return {
      success: true,
      analysis: "closedEyes"
    };
  }

  async detectBestMoments() {
    return {
      success: true,
      analysis: "bestMoments"
    };
  }

  async detectEmotion() {
    return {
      success: true,
      analysis: "emotion"
    };
  }

}
