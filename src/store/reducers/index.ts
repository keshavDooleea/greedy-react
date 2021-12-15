import { combineReducers } from "redux";
import greedyReducer from "./greedy";

const reducers = combineReducers({
  greedyReducer,
});

export default reducers;
