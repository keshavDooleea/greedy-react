import { Dispatch, SetStateAction } from "react";

interface ISidebarProps {
  setLoadInstanceModal: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setLoadInstanceModal }: ISidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-main c-r">
        <header>
          <button onClick={() => setLoadInstanceModal(true)}>Load Instances</button>
          <button>Info</button>
        </header>

        <div className="output-container"></div>
      </div>
    </div>
  );
};

export default Sidebar;
