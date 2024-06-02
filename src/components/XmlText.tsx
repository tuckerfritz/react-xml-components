import { useContext, useMemo } from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type XmlTextProps = {
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XmlText = ({ children, index = 0 }: XmlTextProps) => {
  const {
    xmlDoc,
    currentNodePath: parentNodePath,
    currentNode: parentNode,
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
      XPathResult.FIRST_ORDERED_NODE_TYPE
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
      parentNodePath,
      parentNode,
      level: parentLevel + 1,
      nsResolver,
    }),
    [
      xmlDoc,
      currentNodePath,
      currentNode,
      parentNode,
      parentNodePath,
      parentLevel,
      nsResolver,
    ]
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

export default XmlText;
