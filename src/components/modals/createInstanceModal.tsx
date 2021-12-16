import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { INITIAL_MATRIX } from "../../lib/constants";
import { GraphService } from "../../services/graphService";
import Settings from "../settings";

interface ICreateModal {
  shouldShowStep: boolean;
  setShouldShowStep: Dispatch<SetStateAction<boolean>>;
  setInstancesInput: Dispatch<SetStateAction<string>>;
  readInstances: () => void;
}

const CreateInstanceModal = ({ shouldShowStep, setShouldShowStep, setInstancesInput, readInstances }: ICreateModal) => {
  const graphService = GraphService.getInstance();

  return (
    <div className="instances-container">
      <Settings shouldShowStep={shouldShowStep} setShouldShowStep={setShouldShowStep} />

      <div className="instances-main">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faPenFancy} className="m-r" />
          <h3>Create your own instance</h3>
        </div>

        <div className="instances-inner-main">
          <textarea
            className="default-text"
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

        <button className="c-r custom-btn" onClick={readInstances}>
          Execute
        </button>
      </div>
    </div>
  );
};

export default CreateInstanceModal;
