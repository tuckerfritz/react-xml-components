import { useContext, useMemo } from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type Context = {
  xmlDoc: XMLDocument;
  node: Node;
  level: number;
};

type XmlTextProps = {
  index?: number;
  children?: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const XmlText = ({ children, index = 0 }: XmlTextProps) => {
  const { xmlDoc, currentNodePath: ancestorNodePath, node: parentNode, level } = useContext(NodeContext);

  const nthNode = index + 1;
  const currentNodePath =
    level === -1
      ? `/text()[${nthNode}]`
      : `${ancestorNodePath}/text()[${nthNode}]`;

  const textNode = useMemo(() => {
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
      node: textNode,
      ancestorNodePath,
      parentNode,
      level: level + 1,
    }),
    [xmlDoc, currentNodePath, parentNode, textNode, level]
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function"
        ? children({ xmlDoc, node: textNode, level })
        : children}
    </NodeContext.Provider>
  );
};

export default XmlText;
