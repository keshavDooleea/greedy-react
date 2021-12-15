import { useDispatch } from "react-redux";
import { IEdge, IOutput, IVertice } from "../lib/interfaces";
import { showOutput } from "../store/actions";

export class OutputService {
  private static instance: OutputService | null;
  private dispatch = useDispatch();

  static getInstance = (): OutputService => {
    if (OutputService.instance == null) {
      OutputService.instance = new OutputService();
    }

    return this.instance as OutputService;
  };

  dispatchOutput = (output: IOutput) => this.dispatch(showOutput(output));

  generateGraph = (vertices: IVertice[], edges: IEdge[]) => {
    this.dispatchOutput({
      title: "Generating graph",
      details: [{ text: `Drawing ${vertices.length} nodes` }, { text: `Drawing ${edges.length} edges` }],
    } as IOutput);
  };
}
