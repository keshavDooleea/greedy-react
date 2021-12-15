import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { IGreedy } from "../lib/interfaces";
import { MyP5 } from "../classes/p5";
import { Greedy } from "../classes/greedy";
import { GraphService } from "../services/graphService";

const Workspace = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const greedyData: IGreedy = useSelector((state: RootStateOrAny) => state.greedyReducer);
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
      if (!greedy) greedy = new Greedy(greedyData);

      // draw base nodes and vertices
      greedyData.edges.forEach((edge) => myP5.drawEdge(p5, edge, greedyData.vertices));
      greedyData.vertices.forEach((vertice) => myP5.drawVertice(p5, greedyData.vertices.length, vertice));

      graphService.getDegree();
    }
    // x++;
  };

  return <Sketch setup={setup} draw={draw} className="workspace" />;
};

export default Workspace;
