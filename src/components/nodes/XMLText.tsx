import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";
import { NodeTypeEnum, useCurrentNode } from "@src/utils/useCurrentNode";

type XMLTextProps = {
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLText = ({ children, index = 0 }: XMLTextProps) => {
  const {
    xmlDoc,
    currentNode: parentNode,
    level: parentLevel,
  } = useContext(NodeContext);

  const currentNode = useCurrentNode(
    xmlDoc,
    NodeTypeEnum.TEXT,
    parentNode,
    undefined,
    index,
  );

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNode,
      level: parentLevel + 1,
    }),
    [xmlDoc, currentNode, parentLevel],
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

XMLText.displayName = "XMLText";
export default XMLText;
