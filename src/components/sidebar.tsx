import { useEffect, useRef } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { OutputColors } from "../lib/enum";
import { IOutput } from "../lib/interfaces";

const Sidebar = () => {
  const outputs: IOutput[] = useSelector((state: RootStateOrAny) => state.outputReducer);
  const outputDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to bottom when received new output
    if (outputDivRef && outputDivRef.current) {
      outputDivRef.current.scrollTop = outputDivRef.current.scrollHeight;
    }
  }, [outputs]);

  return (
    <div className="sidebar">
      <div className="output-container" ref={outputDivRef}>
        {outputs.map((output, index) => (
          <div key={index}>{output.isTitle ? <h4 className="output-mt">{output.text}</h4> : <p style={{ color: output.color === null ? OutputColors.black : output.color }}>{output.text}</p>}</div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
