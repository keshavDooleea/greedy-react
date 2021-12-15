import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { IGreedy, IOutput, IOutputDetails } from "../lib/interfaces";
import { MyP5 } from "../classes/p5";
import { Greedy } from "../classes/greedy";
import { GraphService } from "../services/graphService";
import { COLORS, WHITE_COLOR } from "../lib/constants";
import { showOutput } from "../store/actions";
import { OutputColors } from "../lib/enum";

const Workspace = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const greedyData: IGreedy = useSelector((state: RootStateOrAny) => state.greedyReducer);
  const dispatch = useDispatch();
  const graphService = GraphService.getInstance();
  let myP5: MyP5;
  let greedy: Greedy;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvasDiv = document.querySelector(".workspace") as HTMLElement;

    setWidth(canvasDiv.offsetWidth);
    setHeight(canvasDiv.offsetHeight);
    p5.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(255);

    if (!myP5) myP5 = new MyP5(width, height);

    if (greedyData.vertices != null) {
      if (!greedy) greedy = new Greedy();

      greedyData.edges.forEach((edge) => myP5.drawEdge(p5, edge, greedyData.vertices));
      greedyData.vertices.forEach((vertice) => myP5.drawVertice(p5, greedyData.vertices.length, vertice));

      // get first/starting node with highest degree
      const degrees = graphService.getNodesDegree(greedyData.edges, greedyData.vertices);
      const maxDegreeNode = graphService.getMaxDegreeNode(degrees);

      if (greedyData.vertices[maxDegreeNode].color === WHITE_COLOR) {
        const degreesText: IOutputDetails[] = [];
        degrees.forEach((degree) => degreesText.push({ text: `Node #${degree.nodeNb} has a degree of ${degree.degree}`, color: degree.degree === maxDegreeNode ? OutputColors.main : OutputColors.black }));

        const output: IOutput = {
          title: `Coloring first chosen node: #${greedyData.vertices[maxDegreeNode].nb}`,
          details: degreesText,
        };
        dispatch(showOutput(output));
        greedyData.vertices[maxDegreeNode].color = COLORS[0];
      }

      // keep checkin if a node with no color (white color) exists -> means some node hasn't got a number yet
      if (graphService.canContinue(greedyData.vertices)) {
        // select next optimum node
        const nextNode = greedy.greedyChoice(greedyData.edges, greedyData.vertices);

        // check available colors of current neighbors
        const neighbors = graphService.getNeighbors(greedyData.edges, greedyData.vertices[nextNode]);
        const neighborColors = neighbors.map((neighbor) => greedyData.vertices[neighbor].color);
        let smallestColorIndex = -1;

        // find smallest K out of nb of nodes
        for (let i = 0; i < COLORS.length; i++) {
          if (!neighborColors.includes(COLORS[i])) {
            smallestColorIndex = i;
            break;
          }
        }

        // update next node's color to smallest possible color
        if (greedyData.vertices[nextNode].color === WHITE_COLOR) greedyData.vertices[nextNode].color = COLORS[smallestColorIndex];
      }
    }
    // x++;
  };

  return <Sketch setup={setup} draw={draw} className="workspace" />;
};

export default Workspace;
