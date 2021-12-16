import { IAction, IGreedy, IOutput } from "../../lib/interfaces";
import { GREEDY_HAS_STARTED, GREEDY_HAS_FINISHED, NEW_OUTPUT, SET_GREEDY_INPUT } from "./action_names";

// what we want to do
export const setGreedy = (greedy: IGreedy): IAction<IGreedy> => {
  return {
    type: SET_GREEDY_INPUT,
    data: greedy,
  };
};

export const showOutput = (output: IOutput): IAction<IOutput> => {
  return {
    type: NEW_OUTPUT,
    data: output,
  };
};

export const setGreedyHasStarted = (): IAction<boolean> => {
  return {
    type: GREEDY_HAS_STARTED,
    data: true,
  };
};

export const setGreedyHasFinished = (): IAction<boolean> => {
  return {
    type: GREEDY_HAS_FINISHED,
    data: false,
  };
};
