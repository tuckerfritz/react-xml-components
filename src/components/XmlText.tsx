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
    level,
  } = useContext(NodeContext);

  const nthNode = index + 1;
  const currentNodePath =
    level === -1
      ? `/text()[${nthNode}]`
      : `${parentNodePath}/text()[${nthNode}]`;

  const currentNode = useMemo(() => {
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    );
    if (element.singleNodeValue === null) {
      console.log(currentNodePath, element);
      throw Error("Text Node Not Found");
    }
    return element.singleNodeValue;
  }, [xmlDoc]);

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNodePath,
      currentNode,
      parentNodePath,
      parentNode,
      level: level + 1,
    }),
    [xmlDoc, currentNodePath, currentNode, parentNode, parentNodePath, level]
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

export default XmlText;
