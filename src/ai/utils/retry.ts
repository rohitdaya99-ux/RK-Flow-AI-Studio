export async function retry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      const message = String(error?.message || "");

      if (
        !message.includes("503") &&
        !message.includes("429") &&
        !message.toLowerCase().includes("unavailable")
      ) {
        throw error;
      }

      await new Promise(resolve =>
        setTimeout(resolve, delay * Math.pow(2, i))
      );
    }
  }

  throw lastError;
}
