import React from "react";
import { useReactFlow, NodeResizer } from "reactflow";
import type { NodeProps } from "reactflow";

const Card: React.FC<{
  id: NodeProps["id"];
  data: NodeProps["data"];
  selected: NodeProps["selected"];
}> = ({ data, selected, id }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const flow = useReactFlow();

  return (
    <div
      style={{
        border: "1px solid #222",
        borderRadius: 5,
        background: "#fff",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        height: "100%",
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={ref.current?.offsetWidth || 0}
        minHeight={ref.current?.offsetHeight || 0}
        onResizeEnd={(width, height) => {
          console.log("SAVE_SIZE:", { width, height });
        }}
      />
      <div
        ref={ref}
        style={{
          padding: 10,
          width: "max-content",
        }}
      >
        <h2>{data.label}</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
