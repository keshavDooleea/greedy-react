import { ITemplate } from "../lib/interfaces";
import { TEMPLATE } from "../lib/template";

export class LoadInstanceService {
  private static instance: LoadInstanceService | null;
  private currentTemplate: ITemplate = TEMPLATE[0];

  static getInstance = (): LoadInstanceService => {
    if (LoadInstanceService.instance == null) {
      LoadInstanceService.instance = new LoadInstanceService();
    }

    return this.instance as LoadInstanceService;
  };

  setCurrentTemplate = (template: ITemplate) => (this.currentTemplate = template);
  getCurrentTemplate = () => this.currentTemplate;
}
