import { COLORS, DSAT_COLOR, SELECTED_DSAT_COLOR, SELECTED_DSAT_NODE } from "../lib/constants";
import { IDsat, IEdge, IVertice } from "../lib/interfaces";
import { GraphService } from "../services/graphService";
import { MyP5 } from "./p5";
import p5Types from "p5";
import { OutputService } from "../services/outputService";
import { sleep } from "../lib/utils";
import { OutputColors } from "../lib/enum";
import { SettingsService } from "../services/settingsService";

export class Greedy {
  private graphService = GraphService.getInstance();
  private outputService = OutputService.getInstance();
  private settingsService = SettingsService.getInstance();

  // wait and remove text nodes
  refreshGraph = async (p5: p5Types, myP5: MyP5, edges: IEdge[], vertices: IVertice[]) => {
    await sleep(this.settingsService.getTimeDelay() * 2);
    myP5.drawGraph(p5, edges, vertices);
  };

  greedyChoice = async (p5: p5Types, myP5: MyP5, edges: IEdge[], vertices: IVertice[]) => {
    const unvisitedNodes = this.graphService.getUnvisitedNodes(vertices);

    // get number of colors for each neighbor
    this.outputService.showDSAT();
    await sleep(this.settingsService.getMiddleTime());
    const DSATList: IDsat[] = [];
    unvisitedNodes.forEach((unvisitedNode) => {
      const dsatValue = this.graphService.calculateDSAT(edges, vertices, unvisitedNode);
      DSATList.push({
        nodeNb: unvisitedNode.nb,
        dsat: dsatValue,
      });

      myP5.drawNodeValue(p5, unvisitedNode, `DSAT: ${dsatValue}`, DSAT_COLOR);
    });

    this.outputService.showCustom({ isTitle: false, text: `Calculating nodes with highest DSAT..`, color: OutputColors.black });
    await this.refreshGraph(p5, myP5, edges, vertices);

    // get max DSAT
    const maxDsatNb = this.graphService.getMaxDSAT(DSATList);
    const maxDsatNodes: IVertice[] = [];

    // get all nodes with highest DSAT
    DSATList.forEach((dsat) => {
      if (dsat.dsat === maxDsatNb) {
        maxDsatNodes.push(vertices[dsat.nodeNb]);
        myP5.drawNodeValue(p5, vertices[dsat.nodeNb], `Highest DSAT of ${maxDsatNb}`, SELECTED_DSAT_COLOR);
      }
    });
    const maxNodeLength = maxDsatNodes.length;
    this.outputService.showCustom({ isTitle: false, text: `Found ${maxNodeLength} node${maxNodeLength > 1 ? "s" : ""} with highest DSAT of ${maxDsatNb}`, color: SELECTED_DSAT_COLOR });

    this.outputService.showCustom({ isTitle: false, text: "Choosing node with highest degree & DSAT.." });
    await this.refreshGraph(p5, myP5, edges, vertices);

    // find the DSAT with highest node degree -> our next node
    const dsatNodeDegrees = this.graphService.getNodesDegree(edges, maxDsatNodes);
    const maxDsatNode = this.graphService.getMaxDegreeNode(dsatNodeDegrees);
    myP5.drawNodeValue(p5, vertices[maxDsatNode], "Selected node", SELECTED_DSAT_NODE);
    this.outputService.showCustom({ isTitle: false, text: `Node #${maxDsatNode} has been chosen to be colored`, color: SELECTED_DSAT_NODE });

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
