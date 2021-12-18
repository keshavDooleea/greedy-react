import { ONE_SECOND } from "../lib/constants";

export class SettingsService {
  private static instance: SettingsService | null;
  private nbNodes = 0;
  private shouldShowStep: boolean = true;
  private timeDelay: number = 4;

  // private shortTimeFactor = 8;
  // private middleTimeFactor = 2.5;

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

  // getShortTime = () => this.timeDelay / this.middleTimeFactor;
  // getMiddleTime = () => this.timeDelay / this.middleTimeFactor;
  getTimeMs = () => this.timeDelay * ONE_SECOND;

  calculateInitialCountdownTime = (): number => {
    if (this.shouldShowStep) {
      return 5000;
    } else {
      let totalTime = this.timeDelay * this.nbNodes + this.timeDelay;
      return totalTime;
    }
  };
}
