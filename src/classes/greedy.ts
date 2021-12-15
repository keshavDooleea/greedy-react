import { NO_COLOR } from "../lib/constants";
import { IEdge, IGreedy } from "../lib/interfaces";

export class Greedy {
  private colorsList: number[];
  private greedyData: IGreedy;

  constructor(greedyData: IGreedy) {
    this.greedyData = greedyData;

    // 1. initialise C with total nb of nodes of value -1
    this.colorsList = Array.from({ length: this.greedyData.vertices.length }, () => Number(NO_COLOR));
  }
}
