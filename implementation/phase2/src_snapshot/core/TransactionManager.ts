export class TransactionManager {
  private readonly PPRO: any;

  constructor(PPRO: any) {
    this.PPRO = PPRO;
  }

  async run<T>(
    callback: (project: any) => Promise<T>
  ): Promise<T> {
    const project = await this.PPRO.Project.getActiveProject();

    return await project.lockedAccess(async () => {
      return await callback(project);
    });
  }

  async executeAction(
    actionBuilder: (project: any) => Promise<any>
  ): Promise<boolean> {
    return await this.run(async (project) => {
      const action = await actionBuilder(project);

      if (!action) {
        throw new Error("TransactionManager: No action returned.");
      }

      return await project.executeTransaction(
        (compoundAction: any) => {
          compoundAction.addAction(action);
        }
      );
    });
  }
}

export default TransactionManager;