import { useCallback, useEffect, useState } from "react";
import ReactFlow, { useNodesState } from "reactflow";
import DashboardScreen from "../screens/dashboard";
import { getAllProcesses } from "../service/processService";
import ProcessFlow from "./processFlow";

export default function ProcessDiagram() {
  return (
    <DashboardScreen>
      <ProcessFlow />
    </DashboardScreen>
  );
}
