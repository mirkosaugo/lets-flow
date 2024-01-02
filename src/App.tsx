import { useCallback, useState, useMemo } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import ReactFlow, {
  MiniMap,
  Background,
  useNodesState,
  SelectionMode,
  useReactFlow,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import { Button } from "@/components/ui/button";

import type { BackgroundVariant } from "reactflow";

import FitButton from "./components/FitButton";
import Card from "./components/Card";
import "reactflow/dist/style.css";

import { initialNodes } from "./data/nodes";

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
        <Panel position="bottom-right" className="flex gap-2">
          {
            // The <Panel /> component helps you position content above the viewport.
          }
          <Button
            variant="secondary"
            size="icon"
            onClick={() => zoomIn({ duration: 250 })}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => zoomOut({ duration: 250 })}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <FitButton />
          <Button variant="secondary" onClick={() => setMapVisible((v) => !v)}>
            {mapVisible ? "Hide" : "Show"} map
          </Button>
        </Panel>

        {mapVisible && (
          <MiniMap
            style={{
              bottom: 46,
            }}
            nodeColor={(n) => "#ffcc00"}
          />
        )}

        <Background variant={"dots" as BackgroundVariant} gap={32} size={1} />

        <Panel position="top-right">
          <Button onClick={() => setEnableFigmaLikeNavigation((v) => !v)}>
            {enableFigmaLikeNavigation ? "Disable" : "Enable"} Figma-like
            navigation
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Canvas />
  </ReactFlowProvider>
);
