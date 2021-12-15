import { COLORS } from "../lib/constants";
import { IDsat, IEdge, IVertice } from "../lib/interfaces";
import { GraphService } from "../services/graphService";

export class Greedy {
  private graphService = GraphService.getInstance();

  greedyChoice = (edges: IEdge[], vertices: IVertice[]) => {
    const unvisitedNodes = this.graphService.getUnvisitedNodes(vertices);

    // get number of colors for each neighbor
    const DSATList: IDsat[] = [];
    unvisitedNodes.forEach((unvisitedNode) => {
      DSATList.push({
        nodeNb: unvisitedNode.nb,
        dsat: this.graphService.calculateDSAT(edges, vertices, unvisitedNode),
      });
    });

    // get max DSAT
    const maxDsatNb = this.graphService.getMaxDSAT(DSATList);
    const maxDsatNodes: IVertice[] = [];

    // get all nodes with highest DSAT
    DSATList.forEach((dsat) => {
      if (dsat.dsat === maxDsatNb) {
        maxDsatNodes.push(vertices[dsat.nodeNb]);
      }
    });

    // find the DSAT with highest node degree -> our next node
    const dsatNodeDegrees = this.graphService.getNodesDegree(edges, maxDsatNodes);
    const maxDsatNode = this.graphService.getMaxDegreeNode(dsatNodeDegrees);

    return maxDsatNode;
  };

  findSmallestColorIndex = async (edges: IEdge[], vertices: IVertice[], nextNode: number): Promise<number> => {
    // check available colors of current neighbors
    const neighbors = this.graphService.getNeighbors(edges, vertices[nextNode]);
    const neighborColors = neighbors.map((neighbor) => vertices[neighbor].color);
    let smallestColorIndex = -1;

    // find smallest K out of nb of nodes
    for (let i = 0; i < COLORS.length; i++) {
      if (!neighborColors.includes(COLORS[i])) {
        smallestColorIndex = i;
        break;
      }
    }

    return smallestColorIndex;
  };
}
