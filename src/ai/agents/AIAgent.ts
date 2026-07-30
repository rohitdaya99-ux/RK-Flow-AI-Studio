export interface AIAgent {
  readonly name: string;
  execute(input: unknown): Promise<unknown>;
}
