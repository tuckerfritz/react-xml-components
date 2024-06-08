import { useMemo } from "react";

export enum NodeTypeEnum {
  ELEMENT = "element",
  ATTRIBUTE = "attribute",
  TEXT = "text",
}

function constructQueryString(
  nodeType: NodeTypeEnum,
  name: string,
  index: number,
): string {
  switch (nodeType) {
    case NodeTypeEnum.ELEMENT:
      return `./*[name()="${name}"][${index + 1}]`;
    case NodeTypeEnum.ATTRIBUTE:
      return `./@${name}`;
    case NodeTypeEnum.TEXT:
      return `./text()[${index + 1}]`;
  }
}

export const useCurrentNode = (
  xmlDoc: XMLDocument,
  nodeType: NodeTypeEnum,
  parentNode: Node,
  name: string = "",
  index: number = 0,
): Node => {
  nodeType;
  const currentNode = useMemo(() => {
    const queryString = constructQueryString(nodeType, name, index);
    const result = xmlDoc.evaluate(
      queryString,
      parentNode,
      undefined,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
    ).singleNodeValue;
    if (result === null) {
      throw Error(`${nodeType.toUpperCase()} ${name} not found`);
    }
    return result;
  }, [xmlDoc, nodeType, name, index, parentNode]);

  return currentNode;
};
