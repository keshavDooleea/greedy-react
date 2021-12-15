export const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
