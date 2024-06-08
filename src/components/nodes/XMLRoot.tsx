import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";

type XMLRootProps = {
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLRoot = ({ children }: XMLRootProps) => {
  const { level: parentLevel, xmlDoc } = useContext(NodeContext);

  const currentNode = useMemo(() => {
    return xmlDoc.getRootNode();
  }, [xmlDoc]);

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNodePath: "/",
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

XMLRoot.displayName = "XMLRoot";

export default XMLRoot;
