import { faCodeBranch, faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITemplate } from "../../lib/interfaces";
import { TEMPLATE } from "../../lib/template";
import { removeWhitespace } from "../../lib/utils";
import Settings from "../settings";

interface ILoadInstanceModal {
  shouldShowStep: boolean;
  setShouldShowStep: Dispatch<SetStateAction<boolean>>;
  setInstancesInput: Dispatch<SetStateAction<string>>;
  readInstances: () => void;
}

const LoadInstanceModal = ({ shouldShowStep, setShouldShowStep, setInstancesInput, readInstances }: ILoadInstanceModal) => {
  const [currentTemplate, setCurrentTemplate] = useState<ITemplate>();

  // set first template by default
  useEffect(() => {
    const setInitialTemplate = () => onTemplateClicked(TEMPLATE[0]);
    setInitialTemplate();
  }, []);

  const onTemplateClicked = (template: ITemplate) => {
    setInstancesInput(removeWhitespace(template.instance));
    setCurrentTemplate(template);
  };

  return (
    <div className="instances-container">
      <Settings shouldShowStep={shouldShowStep} setShouldShowStep={setShouldShowStep} />

      <div className="instances-main">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faHandPointDown} className="m-r" />
          <h3>Select a custom instance</h3>
        </div>

        <div className="instances-inner-main">
          <div className="templates-container">
            {TEMPLATE.map((template) => (
              <div className={`template-card ${currentTemplate?.id === template.id ? "active-card" : ""}`} key={template.id} onClick={() => onTemplateClicked(template)}>
                <div className="template-info">
                  <FontAwesomeIcon icon={faCodeBranch} className="m-r" />
                  <h4>{template.nbVertices}</h4>
                  <p className="m-r">Vertices</p>
                  <h4>{template.nbEdges}</h4>
                  <p>Edges</p>
                </div>
                <p className="gray">Number of colors used: {template.nbColors}</p>
                <div className="template-img">
                  <img src={`/templates/empty/${template.id}.png`} className="template-empty-img" alt="empty-template-img" />
                  <img src={`/templates/completed/${template.id}.png`} className="template-completed-img" alt="completed-template-img" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="c-r custom-btn" onClick={readInstances} disabled={!currentTemplate}>
          Execute
        </button>
      </div>
    </div>
  );
};

export default LoadInstanceModal;
