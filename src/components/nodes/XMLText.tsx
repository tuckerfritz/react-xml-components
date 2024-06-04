import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";

type XMLTextProps = {
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLText = ({ children, index = 0 }: XMLTextProps) => {
  const {
    xmlDoc,
    currentNodePath: parentNodePath,
    level: parentLevel,
    nsResolver,
  } = useContext(NodeContext);

  const nthNode = index + 1;
  const currentNodePath =
    parentLevel === 0
      ? `/text()[${nthNode}]`
      : `${parentNodePath}/text()[${nthNode}]`;

  const currentNode = useMemo(() => {
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      nsResolver,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
    );
    if (element.singleNodeValue === null) {
      throw Error("Text Node Not Found");
    }
    return element.singleNodeValue;
  }, [xmlDoc, currentNodePath, nsResolver]);

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNodePath,
      currentNode,
      level: parentLevel + 1,
      nsResolver,
    }),
    [xmlDoc, currentNodePath, currentNode, parentLevel, nsResolver],
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

XMLText.displayName = "XMLText";
export default XMLText;
