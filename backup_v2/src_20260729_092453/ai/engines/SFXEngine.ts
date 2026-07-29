export interface SFXItem {
  id: string;
  name: string;
  category: string;
  duration: number;
  position: number;
  volume: number;
}

export class SFXEngine {
  private effects: SFXItem[] = [];

  add(effect: SFXItem) {
    this.effects.push(effect);
  }

  getAll() {
    return this.effects;
  }

  findByCategory(category: string) {
    return this.effects.filter(
      e => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  remove(id: string) {
    this.effects = this.effects.filter(
      e => e.id !== id
    );
  }

  clear() {
    this.effects = [];
  }
}

export const sfxEngine = new SFXEngine();