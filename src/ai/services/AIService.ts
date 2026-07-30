import ProviderRouter from "../router/ProviderRouter";

export class AIService {
  getProviders() {
    return ProviderRouter.providers;
  }
}

export default AIService;
