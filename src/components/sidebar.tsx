import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IEdge } from "../lib/interfaces";
import { getEdges, getVertices } from "../lib/parser";
import { setGreedy } from "../store/actions";

const Sidebar = () => {
  const [instancesInput, setInstancesInput] = useState<String>("");
  const dispatch = useDispatch();

  const readInstances = () => {
    const vertices: Number[] = getVertices(instancesInput);
    const edges: IEdge[] = getEdges(instancesInput);

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
