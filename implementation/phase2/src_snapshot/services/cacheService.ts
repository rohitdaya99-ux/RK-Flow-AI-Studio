export class CacheService {
  private readonly prefix = 'rkflow:';
  private readonly ttlMs = 1000 * 60 * 30;

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as { value: T; expiresAt: number };
      if (parsed.expiresAt < Date.now()) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      return parsed.value;
    } catch {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    const payload = { value, expiresAt: Date.now() + this.ttlMs };
    localStorage.setItem(this.prefix + key, JSON.stringify(payload));
  }

  clear(key?: string): void {
    if (key) {
      localStorage.removeItem(this.prefix + key);
      return;
    }

    const keys = Object.keys(localStorage).filter((item) => item.startsWith(this.prefix));
    keys.forEach((item) => localStorage.removeItem(item));
  }
}
