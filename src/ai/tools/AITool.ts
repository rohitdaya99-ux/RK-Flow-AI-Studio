export interface AITool {
  name: string;
  execute(input: unknown): Promise<unknown>;
}
