export default class PremiereLogger {

  private logs: string[] = [];

  info(message: string) {
    this.logs.push(`[INFO] ${message}`);
  }

  warn(message: string) {
    this.logs.push(`[WARN] ${message}`);
  }

  error(message: string) {
    this.logs.push(`[ERROR] ${message}`);
  }

  all() {
    return [...this.logs];
  }

  clear() {
    this.logs = [];
  }

}
