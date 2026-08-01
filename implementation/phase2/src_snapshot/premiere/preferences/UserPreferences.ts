export interface UserPreferences {

  autoSave: boolean;
  autoAnalyze: boolean;
  darkMode: boolean;

}

export default class PreferencesStore {

  private prefs: UserPreferences = {
    autoSave: true,
    autoAnalyze: true,
    darkMode: true
  };

  get() {
    return this.prefs;
  }

  update(values: Partial<UserPreferences>) {
    this.prefs = {
      ...this.prefs,
      ...values
    };
  }

}
