import { useEffect, useLayoutEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";
import DashboardScreen from "../screens/dashboard";
import { getAllProcesses } from "../service/processService";
import { useProcessStore } from "../store/useProcessStore";

const initNodes = [
  {
    id: "a",
    data: { label: "Node A" },
    position: { x: 250, y: 0 },
  },
  {
    id: "b",
    data: { label: "Node B" },
    position: { x: 100, y: 100 },
  },
];

const initEdges = [
  {
    id: "a-b",
    source: "a",
    target: "b",
  },
];

export default function ProcessDiagram() {

  const [title, setTitle] = useState('PET');
  
  const [nodes, setnodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  function initiateEdges() {
    let edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: nodes[i].id + "-" + nodes[i + 1].id,
        source: nodes[i].id,
        target: nodes[i + 1].id,
      });
    }
    setEdges(edges);
  }

  function getProcess(type) {
    getAllProcesses(type)
      .then((res) => {
        console.log(res.data);
        let data = res.data.map((process) => {
          return {
              id:  process.position.toString(),
              data: { label: process.name },
              position: { x: process.position * 175, y: 0 },
          };
      })
      setnodes(data);
      if(title === "PET") {
        setTitle('GLASS')
      }else{
        setTitle('PET')
      }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useLayoutEffect(() => {
    getProcess('PET');
  }, []);

  useEffect(() => {
    initiateEdges();
  }, [nodes]);


  return (
    <DashboardScreen>
      <div className="w-full h-full">
      <div className="w-full flex justify-between items-center my-4 px-4">
        <h1 className="font-normal text-3xl"></h1>
        <div className="px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700 " onClick={()=>getProcess(title)} >
          Change to {title}
        </div>
      </div>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <MiniMap position="top-right" />
          <Controls position="top-left" />
        </ReactFlow>
      </div>
    </DashboardScreen>
  );
}
