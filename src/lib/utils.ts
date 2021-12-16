import { SettingsService } from "../services/settingsService";

export const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

export const sleep = (time: number) => {
  const settingsService = SettingsService.getInstance();
  time = settingsService.getShouldShowStep() ? time : time / settingsService.getNbNodes();

  return new Promise((resolve) => setTimeout(resolve, time));
};

export const removeWhitespace = (input: string) => input.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "").trim();
