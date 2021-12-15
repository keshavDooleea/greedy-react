export interface IEdge {
  start: Number;
  end: Number;
}

export interface IGreedy {
  vertices: Number[];
  edges: IEdge[];
}

export interface IAction<T> {
  type: String;
  data: T;
}
