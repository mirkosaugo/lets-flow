import { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
} from "reactflow";

import type { Connection, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [enableFigmaLikeNavigation, setEnableFigmaLikeNavigation] =
    useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const bgType = "dots" as BackgroundVariant;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(e) => {
          console.log(e);
          onNodesChange(e);
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        {...(enableFigmaLikeNavigation
          ? {
              panOnScroll: true,
              selectionOnDrag: true,
              panOnDrag: [1, 2],
              selectionMode: SelectionMode.Partial,
            }
          : {})}
      >
        <Controls />
        {mapVisible && <MiniMap nodeColor={(n) => "#ffcc00"} />}
        <Background variant={bgType} gap={32} size={1} />
        <div
          style={{
            top: 12,
            right: 12,
            position: "absolute",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button onClick={() => setEnableFigmaLikeNavigation((v) => !v)}>
            {enableFigmaLikeNavigation ? "Disable" : "Enable"} Figma-like
            navigation
          </button>
          <button onClick={() => setMapVisible((v) => !v)}>
            {mapVisible ? "Hide" : "Show"} map
          </button>
        </div>
      </ReactFlow>
    </div>
  );
}
