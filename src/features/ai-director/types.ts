export interface AIDirectorAsset {
  id: string;
  type: string;
  tags?: string[];
  path?: string;
  start?: number;
  end?: number;
  duration?: number;
  score?: number;
}

export interface AIDirectorContext {
  project: {
    name: string;
    resolution: string;
    frameRate: string;
  };
  userPreferences: {
    style: string;
    mood: string;
    length: string;
  };
  availableAssets: AIDirectorAsset[];
  weddingSpecifics: {
    coupleName: string;
    date: string;
    events: string[];
  };
}
