export const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const getShortTime = (time: number) => time / 8;
export const getMiddleTime = (time: number) => time / 2.5;
