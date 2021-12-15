import { IEdge, IVertice } from "../lib/interfaces";

export class GraphService {
  private graphInput: String = "";
  private static graphInstance: GraphService | null;

  static getInstance = (): GraphService => {
    if (GraphService.graphInstance == null) {
      GraphService.graphInstance = new GraphService();
    }

    return this.graphInstance as GraphService;
  };

  setGraphInput = (input: String) => {
    this.graphInput = input;
  };

  // prevent adding the same edge twice
  isDuplicateEdge = (newEdge: IEdge, edges: IEdge[]): Boolean => {
    const foundEdges = edges.filter((edge) => (edge.start === newEdge.start && edge.end === newEdge.end) || (edge.start === newEdge.end && edge.end === newEdge.start));
    return foundEdges.length > 0;
  };

  // get all nodes in an array
  getVertices = (): IVertice[] => {
    const nbLines = this.graphInput.split("\n").length;
    const vertices: IVertice[] = [];

    for (let i = 0; i < nbLines; i++) {
      vertices.push({ nb: i });
    }

    return vertices;
  };

  // get pair of edges: (1, 4) means node 1 is connected to node 4
  getEdges = (): IEdge[] => {
    const edges: IEdge[] = [];

    this.graphInput.split("\n").forEach((line, index) => {
      line.split(" ").forEach((item, itemIndex) => {
        if (item === "1") {
          const newEdge: IEdge = {
            start: index,
            end: itemIndex,
          };

          if (!this.isDuplicateEdge(newEdge, edges)) edges.push(newEdge);
        }
      });
    });

    return edges;
  };

  getDegree = () => {};
}
