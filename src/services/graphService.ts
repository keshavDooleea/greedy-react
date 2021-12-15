import { WHITE_COLOR } from "../lib/constants";
import { IDsat, IEdge, INodeDegree, IVertice } from "../lib/interfaces";

export class GraphService {
  private colorIndex = 0;
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
      vertices.push({ nb: i, color: WHITE_COLOR });
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

  getNeighbors = (edges: IEdge[], currentNode: IVertice): number[] => {
    const neighbors: number[] = [];

    edges.forEach((edge) => {
      if (edge.start === currentNode.nb) neighbors.push(edge.end);
      else if (edge.end === currentNode.nb) neighbors.push(edge.start);
    });

    return neighbors;
  };

  getNodesDegree = (edges: IEdge[], vertices: IVertice[]): INodeDegree[] => {
    const degrees: INodeDegree[] = [];

    vertices.forEach((vertice) => {
      const neighbor = this.getNeighbors(edges, vertice);
      degrees.push({
        nodeNb: vertice.nb,
        degree: neighbor.length,
      });
    });

    return degrees;
  };

  getMaxDegreeNode = (nodeDegrees: INodeDegree[]) => {
    const maxDegree = nodeDegrees.reduce((acc, degree) => (acc = acc > degree.degree ? acc : degree.degree), 0);
    return nodeDegrees.filter((nodes) => nodes.degree === maxDegree)[0].nodeNb;
  };

  // keep checkin if a node with no color exists
  canContinue = (vertices: IVertice[]): Boolean => {
    return this.getUnvisitedNodes(vertices).length > 0;
  };

  getUnvisitedNodes = (vertices: IVertice[]) => {
    return vertices.filter((vertice) => vertice.color === WHITE_COLOR);
  };

  // calculate nb of adjacent colors of a node
  calculateDSAT = (edges: IEdge[], vertices: IVertice[], node: IVertice): number => {
    let currentDSAT = 0;

    const neighbors = this.getNeighbors(edges, node);

    neighbors.forEach((neighbor) => {
      if (vertices[neighbor].color !== WHITE_COLOR) currentDSAT++;
    });

    return currentDSAT;
  };

  getMaxDSAT = (dsatList: IDsat[]): number => {
    return dsatList.reduce((acc, dsat) => (acc = acc > dsat.dsat ? acc : dsat.dsat), 0);
  };
}
