import { IEdge, IVertice } from "./interfaces";

const getVertices = (input: String): IVertice[] => {
  const nbLines = input.split("\n").length;
  const vertices: IVertice[] = [];

  for (let i = 0; i < nbLines; i++) {
    vertices.push({
      nb: i,
    });
  }

  return vertices;
};

const isDuplicateEdge = (newEdge: IEdge, edges: IEdge[]): Boolean => {
  const foundEdges = edges.filter((edge) => (edge.start === newEdge.start && edge.end === newEdge.end) || (edge.start === newEdge.end && edge.end === newEdge.start));
  return foundEdges.length > 0;
};

const getEdges = (input: String): IEdge[] => {
  const edges: IEdge[] = [];

  input.split("\n").forEach((line, index) => {
    line.split(" ").forEach((item, itemIndex) => {
      if (item === "1") {
        const newEdge: IEdge = {
          start: index,
          end: itemIndex,
        };

        if (!isDuplicateEdge(newEdge, edges)) edges.push(newEdge);
      }
    });
  });

  return edges;
};

export { getVertices, getEdges };
