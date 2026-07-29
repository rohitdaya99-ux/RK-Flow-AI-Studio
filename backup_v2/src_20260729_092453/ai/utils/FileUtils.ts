export class FileUtils {
  static fileName(path: string): string {
    return path.split("/").pop() ?? "";
  }

  static extension(path: string): string {
    const file = this.fileName(path);
    const index = file.lastIndexOf(".");
    return index >= 0 ? file.substring(index + 1) : "";
  }

  static isVideo(path: string): boolean {
    return [
      "mp4",
      "mov",
      "mxf",
      "avi",
      "mkv",
      "r3d",
      "braw"
    ].includes(this.extension(path).toLowerCase());
  }

  static isAudio(path: string): boolean {
    return [
      "wav",
      "mp3",
      "aac",
      "flac"
    ].includes(this.extension(path).toLowerCase());
  }
}

export const fileUtils = FileUtils;