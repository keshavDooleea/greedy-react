export class SettingsService {
  private static instance: SettingsService | null;
  private shouldShowStep: boolean = true;
  private timeDelay: number = 4000;

  static getInstance = (): SettingsService => {
    if (SettingsService.instance == null) {
      SettingsService.instance = new SettingsService();
    }

    return this.instance as SettingsService;
  };

  setShouldShowStep = (shouldShow: boolean) => (this.shouldShowStep = shouldShow);
  setTimeDelay = (newTimeDekay: number) => (this.timeDelay = newTimeDekay);

  getShouldShowStep = () => this.shouldShowStep;
  getTimeDelay = () => this.timeDelay;
}
