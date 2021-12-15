import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { INITIAL_MATRIX, TIME_SLEEP } from "./lib/constants";
import { IEdge, IVertice } from "./lib/interfaces";
import { GraphService } from "./services/graphService";
import { setGreedy } from "./store/actions";

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
            <h2>Enter your own instance</h2>
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
                  <h3>Some examples of instance input</h3>
                  <p>(Adjacency Matrix)</p>
                </div>
                <div className="two-columns default-text">
                  <div>
                    {INITIAL_MATRIX.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div>
                    <p>0 1 0 0 0</p>
                    <p>1 0 1 1 0</p>
                    <p>0 1 0 1 1</p>
                    <p>0 1 1 0 1</p>
                    <p>0 0 1 1 0</p>
                  </div>
                </div>

                <div className="instructions">
                  <p>
                    A delay of <strong>{TIME_SLEEP}</strong>ms has been added in between the steps by default! <br />
                    (in order to show the details of each step which I will add soon)
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

      {openInfoModal && (
        <Modal setOpenModal={setOpenInfoModal}>
          <>
            <h2>Information on this Website</h2>

            <div className="middle">
              <p>This visualization was made on React JS (with TypeScript) using the library P5.js and Redux Store on the 15th of December 2021</p>

              <p>explain Greedy..</p>
            </div>

            <p className="github">
              View code on Github:{" "}
              <a href="https://github.com/keshavDooleea/greedy-react" target="_blank" rel="noreferrer">
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
