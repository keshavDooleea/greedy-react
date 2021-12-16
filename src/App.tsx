import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { INITIAL_MATRIX } from "./lib/constants";
import { IEdge, IVertice } from "./lib/interfaces";
import { GraphService } from "./services/graphService";
import { OutputService } from "./services/outputService";
import { SettingsService } from "./services/settingsService";
import { setGreedy, setGreedyHasStarted } from "./store/actions";

function App() {
  const [loadInstanceModal, setLoadInstanceModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const graphService = GraphService.getInstance();
  const outputService = OutputService.getInstance();
  const settingsService = SettingsService.getInstance();
  const [shouldShowStep, setShouldShowStep] = useState<boolean>(settingsService.getShouldShowStep());

  const [instancesInput, setInstancesInput] = useState<String>(INITIAL_MATRIX);
  const dispatch = useDispatch();

  const readInstances = () => {
    setLoadInstanceModal(false);
    outputService.clearOutputs();
    graphService.setGraphInput(instancesInput.trim());

    const vertices: IVertice[] = graphService.getVertices();
    const edges: IEdge[] = graphService.getEdges();

    dispatch(setGreedy({ vertices, edges }));
    dispatch(setGreedyHasStarted());

    settingsService.setNbNodes(vertices.length);
    settingsService.setShouldShowStep(shouldShowStep);
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
              <div className="settings">
                <h3>Settings</h3>

                <div className="setting-item">
                  <h4>Show nodes info in graph</h4>
                  <small>Whether to show informations next to each vertice during execution</small>
                  <div className="settings-radio">
                    <span>
                      <input type="radio" id="yes-step" name="show-step" value="Yes" checked={shouldShowStep} onChange={() => setShouldShowStep(true)} />
                      <label htmlFor="yes-step">Yes</label>
                    </span>
                    <span>
                      <input type="radio" id="no-step" name="show-step" value="No" checked={!shouldShowStep} onChange={() => setShouldShowStep(false)} />
                      <label htmlFor="no-step">No</label>
                    </span>
                  </div>
                </div>

                <div className="setting-item">
                  <h4>Delay in between steps (ms)</h4>
                  <small>If show-nodes above is checked to Yes, then this delay will be applied between each step. If not, the algorithm will take (delay / nodes length) per node to complete.</small>
                  <input type="number" id="delay-input" defaultValue={settingsService.getTimeDelay()} onChange={(e) => settingsService.setTimeDelay(Number(e.target.value))} />
                </div>
              </div>
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
