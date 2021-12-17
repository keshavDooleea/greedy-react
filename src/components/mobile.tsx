import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APP_NAME } from "../lib/constants";

const Mobile = () => {
  return (
    <div className="mobile">
      <img src="/RKD_logo.svg" alt="my-logo" className="mobile-logo" />
      <p>Visit on a tablet, desktop or screens above 700px wide to view</p>
      <h1 className="common-header">{APP_NAME}</h1>
      <FontAwesomeIcon icon={faProjectDiagram} className="common-header mobile-icon" />

      <h3 className="mobile-me">Reetesh. K. Dooleea</h3>
    </div>
  );
};

export default Mobile;
