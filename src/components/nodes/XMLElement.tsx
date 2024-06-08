import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";
import { NodeTypeEnum, useCurrentNode } from "@src/utils/useCurrentNode";

type XMLElementProps = {
  name: string;
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLElement = ({ name, children, index = 0 }: XMLElementProps) => {
  const {
    xmlDoc,
    currentNode: parentNode,
    level: parentLevel,
  } = useContext(NodeContext);

  const currentNode = useCurrentNode(
    xmlDoc,
    NodeTypeEnum.ELEMENT,
    parentNode,
    name,
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

XMLElement.displayName = "XMLElement";

export default XMLElement;
