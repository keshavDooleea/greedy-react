import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { IEdge, IVertice } from "./lib/interfaces";
import { GraphService } from "./services/graphService";
import { setGreedy } from "./store/actions";

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
            <textarea
              className="c-r"
              defaultValue={(graphService.getGraphInput() as string) || ""}
              onChange={(e) => {
                setInstancesInput(e.target.value);
              }}
            ></textarea>
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
