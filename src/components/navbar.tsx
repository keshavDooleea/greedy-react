import { faPlusSquare, faProjectDiagram, faInfoCircle, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

interface INavbarProps {
  setCreateInstanceModal: Dispatch<SetStateAction<boolean>>;
  setOpenInfoModal: Dispatch<SetStateAction<boolean>>;
  setLoadInstanceModal: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setCreateInstanceModal, setOpenInfoModal, setLoadInstanceModal }: INavbarProps) => {
  const isGreedyCompleted: boolean = useSelector((state: RootStateOrAny) => state.greedyStatusReducer);

  return (
    <div className="navbar">
      <div className="flex logo">
        <FontAwesomeIcon icon={faProjectDiagram} className="m-r-2" />
        <h3>Greedy Algorithm Visualization</h3>
      </div>
      <div className="navbar-options">
        <button onClick={() => setCreateInstanceModal(true)} disabled={isGreedyCompleted}>
          <FontAwesomeIcon icon={faPlusSquare} className="m-r" />
          Create Own Instance
        </button>
        <button onClick={() => setLoadInstanceModal(true)} disabled={isGreedyCompleted}>
          <FontAwesomeIcon icon={faHandPointer} className="m-r" />
          Load Custom Instance
        </button>
        <button onClick={() => setOpenInfoModal(true)} disabled={isGreedyCompleted}>
          <FontAwesomeIcon icon={faInfoCircle} className="m-r" />
          Info
        </button>
      </div>
    </div>
  );
};

export default Navbar;
