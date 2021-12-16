import { ITemplate } from "./interfaces";

export const TEMPLATE: ITemplate[] = [
  {
    id: "5_3",
    nbVertices: 5,
    nbEdges: 5,
    nbColors: 3,
    instance: `0 1 0 1 0 
            1 0 0 1 1 
            0 0 0 0 1 
            1 1 0 0 0 
            0 1 1 0 0 `,
  },
  {
    id: "10_2",
    nbVertices: 10,
    nbEdges: 24,
    nbColors: 5,
    instance: `0 1 1 1 1 1 0 1 1 0
              1 0 0 0 0 0 1 0 0 0
              1 0 0 0 1 0 1 0 1 0
              1 0 0 0 0 1 1 0 0 0
              1 0 1 0 0 1 0 1 1 1
              1 0 0 1 1 0 1 1 1 0
              0 1 1 1 0 1 0 0 1 1
              1 0 0 0 1 1 0 0 1 1
              1 0 1 0 1 1 1 1 0 0
              0 0 0 0 1 0 1 1 0 0`,
  },
];
