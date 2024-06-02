import { useContext, useMemo } from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import LevelContext from "../contexts/Level.context";
import NodeContext from "../contexts/Node.context";

type Context = {
  xmlDoc: XMLDocument
  node: Node
  level: number,
}

type XmlAttributeProps = {
  name: string;
  children?: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const XmlAttribute = ({ name, children }: XmlAttributeProps) => {
  const xmlDoc = useContext(XmlEditorContext);
  const level = useContext(LevelContext);
  const { ancestorNodePath } = useContext(NodeContext);

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

  const nodeContextValue = useMemo(
    () => ({
      ancestorNodePath: currentNodePath,
      parentNode: attributeNode,
    }),
    [attributeNode]
  );

  return (
    <LevelContext.Provider value={level}>
      <NodeContext.Provider value={nodeContextValue}>
      {
          typeof children === "function"
          ? children({ xmlDoc, node: attributeNode, level })
          : children
        }
      </NodeContext.Provider>
    </LevelContext.Provider>
  );
};

export default XmlAttribute;
