import { PremiereContextManager } from "./PremiereContextManager";
import { PremiereReader } from "../premiere/PremiereReader";

export class PremiereContextProvider {
  private static reader = new PremiereReader();

  static async refresh(): Promise<void> {
    const context = await this.reader.readContext();
    PremiereContextManager.update(context);
  }
}
