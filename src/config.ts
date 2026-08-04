declare global {
  interface Window {
    __RKFLOW_GEMINI_API_KEY__?: string;
  }
}

export interface GeminiConfig {
  apiKey: string;
}

export const resolveGeminiConfig = (): GeminiConfig => {
  const apiKey = typeof window === "undefined"
    ? ""
    : window.__RKFLOW_GEMINI_API_KEY__ || localStorage.getItem("rkflow.gemini.apiKey") || "";

  return {
    apiKey: apiKey.trim(),
  };
};

export const saveGeminiConfig = (config: GeminiConfig): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("rkflow.gemini.apiKey", config.apiKey.trim());
  window.__RKFLOW_GEMINI_API_KEY__ = config.apiKey;
};
