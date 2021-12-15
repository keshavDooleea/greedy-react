import { IAction, IGreedy, IOutput } from "../../lib/interfaces";
import { NEW_OUTPUT, SET_GREEDY_INPUT } from "./action_names";

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
