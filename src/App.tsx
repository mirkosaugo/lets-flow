import { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  useReactFlow,
  Panel,
  ReactFlowProvider,
} from "reactflow";

import type { Node, BackgroundVariant } from "reactflow";

import FitButton from "./FitButton";
import Card from "./Card";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "mycard",
    position: { x: 0, y: 0 },
    data: { label: "1", description: "hola" },
  },
  { id: "2", type: "mycard", position: { x: 0, y: 100 }, data: { label: "2" } },
];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Canvas: React.FC = () => {
  const { zoomIn, zoomOut } = useReactFlow();

  const [enableFigmaLikeNavigation, setEnableFigmaLikeNavigation] =
    useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const nodeTypes = useMemo(() => ({ mycard: Card }), []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        // edges={edges}
        onNodesChange={(e) => {
          // console.log(e);
          onNodesChange(e);
        }}
        onNodeDragStop={(_, node) => {
          console.log("SAVE_POSITION:", {
            type: node.type,
            id: node.id,
            position: node.position,
          });
        }}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        {...(enableFigmaLikeNavigation
          ? {
              panOnScroll: true,
              selectionOnDrag: true,
              panOnDrag: [1, 2],
              selectionMode: SelectionMode.Partial,
            }
          : {})}
        snapToGrid
        snapGrid={[16, 16]}
      >
        <Panel position="bottom-left">
          {
            // The <Panel /> component helps you position content above the viewport.
          }
          <button onClick={() => zoomIn({ duration: 250 })}>zoom in</button>
          <button onClick={() => zoomOut({ duration: 250 })}>zoom out</button>
          <FitButton />
        </Panel>

        {mapVisible && <MiniMap nodeColor={(n) => "#ffcc00"} />}

        <Background variant={"dots" as BackgroundVariant} gap={32} size={1} />

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
};

export default () => (
  <ReactFlowProvider>
    <Canvas />
  </ReactFlowProvider>
);
