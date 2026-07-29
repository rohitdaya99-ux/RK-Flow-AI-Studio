export interface FaceDetection {
  faceId: string;
  personName: string;
  confidence: number;
  clipId: string;
  frame: number;
  smile: boolean;
  eyesOpen: boolean;
  emotion:
    | "Happy"
    | "Emotional"
    | "Neutral"
    | "Sad"
    | "Excited";
}

export class FaceEngine {
  private faces: FaceDetection[] = [];

  add(face: FaceDetection) {
    this.faces.push(face);
  }

  getAll() {
    return this.faces;
  }

  findByPerson(name: string) {
    return this.faces.filter(
      f => f.personName.toLowerCase() === name.toLowerCase()
    );
  }

  bestShot(name: string) {
    return this.findByPerson(name).sort(
      (a, b) => b.confidence - a.confidence
    )[0];
  }

  clear() {
    this.faces = [];
  }
}

export const faceEngine = new FaceEngine();