import { useContext, useMemo } from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type Context = {
  xmlDoc: XMLDocument;
  node: Node;
  level: number;
};

type XmlElementProps = {
  name: string;
  index?: number;
  children?: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const XmlElement = ({ name, children, index = 0 }: XmlElementProps) => {
  const {
    currentNodePath: ancestorNodePath,
    level,
    xmlDoc,
    node: parentNode,
  } = useContext(NodeContext);

  const currentNodePath =
    level === -1 ? `/${name}` : `${ancestorNodePath}/${name}[${index + 1}]`;

  const elementNode = useMemo(() => {
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    );
    if (element.singleNodeValue === null) {
      throw Error(`Element ${name} Not Found`);
    }
    return element.singleNodeValue;
  }, [xmlDoc]);

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNodePath,
      node: elementNode,
      ancestorNodePath,
      parentNode,
      level: level + 1,
    }),
    [xmlDoc, currentNodePath, ancestorNodePath, parentNode, elementNode, level]
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function"
        ? children({ xmlDoc, node: elementNode, level })
        : children}
    </NodeContext.Provider>
  );
};

export default XmlElement;
