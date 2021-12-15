import { useDispatch } from "react-redux";
import { IEdge, IOutput, IVertice } from "../lib/interfaces";
import { showOutput } from "../store/actions";

// singleton to dispatch events to show current detail/step on sidebar -> read in Sidebar.tsx
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

  showCustom = (output: IOutput) => this.dispatchOutput(output);

  generateGraph = (vertices: IVertice[], edges: IEdge[]) => {
    this.dispatchOutput({ isTitle: true, text: "Generating graph" });
    this.dispatchOutput({ isTitle: false, text: `Drawing ${vertices.length} nodes` });
    this.dispatchOutput({ isTitle: false, text: `Drawing ${edges.length} edges` });
  };

  showNbOfColors = (nbColors: number) => {
    this.dispatchOutput({ isTitle: true, text: "Finished coloration" });
    this.dispatchOutput({ isTitle: false, text: `Used ${nbColors} colors` });
  };
}
