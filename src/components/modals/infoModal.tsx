import { faInfoCircle, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LIBRARIES_USED } from "../../lib/libraries";

const InfoModal = () => {
  return (
    <div className="instances-container">
      <div className="settings">
        <div className="flex common-header">
          <FontAwesomeIcon icon={faInfoCircle} className="m-r" />
          <h3>Information on this website</h3>
        </div>

        <div className="info-side-main">
          <div className="info-tech">
            <div className="react-card">
              <div className="react-logo round-img-div flex">
                <img src="react-icon.png" alt="react icon" />
              </div>
              <div className="react-card-framework">
                <h4>Framework</h4>
                <p>React.js</p>
              </div>
            </div>
            <div className="react-card-libraries">
              <h4>Libraries</h4>

              {LIBRARIES_USED.map((library, index) => (
                <div className="library-item" key={index}>
                  <img src={library.imgSrc} alt={`${library.name} library icon`} className={`m-r ${library.applyCss ? "show-css" : ""}`} />
                  <p>{library.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="info-me">
            <div className="round-img-div flex m-r-2">
              <img src="RKD_logo.svg" alt="my initials logo" />
            </div>
            <div className="info-me-details">
              <h4>Made by Reetesh. K. Dooleea</h4>
              <p>15th - 18th December 2021</p>
            </div>
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
