import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { IGreedy, INodeDegree } from "../lib/interfaces";
import { MyP5 } from "../classes/p5";
import { Greedy } from "../classes/greedy";
import { GraphService } from "../services/graphService";
import { COLORS, LONG_TIME_SLEEP, SHORT_TIME_SLEEP, TIME_SLEEP, WHITE_COLOR } from "../lib/constants";
import { OutputColors } from "../lib/enum";
import { sleep } from "../lib/utils";
import { OutputService } from "../services/outputService";

const Workspace = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const greedyData: IGreedy = useSelector((state: RootStateOrAny) => state.greedyReducer);
  const outputService = OutputService.getInstance();
  const graphService = GraphService.getInstance();
  let myP5: MyP5;
  let greedy: Greedy;
  let hasGeneratedGraph = false;

  const showDegreeOutput = (degrees: INodeDegree[], maxDegreeNode: number) => {
    outputService.dispatchOutput({ text: `Coloring chosen node: #${greedyData.vertices[maxDegreeNode].nb}`, isTitle: true });

    degrees.forEach((degree) => {
      outputService.dispatchOutput({
        isTitle: false,
        text: `Node #${degree.nodeNb} has a degree of ${degree.degree}`,
        color: degree.nodeNb === maxDegreeNode ? OutputColors.main : OutputColors.black,
      });
    });
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvasDiv = document.querySelector(".workspace") as HTMLElement;

    setWidth(canvasDiv.offsetWidth);
    setHeight(canvasDiv.offsetHeight);
    p5.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight).parent(canvasParentRef);
  };

  // draw nodes and edges with animation
  const drawInitialGraph = async (p5: p5Types) => {
    outputService.showNbOfNodes(greedyData.vertices);
    for (let i = 0; i < greedyData.vertices.length; i++) {
      await sleep(SHORT_TIME_SLEEP);
      myP5.drawVertice(p5, greedyData.vertices.length, greedyData.vertices[i]);
    }

    outputService.showNbOfEdges(greedyData.edges);
    for (let i = 0; i < greedyData.edges.length; i++) {
      await sleep(SHORT_TIME_SLEEP);
      myP5.drawEdge(p5, greedyData.edges[i], greedyData.vertices);
    }

    hasGeneratedGraph = true;
    outputService.dispatchOutput({ isTitle: true, text: "Starting Greedy algorithm" });
    await sleep(SHORT_TIME_SLEEP);
    myP5.drawGraph(p5, greedyData.edges, greedyData.vertices);
    await sleep(TIME_SLEEP);

    p5.loop();
  };

  const draw = async (p5: p5Types) => {
    if (!myP5) myP5 = new MyP5(width, height);

    if (greedyData.vertices != null) {
      if (!greedy) greedy = new Greedy();

      // generate initial graph with delay
      if (!hasGeneratedGraph) {
        outputService.dispatchOutput({ isTitle: true, text: "Generating graph" });
        drawInitialGraph(p5);
        p5.noLoop();
        return;
      }

      myP5.drawGraph(p5, greedyData.edges, greedyData.vertices);

      // get first/starting node with highest degree
      const degrees = graphService.getNodesDegree(greedyData.edges, greedyData.vertices);
      const maxDegreeNode = graphService.getMaxDegreeNode(degrees);

      if (greedyData.vertices[maxDegreeNode].color === WHITE_COLOR) {
        showDegreeOutput(degrees, maxDegreeNode);
        greedyData.vertices[maxDegreeNode].color = COLORS[0];
        myP5.drawGraph(p5, greedyData.edges, greedyData.vertices);
      }

      // keep checkin if a node with no color (white color) exists -> means some node hasn't got a number yet
      const unvisitedNodesNb = graphService.getUnvisitedNodes(greedyData.vertices).length;
      if (unvisitedNodesNb > 0) {
        p5.noLoop();
        outputService.showCustom({ text: `${unvisitedNodesNb} node${unvisitedNodesNb > 1 ? "s" : ""} to color`, isTitle: true });
        await sleep(TIME_SLEEP);
        console.count("iterations");

        // select next optimum node
        const nextNode = await greedy.greedyChoice(p5, myP5, greedyData.edges, greedyData.vertices);
        await sleep(LONG_TIME_SLEEP);
        const smallestColorIndex = await greedy.findSmallestColorIndex(greedyData.edges, greedyData.vertices, nextNode);

        // update next node's color to smallest possible color
        if (greedyData.vertices[nextNode] && greedyData.vertices[nextNode].color === WHITE_COLOR) {
          greedyData.vertices[nextNode].color = COLORS[smallestColorIndex];
          p5.loop();
        }
      } else {
        // algorithm has finished -> end loop
        outputService.showNbOfColors(graphService.getNbOfColorsUsed(greedyData.vertices));
        outputService.dispatchOutput({
          text: `Refresh the page to retry again for the time being`,
          isTitle: true,
        });
        p5.noLoop();
      }
    }
  };

  return <Sketch setup={setup} draw={draw} className="workspace" />;
};

export default Workspace;
