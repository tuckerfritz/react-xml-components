import { useContext, useMemo } from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type XmlElementProps = {
  name: string;
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XmlElement = ({ name, children, index = 0 }: XmlElementProps) => {
  const {
    currentNodePath: parentNodePath,
    level: parentLevel,
    xmlDoc,
    currentNode: parentNode,
    nsResolver,
  } = useContext(NodeContext);

  const currentNodePath =
    parentLevel === 0 ? `/${name}` : `${parentNodePath}/${name}[${index + 1}]`;

  const currentNode = useMemo(() => {
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      nsResolver,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    );
    if (element.singleNodeValue === null) {
      throw Error(`Element ${name} Not Found`);
    }
    return element.singleNodeValue;
  }, [xmlDoc, currentNodePath, nsResolver, name]);

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
      parentNodePath,
      parentNode,
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

export default XmlElement;
