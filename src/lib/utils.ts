import { LONG_TIME_SLEEP } from "./constants";

export const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const getShortTime = () => LONG_TIME_SLEEP / 8; // short
export const getMiddleTime = () => LONG_TIME_SLEEP / 2.5; // time sleep
