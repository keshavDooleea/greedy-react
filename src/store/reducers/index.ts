import { combineReducers } from "redux";
import greedyReducer from "./greedy";
import outputReducer from "./output";

const reducers = combineReducers({
  greedyReducer,
  outputReducer,
});

export default reducers;
