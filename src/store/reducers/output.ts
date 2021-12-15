import { IAction, IOutput } from "../../lib/interfaces";
import { NEW_OUTPUT } from "../actions/action_names";

const outputReducer = (state: IOutput[] = [], action: IAction<IOutput>) => {
  switch (action.type) {
    case NEW_OUTPUT:
      return [...state, action.data];
    default:
      return state;
  }
};

export default outputReducer;
