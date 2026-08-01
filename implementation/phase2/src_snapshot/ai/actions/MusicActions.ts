export default class MusicActions {

  async analyzeMusic() {
    return {
      success: true,
      analysis: "music"
    };
  }

  async detectBeat() {
    return {
      success: true,
      analysis: "beats"
    };
  }

  async detectDrops() {
    return {
      success: true,
      analysis: "drops"
    };
  }

  async detectChorus() {
    return {
      success: true,
      analysis: "chorus"
    };
  }

  async autoBeatSync() {
    return {
      success: true,
      analysis: "beatSync"
    };
  }

}
