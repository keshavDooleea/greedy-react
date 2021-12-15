export interface IEdge {
  start: Number;
  end: Number;
}

export interface IVertice {
  nb: Number;
  x?: Number;
  y?: Number;
}

export interface IGreedy {
  vertices: IVertice[];
  edges: IEdge[];
}

export interface IAction<T> {
  type: String;
  data: T;
}

// 0 0 0 1 0
// 0 0 1 1 1
// 0 1 0 1 0
// 1 1 1 0 0
// 0 1 0 0 0
