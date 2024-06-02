import { useContext, useMemo } from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import LevelContext from "../contexts/Level.context";
import NodeContext from "../contexts/Node.context";

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
  const xmlDoc = useContext(XmlEditorContext);
  const level = useContext(LevelContext);
  const { ancestorNodePath } = useContext(NodeContext);

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
      console.log(currentNodePath, element)
      throw Error("Text Node Not Found");
    }
    return element.singleNodeValue;
  }, [xmlDoc]);

  const nodeContextValue = useMemo(
    () => ({
      ancestorNodePath: currentNodePath,
      parentNode: textNode,
    }),
    [textNode]
  );

  return (
    <LevelContext.Provider value={level + 1}>
      <NodeContext.Provider value={nodeContextValue}>
        {typeof children === "function"
          ? children({ xmlDoc, node: textNode, level })
          : children}
      </NodeContext.Provider>
    </LevelContext.Provider>
  );
};

export default XmlText;
