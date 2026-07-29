export type WeddingEvent =
  | "Haldi"
  | "Mehendi"
  | "Sangeet"
  | "Baraat"
  | "Bride Entry"
  | "Groom Entry"
  | "Varmala"
  | "Pheras"
  | "Sindoor"
  | "Mangalsutra"
  | "Vidaai"
  | "Reception";

export interface WeddingScene {
  id: string;
  event: WeddingEvent;
  clipId: string;
  priority: number;
  emotion: number;
  completed: boolean;
}

export class WeddingEngine {
  private scenes: WeddingScene[] = [];

  add(scene: WeddingScene) {
    this.scenes.push(scene);
  }

  getAll() {
    return this.scenes;
  }

  getByEvent(event: WeddingEvent) {
    return this.scenes.filter(s => s.event === event);
  }

  getPriorityScenes(minPriority = 8) {
    return this.scenes.filter(s => s.priority >= minPriority);
  }

  clear() {
    this.scenes = [];
  }
}

export const weddingEngine = new WeddingEngine();