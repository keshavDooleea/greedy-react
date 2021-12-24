export interface IEdge {
  start: number;
  end: number;
}

export interface IVertice {
  nb: number;
  x?: number;
  y?: number;
  color: string;
}

export interface IGreedy {
  vertices: IVertice[];
  edges: IEdge[];
  shouldStop: boolean;
}

export interface INodeDegree {
  nodeNb: number;
  degree: number;
}

export interface IDsat {
  nodeNb: number;
  dsat: number;
}

export interface IAction<T> {
  type: String;
  data: T;
}

export interface IOutput {
  text: string;
  color?: string;
  isTitle: boolean;
}

export interface ITemplate {
  id: string;
  nbVertices: number;
  nbEdges: number;
  nbColors: number;
  instance: string;
}

export interface ILibrary {
  name: string;
  imgSrc: string;
  applyCss: boolean;
}
