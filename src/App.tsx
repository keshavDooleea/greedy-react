import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { TIME_SLEEP } from "./lib/constants";
import { IEdge, IOutput, IVertice } from "./lib/interfaces";
import { GraphService } from "./services/graphService";
import { setGreedy, showOutput } from "./store/actions";

function App() {
  const [loadInstanceModal, setLoadInstanceModal] = useState<boolean>(false);
  const graphService = GraphService.getInstance();

  const [instancesInput, setInstancesInput] = useState<String>("");
  const dispatch = useDispatch();

  const readInstances = () => {
    setLoadInstanceModal(false);
    graphService.setGraphInput(instancesInput);

    const vertices: IVertice[] = graphService.getVertices();
    const edges: IEdge[] = graphService.getEdges();

    dispatch(setGreedy({ vertices, edges }));

    // show in terminal
    const output: IOutput = {
      title: "Generating graph",
      details: [{ text: `Drawing ${vertices.length} nodes` }, { text: `Drawing ${edges.length} edges` }],
    };
    dispatch(showOutput(output));
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        <Workspace />
        <Sidebar setLoadInstanceModal={setLoadInstanceModal} />
      </main>

      {loadInstanceModal && (
        <Modal setLoadInstanceModal={setLoadInstanceModal}>
          <>
            <h2>Enter instances</h2>
            <div className="instances-main">
              <textarea
                className="c-r default-text"
                defaultValue={(graphService.getGraphInput() as string) || ""}
                onChange={(e) => {
                  setInstancesInput(e.target.value);
                }}
              ></textarea>
              <div className="instances-example">
                <h3>Example of instance input</h3>
                <div className="default-text">
                  <p>0 1 0 0 0</p>
                  <p>1 0 1 1 0</p>
                  <p>0 1 0 1 1</p>
                  <p>0 1 1 0 1</p>
                  <p>0 0 1 1 0</p>
                </div>

                <div className="instructions">
                  <p>Don't leave any whitespace or empty line in between inputs</p>
                  <p>
                    A delay of <strong>{TIME_SLEEP}</strong>ms has been added in between the steps by default!
                  </p>
                </div>
              </div>
            </div>
            <button className="c-r" onClick={readInstances}>
              Execute
            </button>
          </>
        </Modal>
      )}
    </div>
  );
}

export default App;
