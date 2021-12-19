import Sketch from "react-p5";
import p5Types from "p5";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { IGreedy, INodeDegree } from "../lib/interfaces";
import { MyP5 } from "../classes/p5";
import { Greedy } from "../classes/greedy";
import { GraphService } from "../services/graphService";
import { COLORS, ONE_SECOND, WHITE_COLOR } from "../lib/constants";
import { OutputColors } from "../lib/enum";
import { sleep } from "../lib/utils";
import { OutputService } from "../services/outputService";
import { setGreedyHasFinished } from "../store/actions";
import { SettingsService } from "../services/settingsService";

const Workspace = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [p5Types, setP5Types] = useState<p5Types>();
  const [hasGeneratedGraph, setHasGeneratedGraph] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const greedyData: IGreedy = useSelector((state: RootStateOrAny) => state.greedyReducer);
  const outputService = OutputService.getInstance();
  const graphService = GraphService.getInstance();
  const settingsService = SettingsService.getInstance();
  const dispatch = useDispatch();
  let myP5: MyP5;
  let greedy: Greedy;
  const [countdownTime, setCountdownTime] = useState<number>(0);

  // restart drawing
  useEffect(() => {
    p5Types?.loop();
    p5Types?.background(255);

    if (greedyData.vertices) {
      setCountdownTime(settingsService.calculateInitialCountdownTime());
    }
  }, [greedyData, p5Types]);

  // countdown timer
  useEffect(() => {
    const countdown = () => setCountdownTime((previousCountdown) => previousCountdown - 1);
    const interval = setInterval(countdown, ONE_SECOND);
    const cancelCountdown = () => clearInterval(interval);

    if (!showCountdown) cancelCountdown();
    return () => cancelCountdown();
  }, [showCountdown]);

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
    setP5Types(p5);
    p5.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight).parent(canvasParentRef);
  };

  // draw nodes and edges with animation
  const drawInitialGraph = async (p5: p5Types) => {
    outputService.showNbOfNodes(greedyData.vertices);
    for (let i = 0; i < greedyData.vertices.length && !greedyData.shouldStop; i++) {
      await sleep(settingsService.getTimeMs());
      myP5.drawVertice(p5, greedyData.vertices.length, greedyData.vertices[i]);
    }

    if (greedyData.shouldStop) return;

    outputService.showNbOfEdges(greedyData.edges);
    for (let i = 0; i < greedyData.edges.length && !greedyData.shouldStop; i++) {
      await sleep(settingsService.getTimeMs());
      myP5.drawEdge(p5, greedyData.edges[i], greedyData.vertices);
    }

    if (greedyData.shouldStop) return;

    setHasGeneratedGraph(true);
    outputService.dispatchOutput({ isTitle: true, text: "Starting Greedy algorithm" });
    outputService.dispatchOutput({ isTitle: false, text: "Choosing node with highest degree to start with" });
    await sleep(settingsService.getTimeMs());
    myP5.drawGraph(p5, greedyData.edges, greedyData.vertices);
    await sleep(settingsService.getTimeMs());

    p5.loop();
  };

  const draw = async (p5: p5Types) => {
    if (!myP5) myP5 = new MyP5(width, height);
    if (!greedy) greedy = new Greedy();

    if (!greedyData.vertices || greedyData.shouldStop) return;

    // generate initial graph with delay - executed only once
    if (!hasGeneratedGraph) {
      setShowCountdown(true);
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
      // console.count("iterations");

      // select next optimum node
      const nextNode = await greedy.greedyChoice(p5, myP5, greedyData.edges, greedyData.vertices);
      await sleep(settingsService.getTimeMs());
      const smallestColorIndex = await greedy.findSmallestColorIndex(greedyData.edges, greedyData.vertices, nextNode);

      // update next node's color to smallest possible color
      if (greedyData.vertices[nextNode] && greedyData.vertices[nextNode].color === WHITE_COLOR) {
        greedyData.vertices[nextNode].color = COLORS[smallestColorIndex];
        p5.loop();
      }
    } else {
      // algorithm has finished -> end loop
      outputService.showNbOfColors(graphService.getNbOfColorsUsed(greedyData.vertices));
      resetInfos(p5);
      setTimeout(() => setShowCountdown(false), ONE_SECOND);
    }
  };

  const resetInfos = (p5: p5Types) => {
    dispatch(setGreedyHasFinished());
    p5.noLoop();
    setHasGeneratedGraph(false);
  };

  const stopDraw = () => {
    greedyData.shouldStop = true;
    setShowCountdown(false);
    resetInfos(p5Types!);
    outputService.showStopDraw();
  };

  return (
    <div className="workspace">
      <Sketch setup={setup} draw={draw} />

      <div className="workspace-actions">
        <div className={`canvas-counter workspace-action-item ${showCountdown ? "show-workspace-item" : ""}`}>
          <p>{countdownTime}</p>
        </div>

        <div className={`canvas-stopper workspace-action-item ${showCountdown ? "show-workspace-item" : ""}`} onClick={stopDraw}>
          <div className="stop-square"></div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
