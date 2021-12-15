import { Dispatch, SetStateAction } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { OutputColors } from "../lib/enum";
import { IOutput } from "../lib/interfaces";

interface ISidebarProps {
  setLoadInstanceModal: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setLoadInstanceModal }: ISidebarProps) => {
  const outputs: IOutput[] = useSelector((state: RootStateOrAny) => state.outputReducer);

  return (
    <div className="sidebar">
      <div className="sidebar-main c-r">
        <header>
          <button onClick={() => setLoadInstanceModal(true)}>Load Instances</button>
          <button>Info</button>
        </header>

        <div className="output-container">
          {outputs.map((output, index) => (
            <div key={index} className="output-item">
              <h4>{output.title}</h4>
              {output.details?.map((detail, detailIndex) => (
                <p key={detailIndex} style={{ color: detail.color === null ? OutputColors.black : detail.color }}>
                  {detail.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
