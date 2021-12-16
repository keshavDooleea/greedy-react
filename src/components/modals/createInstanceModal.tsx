import { faCog, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { INITIAL_MATRIX } from "../../lib/constants";
import { GraphService } from "../../services/graphService";
import { SettingsService } from "../../services/settingsService";

interface ICreateModal {
  shouldShowStep: boolean;
  setShouldShowStep: Dispatch<SetStateAction<boolean>>;
  setInstancesInput: Dispatch<SetStateAction<string>>;
  readInstances: () => void;
}

const CreateInstanceModal = ({ shouldShowStep, setShouldShowStep, setInstancesInput, readInstances }: ICreateModal) => {
  const settingsService = SettingsService.getInstance();
  const graphService = GraphService.getInstance();

  return (
    <div className="instances-container ">
      <div className="settings">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faCog} className="m-r" />
          <h3>Settings</h3>
        </div>

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
          <input type="number" step={500} id="delay-input" defaultValue={settingsService.getTimeDelay()} onChange={(e) => settingsService.setTimeDelay(Number(e.target.value))} />
        </div>
      </div>

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
