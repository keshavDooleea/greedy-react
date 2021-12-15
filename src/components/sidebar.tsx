import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IEdge, IVertice } from "../lib/interfaces";
import { GraphService } from "../services/graphService";
import { setGreedy } from "../store/actions";

const Sidebar = () => {
  const [instancesInput, setInstancesInput] = useState<String>("");
  const dispatch = useDispatch();

  const readInstances = () => {
    const graphService = GraphService.getInstance();
    graphService.setGraphInput(instancesInput);

    const vertices: IVertice[] = graphService.getVertices();
    const edges: IEdge[] = graphService.getEdges();

    dispatch(setGreedy({ vertices, edges }));
  };

  return (
    <div className="sidebar">
      <h2>Enter instances</h2>
      <textarea className="c-r" onChange={(e) => setInstancesInput(e.target.value)}></textarea>
      <button className="c-r" onClick={readInstances}>
        Execute
      </button>
    </div>
  );
};

export default Sidebar;
