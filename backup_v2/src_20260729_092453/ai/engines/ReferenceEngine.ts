export interface ReferenceClip {
  id: string;
  source: string;
  category: string;
  duration: number;
  notes: string;
}

export class ReferenceEngine {
  private references: ReferenceClip[] = [];

  add(reference: ReferenceClip) {
    this.references.push(reference);
  }

  getAll() {
    return this.references;
  }

  findByCategory(category: string) {
    return this.references.filter(
      r => r.category.toLowerCase() === category.toLowerCase()
    );
  }

  remove(id: string) {
    this.references = this.references.filter(
      r => r.id !== id
    );
  }

  clear() {
    this.references = [];
  }
}

export const referenceEngine = new ReferenceEngine();