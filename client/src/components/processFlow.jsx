import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import ReactFlow, { useReactFlow, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { getAllProcesses } from "../service/processService";

export default function ProcessFlow() {
  var defaultNodes = [];
  var defaultEdges = [];
  const edgeOptions = {
    animated: true,
    style: {
      stroke: "white",
    },
  };

  function Flow() {
    const reactFlowInstance = useReactFlow();
    const [elements, setElements] = useState([]);
    const [edges, setEdges] = useState([]);

    async function getprocess() {
      await getAllProcesses("PET")
        .then((response) => {
          setElements(
            response.data.map((process) => {
              return {
                id: process.position,
                data: { label: process.name },
                position: { x: process.position * 100, y: 0 },
                type: "input",
              };
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    useEffect(() => {
      getprocess();
    }, []);

    useEffect(() => {
      if (elements) {
        elements.forEach((element) => {
          if (element.id !== 1) {
            setEdges((edges) => [
              ...edges,
              {
                id: element.id + "e",
                source: element.id - 1,
                target: element.id,
                animated: true,
                arrowHeadType: "arrowclosed",
              },
            ]);
          }
        });
      }
    }, [elements]);

    return (
      <>
        <ReactFlow
          defaultNodes={elements}
          defaultEdges={defaultEdges}
          defaultEdgeOptions={edgeOptions}
          fitView
          style={{
            backgroundColor: "#D3D2E5",
          }}
        />
      </>
    );
  }

  return (
    <div className="h-screen">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
