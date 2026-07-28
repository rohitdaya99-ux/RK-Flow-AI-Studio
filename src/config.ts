declare global {
  interface Window {
    __RKFLOW_GEMINI_API_KEY__?: string;
    __RKFLOW_GEMINI_ACCOUNT__?: string;
  }
}

const DEFAULT_GEMINI_API_KEY = 'AQ.Ab8RN6J6SWp_IBif-ZeWmzZz01KK63ioURzR-KRXjonlxjUeKQ';
const DEFAULT_GEMINI_ACCOUNT_EMAIL = 'rohitdaya99@gmail.com';

export interface GeminiConfig {
  apiKey: string;
  accountEmail: string;
}

export const resolveGeminiConfig = (): GeminiConfig => {
  if (typeof window === 'undefined') {
    return {
      apiKey: DEFAULT_GEMINI_API_KEY,
      accountEmail: DEFAULT_GEMINI_ACCOUNT_EMAIL,
    };
  }

  const apiKey = window.__RKFLOW_GEMINI_API_KEY__ || localStorage.getItem('rkflow.gemini.apiKey') || DEFAULT_GEMINI_API_KEY;
  const accountEmail = window.__RKFLOW_GEMINI_ACCOUNT__ || localStorage.getItem('rkflow.gemini.accountEmail') || DEFAULT_GEMINI_ACCOUNT_EMAIL;

  return {
    apiKey,
    accountEmail,
  };
};

export const saveGeminiConfig = (config: GeminiConfig): void => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('rkflow.gemini.apiKey', config.apiKey);
  localStorage.setItem('rkflow.gemini.accountEmail', config.accountEmail);
  window.__RKFLOW_GEMINI_API_KEY__ = config.apiKey;
  window.__RKFLOW_GEMINI_ACCOUNT__ = config.accountEmail;
};
