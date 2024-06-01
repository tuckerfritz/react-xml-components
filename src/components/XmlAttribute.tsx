import { PropsWithChildren, useContext, useMemo } from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import LevelContext from "../contexts/Level.context";
import NodeContext from "../contexts/Node.context";

type XmlAttributeProps = {
  name: string;
};

const XmlAttribute = ({ name, children }: PropsWithChildren<XmlAttributeProps>) => {
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
        {children}
      </NodeContext.Provider>
    </LevelContext.Provider>
  );
};

export default XmlAttribute;
