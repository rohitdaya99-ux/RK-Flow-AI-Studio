export default class PerformanceMetrics {

  measure(name: string, fn: () => unknown) {

    const start = performance.now();

    const result = fn();

    const end = performance.now();

    return {
      name,
      duration: end - start,
      result
    };

  }

}
