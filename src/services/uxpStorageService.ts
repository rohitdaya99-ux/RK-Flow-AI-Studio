export interface UXPFilePickerService {
  pickAudioFile(): Promise<{ name: string; path: string } | null>;
  pickImageFile(): Promise<{ name: string; path: string } | null>;
  pickVideoFile(): Promise<{ name: string; path: string } | null>;
}

class DefaultUXPFilePickerService implements UXPFilePickerService {
  private get localFileSystem() {
    try {
      const uxp = (globalThis as any).require?.("uxp");
      return uxp?.storage?.localFileSystem;
    } catch {
      return null;
    }
  }

  private async pickFile(types: string[]): Promise<{ name: string; path: string } | null> {
    const fs = this.localFileSystem;
    if (!fs) {
      console.warn("[UXPStorage] localFileSystem not available. Cannot pick file.");
      return null;
    }

    try {
      const file = await fs.getFileForOpening({ types, allowMultiple: false });
      if (!file) return null;
      
      return {
        name: file.name,
        path: file.nativePath
      };
    } catch (error) {
      console.error("[UXPStorage] Error picking file:", error);
      return null;
    }
  }

  public pickAudioFile() {
    return this.pickFile(["wav", "mp3", "aiff", "aif", "m4a", "aac", "flac"]);
  }

  public pickImageFile() {
    return this.pickFile(["jpg", "jpeg", "png", "webp", "tiff"]);
  }

  public pickVideoFile() {
    return this.pickFile(["mp4", "mov", "m4v"]);
  }
}

export const uxpStorageService = new DefaultUXPFilePickerService();
