import { useContext, useMemo } from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type XmlAttributeProps = {
  name: string;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XmlAttribute = ({ name, children }: XmlAttributeProps) => {
  const {
    xmlDoc,
    currentNodePath: ancestorNodePath,
    node: parentNode,
    level,
  } = useContext(NodeContext);

  const currentNodePath = `${ancestorNodePath}/@${name}`;

  const attributeNode = useMemo(() => {
    const attribute = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    );
    if (attribute.singleNodeValue === null) {
      throw Error(`Attribute ${name} Not Found`);
    }
    return attribute.singleNodeValue;
  }, [xmlDoc, level]);

  const nodeContextValue: NodeContextType = useMemo(
    () => ({
      xmlDoc,
      currentNodePath,
      node: attributeNode,
      ancestorNodePath,
      parentNode,
      level: level + 1,
    }),
    [xmlDoc, currentNodePath, parentNode, attributeNode, level]
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

export default XmlAttribute;
