import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Modal from "./components/modal";
import CreateInstanceModal from "./components/modals/createInstanceModal";
import InfoModal from "./components/modals/infoModal";
import LoadInstanceModal from "./components/modals/loadInstanceModal";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Workspace from "./components/workspace";
import { INITIAL_MATRIX } from "./lib/constants";
import { IEdge, IVertice } from "./lib/interfaces";
import { removeWhitespace } from "./lib/utils";
import { GraphService } from "./services/graphService";
import { OutputService } from "./services/outputService";
import { SettingsService } from "./services/settingsService";
import { setGreedy, setGreedyHasStarted } from "./store/actions";

function App() {
  const [createInstanceModal, setCreateInstanceModal] = useState<boolean>(false);
  const [loadInstanceModal, setLoadInstanceModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const graphService = GraphService.getInstance();
  const outputService = OutputService.getInstance();
  const settingsService = SettingsService.getInstance();
  const [shouldShowStep, setShouldShowStep] = useState<boolean>(settingsService.getShouldShowStep());
  const [instancesInput, setInstancesInput] = useState<string>(removeWhitespace(INITIAL_MATRIX));
  const dispatch = useDispatch();

  const readInstances = () => {
    setCreateInstanceModal(false);
    setLoadInstanceModal(false);
    outputService.clearOutputs();
    graphService.setGraphInput(instancesInput);

    const vertices: IVertice[] = graphService.getVertices();
    const edges: IEdge[] = graphService.getEdges();

    dispatch(setGreedy({ vertices, edges }));
    dispatch(setGreedyHasStarted());

    settingsService.setNbNodes(vertices.length);
    settingsService.setShouldShowStep(shouldShowStep);
  };

  return (
    <div className="App">
      <main>
        <Navbar setCreateInstanceModal={setCreateInstanceModal} setOpenInfoModal={setOpenInfoModal} setLoadInstanceModal={setLoadInstanceModal} />
        <Workspace />
      </main>
      <Sidebar />

      {createInstanceModal && (
        <Modal setOpenModal={setCreateInstanceModal}>
          <CreateInstanceModal shouldShowStep={shouldShowStep} setShouldShowStep={setShouldShowStep} setInstancesInput={setInstancesInput} readInstances={readInstances} />
        </Modal>
      )}

      {openInfoModal && (
        <Modal setOpenModal={setOpenInfoModal}>
          <InfoModal />
        </Modal>
      )}

      {loadInstanceModal && (
        <Modal setOpenModal={setLoadInstanceModal}>
          <LoadInstanceModal shouldShowStep={shouldShowStep} setShouldShowStep={setShouldShowStep} setInstancesInput={setInstancesInput} readInstances={readInstances} />
        </Modal>
      )}
    </div>
  );
}

export default App;
