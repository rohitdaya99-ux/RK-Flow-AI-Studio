export class PremiereService {
  isConnected(): boolean {
    return typeof window !== "undefined";
  }

  getPPRO() {
    return (window as any).PPRO ?? null;
  }

  inspect() {
    const ppro = this.getPPRO();

    console.clear();

    console.log("========== RK FLOW ==========");
    console.log("window.PPRO =", ppro);

    if (!ppro) {
      console.warn("PPRO not found.");
      return;
    }

    console.log("Keys:", Object.keys(ppro));

    if (ppro.app) {
      console.log("App:", ppro.app);
      console.log("App Keys:", Object.keys(ppro.app));
    }

    if (ppro.app?.project) {
      console.log("Project:", ppro.app.project);
      console.log("Project Keys:", Object.keys(ppro.app.project));
    }

    if (ppro.app?.project?.activeSequence) {
      console.log("Sequence:", ppro.app.project.activeSequence);
      console.log(
        "Sequence Keys:",
        Object.keys(ppro.app.project.activeSequence)
      );
    }

    console.log("=============================");
  }
}

export const premiereService = new PremiereService();