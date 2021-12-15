import p5Types from "p5";
import { IEdge, IVertice } from "../lib/interfaces";

export class MyP5 {
  private width: number;
  private height: number;
  private nodeRadius = 30;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawVertice = (p5: p5Types, totalNbVertices: number, vertice: IVertice) => {
    const middleX = this.width / 2;
    const middleY = this.height / 2;
    const diameter = Math.min(middleX, middleY) * 0.85;
    const angle = (360 / totalNbVertices) * (vertice.nb + 1);

    const x = diameter * Math.cos((-angle * Math.PI) / 180) + this.width / 2;
    const y = diameter * Math.sin((-angle * Math.PI) / 180) + this.height / 2;

    vertice.x = x;
    vertice.y = y;

    p5.fill(vertice.color);
    p5.ellipse(x, y, this.nodeRadius * 2, this.nodeRadius * 2);

    p5.fill(0);
    p5.textSize(40);
    p5.text(vertice.nb, x - 12, y + 14);
    p5.noFill();
  };

  drawEdge = (p5: p5Types, edge: IEdge, vertices: IVertice[]) => {
    const startEdgeX = vertices[edge.start].x as number;
    const startEdgeY = vertices[edge.start].y as number;

    const endEdgeX = vertices[edge.end].x as number;
    const endEdgeY = vertices[edge.end].y as number;

    p5.fill(0);
    p5.line(startEdgeX, startEdgeY, endEdgeX, endEdgeY);
    p5.noFill();
  };
}
