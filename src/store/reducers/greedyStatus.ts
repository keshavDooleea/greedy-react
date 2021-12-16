import { IAction } from "../../lib/interfaces";
import { GREEDY_HAS_STARTED, GREEDY_HAS_FINISHED } from "../actions/action_names";

const greedyStatusReducer = (state = false, action: IAction<boolean>) => {
  switch (action.type) {
    case GREEDY_HAS_STARTED:
      return true;
    case GREEDY_HAS_FINISHED:
      return false;
    default:
      return state;
  }
};

export default greedyStatusReducer;
