import { faInfoCircle, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoModal = () => {
  return (
    <div className="instances-container">
      <div className="settings">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faInfoCircle} className="m-r" />
          <h3>Information on this website</h3>
        </div>

        <div className="info-side-main">
          <div className="info-tech"></div>
          <div className="info-me">
            <h4>Made by Reetesh. K. Dooleea</h4>
            <p>15th - 18th December 2021</p>
          </div>
        </div>
      </div>

      <div className="instances-main">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faProjectDiagram} className="m-r-2" />
          <h3>About Greedy Optimization Algorithm</h3>
        </div>

        <div className="instances-inner-main">
          <div className="info-greedy-main">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
