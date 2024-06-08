import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";
import { NodeTypeEnum, useCurrentNode } from "@src/utils/useCurrentNode";

type XMLAttributeProps = {
  name: string;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLAttribute = ({ name, children }: XMLAttributeProps) => {
  const {
    xmlDoc,
    currentNode: parentNode,
    level: parentLevel,
  } = useContext(NodeContext);

  const currentNode = useCurrentNode(
    xmlDoc,
    NodeTypeEnum.ATTRIBUTE,
    parentNode,
    name,
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

XMLAttribute.displayName = "XMLAttribute";
export default XMLAttribute;
