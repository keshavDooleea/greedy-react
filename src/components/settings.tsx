import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { SettingsService } from "../services/settingsService";

interface ISettings {
  shouldShowStep: boolean;
  setShouldShowStep: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({ shouldShowStep, setShouldShowStep }: ISettings) => {
  const settingsService = SettingsService.getInstance();

  return (
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
  );
};

export default Settings;
