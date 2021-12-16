export class SettingsService {
  private static instance: SettingsService | null;
  private nbNodes = 0;
  private shouldShowStep: boolean = true;
  private timeDelay: number = 4000;

  private shortTimeFactor = 8;
  private middleTimeFactor = 2.5;

  static getInstance = (): SettingsService => {
    if (SettingsService.instance == null) {
      SettingsService.instance = new SettingsService();
    }

    return this.instance as SettingsService;
  };

  setTimeDelay = (newTimeDekay: number) => (this.timeDelay = newTimeDekay);
  setShouldShowStep = (shouldShow: boolean) => (this.shouldShowStep = shouldShow);
  setNbNodes = (nbNodes: number) => (this.nbNodes = nbNodes);

  getShouldShowStep = () => this.shouldShowStep;
  getTimeDelay = () => this.timeDelay;
  getNbNodes = () => this.nbNodes;

  getShortTime = () => this.timeDelay / this.shortTimeFactor;
  getMiddleTime = () => this.timeDelay / this.middleTimeFactor;
}
