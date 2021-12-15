import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { INITIAL_MATRIX, TIME_SLEEP } from "./lib/constants";
import { IEdge, IOutput, IVertice } from "./lib/interfaces";
import { GraphService } from "./services/graphService";
import { setGreedy, showOutput } from "./store/actions";

function App() {
  const [loadInstanceModal, setLoadInstanceModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const graphService = GraphService.getInstance();

  const [instancesInput, setInstancesInput] = useState<String>(INITIAL_MATRIX);
  const dispatch = useDispatch();

  const readInstances = () => {
    setLoadInstanceModal(false);
    graphService.setGraphInput(instancesInput.trim());

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
        <Sidebar setLoadInstanceModal={setLoadInstanceModal} setOpenInfoModal={setOpenInfoModal} />
      </main>

      {loadInstanceModal && (
        <Modal setOpenModal={setLoadInstanceModal}>
          <>
            <h2>Enter instances</h2>
            <div className="instances-main">
              <textarea
                className="c-r default-text"
                placeholder="Enter an Adjacency matrix (filled with 0 and 1)"
                defaultValue={(graphService.getGraphInput() as string) || INITIAL_MATRIX}
                onChange={(e) => {
                  setInstancesInput(e.target.value.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, ""));
                }}
              ></textarea>
              <div className="instances-example">
                <div className="instances-title">
                  <h3>Example of instance input</h3>
                  <p>(Adjacency Matrix)</p>
                </div>
                <div className="default-text">
                  {INITIAL_MATRIX.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>

                <div className="instructions">
                  <p>
                    A delay of <strong>{TIME_SLEEP}</strong>ms has been added in between the steps by default!
                  </p>
                  <p>Still have to display details of each steps</p>
                </div>
              </div>
            </div>
            <button className="c-r" onClick={readInstances}>
              Execute
            </button>
          </>
        </Modal>
      )}

      {openInfoModal && (
        <Modal setOpenModal={setOpenInfoModal}>
          <>
            <h2>Information on this Website</h2>

            <div className="middle">
              <p>This visualisation was made on React JS using the library P5.js on the 15th of December 2021</p>

              <p>explain Greedy..</p>
            </div>

            <p className="github">
              View code on Github:{" "}
              <a href="https://github.com/keshavDooleea/greedy-react" target="_blank">
                https://github.com/keshavDooleea/greedy-react
              </a>
            </p>
          </>
        </Modal>
      )}
    </div>
  );
}

export default App;
