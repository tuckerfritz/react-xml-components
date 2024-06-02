import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "../contexts/Node.context";

type XmlAttributeProps = {
  name: string;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XmlAttribute = ({ name, children }: XmlAttributeProps) => {
  const {
    xmlDoc,
    currentNodePath: parentNodePath,
    currentNode: parentNode,
    level: parentLevel,
    nsResolver,
  } = useContext(NodeContext);

  const currentNodePath = `${parentNodePath}/@${name}`;

  const currentNode = useMemo(() => {
    const attribute = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      nsResolver,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
    );
    if (attribute.singleNodeValue === null) {
      throw Error(`Attribute ${name} Not Found`);
    }
    return attribute.singleNodeValue;
  }, [xmlDoc, currentNodePath, name, nsResolver]);

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
    ],
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {typeof children === "function" ? children(nodeContextValue) : children}
    </NodeContext.Provider>
  );
};

export default XmlAttribute;
