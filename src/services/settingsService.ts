import { ONE_SECOND } from "../lib/constants";

export class SettingsService {
  private static instance: SettingsService | null;
  private nbNodes = 0;
  private nbEdges = 0;
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
  setNbEdges = (nbEdges: number) => (this.nbEdges = nbEdges);

  getShouldShowStep = () => this.shouldShowStep;
  getTimeDelay = () => this.timeDelay;
  getNbNodes = () => this.nbNodes;

  // getShortTime = () => this.timeDelay / this.middleTimeFactor;
  // getMiddleTime = () => this.timeDelay / this.middleTimeFactor;
  getTimeMs = () => this.timeDelay * ONE_SECOND;

  calculateInitialCountdownTime = (): number => {
    const baseTime = this.nbNodes * this.timeDelay;

    if (this.shouldShowStep) {
      const timeToDrawGraph = baseTime * 2; // nodes + edges
      const timePerNode = baseTime * 4; // showing currently 4 infos per node

      return timePerNode + timeToDrawGraph + (this.nbEdges - this.nbNodes) * this.timeDelay;
    } else {
      return baseTime + this.timeDelay;
    }
  };
}
