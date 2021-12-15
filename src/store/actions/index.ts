import { IAction, IGreedy } from "../../lib/interfaces";
import { SET_GREEDY_INPUT } from "./action_names";

// what we want to do
export const setGreedy = (greedy: IGreedy): IAction<IGreedy> => {
  return {
    type: SET_GREEDY_INPUT,
    data: greedy,
  };
};
