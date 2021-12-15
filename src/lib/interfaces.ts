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
  title: string;
  details?: IOutputDetails[];
}

export interface IOutputDetails {
  text: string;
  color?: string;
}
