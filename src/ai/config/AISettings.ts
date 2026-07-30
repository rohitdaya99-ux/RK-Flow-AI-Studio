import { AIModel, DEFAULT_MODEL } from "../models/ModelRegistry";

export class AISettings {
  private static model: AIModel = DEFAULT_MODEL;

  static getModel(): AIModel {
    return this.model;
  }

  static setModel(model: AIModel): void {
    this.model = model;
  }
}
