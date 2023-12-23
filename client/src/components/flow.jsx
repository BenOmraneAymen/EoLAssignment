import { useState } from 'react';
import ReactFlow from 'reactflow';




function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  

  return <ReactFlow nodes={nodes} edges={edges} fitView />;
}

export default Flow;