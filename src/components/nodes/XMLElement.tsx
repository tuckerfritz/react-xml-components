import { useContext, useMemo } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";
import { validateElementName } from "@src/utils/sanitizeElementName";

type XMLElementProps = {
  name: string;
  index?: number;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

const XMLElement = ({ name, children, index = 0 }: XMLElementProps) => {
  const {
    currentNodePath: parentNodePath,
    level: parentLevel,
    xmlDoc,
    nsResolver,
  } = useContext(NodeContext);

  const currentNodePath =
    parentLevel === 0 ? `/${name}` : `${parentNodePath}/${name}[${index + 1}]`;

  const currentNode = useMemo(() => {
    validateElementName(name);
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      nsResolver,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
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

XMLElement.displayName = "XMLElement";

export default XMLElement;
