import p5Types from "p5";
import { IEdge, IVertice } from "../lib/interfaces";
import { SettingsService } from "../services/settingsService";

export class MyP5 {
  private width: number;
  private height: number;
  private nodeRadius = 30;
  private settingsService: SettingsService = SettingsService.getInstance();

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawGraph = (p5: p5Types, edges: IEdge[], vertices: IVertice[]) => {
    p5.background(255);
    edges.forEach((edge) => this.drawEdge(p5, edge, vertices));
    vertices.forEach((vertice) => this.drawVertice(p5, vertices.length, vertice));
  };

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

  // @todo: draw behind the current vertice from trigonometry
  drawNodeValue = (p5: p5Types, vertice: IVertice, value: string, color: string) => {
    if (!this.settingsService.getShouldShowStep()) return;

    p5.fill(color);
    p5.textSize(20);
    p5.text(value, vertice.x! + 40, vertice.y!);
    p5.noFill();
  };
}
