import React from "react";
import { ScanEye } from "lucide-react";
import { useReactFlow } from "reactflow";
import { Button } from "@/components/ui/button";

const FitButton: React.FC = () => {
  const reactFlow = useReactFlow();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => {
        reactFlow.fitView({
          // this is not necessary, but it's only an example on how to use the fit
          nodes: reactFlow.getNodes().map((node) => ({ id: node.id })),
          duration: 800,
        });
      }}
    >
      <ScanEye className="w-4 h-4" />
    </Button>
  );
};

export default FitButton;
