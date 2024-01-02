import React from "react";
import { useReactFlow, NodeResizer, useStoreApi } from "reactflow";
import type { NodeProps } from "reactflow";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyCard: React.FC<{
  id: NodeProps["id"];
  data: NodeProps["data"];
  selected: NodeProps["selected"];
}> = ({ data, selected, id }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  console.log("offsetHeight", ref.current?.offsetHeight);

  return (
    <Card
      className="overflow-hidden border-gray-500 "
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={480}
        minHeight={200}
        onResize={(e, item) => {
          console.log("RESIZE:", item.width);
          ref.current?.style.setProperty("width", `${item.width}px`);
          ref.current?.style.setProperty("height", `${item.height}px`);
        }}
        onResizeEnd={(width, height) => {
          console.log("SAVE_SIZE:", { width, height });
        }}
      />
      <div
        ref={ref}
        style={{
          width: 550,
          height: 300,
        }}
      >
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{data.description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyCard;
