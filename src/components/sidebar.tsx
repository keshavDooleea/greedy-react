import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { OutputColors } from "../lib/enum";
import { IOutput } from "../lib/interfaces";

interface ISidebarProps {
  setLoadInstanceModal: Dispatch<SetStateAction<boolean>>;
  setOpenInfoModal: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setLoadInstanceModal, setOpenInfoModal }: ISidebarProps) => {
  const isGreedyCompleted: boolean = useSelector((state: RootStateOrAny) => state.greedyStatusReducer);
  const outputs: IOutput[] = useSelector((state: RootStateOrAny) => state.outputReducer);
  const outputDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputDivRef && outputDivRef.current) {
      outputDivRef.current.scrollTop = outputDivRef.current.scrollHeight;
    }
  }, [outputs]);

  return (
    <div className="sidebar">
      <div className="sidebar-main c-r">
        <header>
          <button onClick={() => setLoadInstanceModal(true)} disabled={isGreedyCompleted}>
            Load Instances
          </button>
          <button onClick={() => setOpenInfoModal(true)}>Info</button>
        </header>

        <div className="output-container" ref={outputDivRef}>
          {outputs.map((output, index) => (
            <div key={index}>{output.isTitle ? <h4 className="output-mt">{output.text}</h4> : <p style={{ color: output.color === null ? OutputColors.black : output.color }}>{output.text}</p>}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
