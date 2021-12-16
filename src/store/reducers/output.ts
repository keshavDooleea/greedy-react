import { IAction, IOutput } from "../../lib/interfaces";
import { CLEAR_OUTPUT, NEW_OUTPUT } from "../actions/action_names";

const outputReducer = (state: IOutput[] = [], action: IAction<IOutput>) => {
  switch (action.type) {
    case NEW_OUTPUT:
      return [...state, action.data];
    case CLEAR_OUTPUT:
      return [];
    default:
      return state;
  }
};

export default outputReducer;
