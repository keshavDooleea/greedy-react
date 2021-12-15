import { IAction, IGreedy } from "../../lib/interfaces";
import { SET_GREEDY_INPUT } from "../actions/action_names";

const greedyReducer = (state = [], action: IAction<IGreedy>) => {
  switch (action.type) {
    case SET_GREEDY_INPUT:
      return action.data;
    default:
      return state;
  }
};

export default greedyReducer;
