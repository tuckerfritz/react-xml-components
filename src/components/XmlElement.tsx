import { PropsWithChildren, useContext, useMemo } from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import LevelContext from "../contexts/Level.context";
import NodeContext from "../contexts/Node.context";

type XmlElementProps = {
  name: string;
  index?: number
};

const XmlElement = ({ name, children, index = 0 }: PropsWithChildren<XmlElementProps>) => {
  const xmlDoc = useContext(XmlEditorContext);
  const level = useContext(LevelContext);
  const { ancestorNodePath } = useContext(NodeContext);

  const currentNodePath = level === -1 ? `/${name}` : `${ancestorNodePath}/${name}[${index+1}]`;

  const elementNode = useMemo(() => {
    const element = xmlDoc.evaluate(
      currentNodePath,
      xmlDoc.getRootNode(),
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    );
    console.log(currentNodePath, element)
    if (element.singleNodeValue === null) {
      throw Error(`Element ${name} Not Found`);
    }
    return element.singleNodeValue;
  }, [xmlDoc]);

  const nodeContextValue = useMemo(
    () => ({
      ancestorNodePath: currentNodePath,
      parentNode: elementNode,
    }),
    [elementNode]
  );

  return (
    <LevelContext.Provider value={level + 1}>
      <NodeContext.Provider value={nodeContextValue}>
        {children}
      </NodeContext.Provider>
    </LevelContext.Provider>
  );
};

export default XmlElement;
