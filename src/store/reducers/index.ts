import { combineReducers } from "redux";
import greedyReducer from "./greedy";
import outputReducer from "./output";
import greedyStatusReducer from "./greedyStatus";

const reducers = combineReducers({
  greedyReducer,
  outputReducer,
  greedyStatusReducer,
});

export default reducers;
