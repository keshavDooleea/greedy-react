import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import Settings from "../settings";

interface ILoadInstanceModal {
  shouldShowStep: boolean;
  setShouldShowStep: Dispatch<SetStateAction<boolean>>;
}

const LoadInstanceModal = ({ shouldShowStep, setShouldShowStep }: ILoadInstanceModal) => {
  return (
    <div className="instances-container">
      <Settings shouldShowStep={shouldShowStep} setShouldShowStep={setShouldShowStep} />

      <div className="instances-main">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faHandPointDown} className="m-r" />
          <h3>Select a custom instance</h3>
        </div>

        <div className="instances-inner-main">
          <div className="templates-container">incomplete</div>
        </div>

        <button className="c-r custom-btn" disabled>
          Execute
        </button>
      </div>
    </div>
  );
};

export default LoadInstanceModal;
