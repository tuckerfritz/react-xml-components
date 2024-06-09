import { useMemo } from "react";

export enum NodeTypeEnum {
  ELEMENT = "element",
  ATTRIBUTE = "attribute",
  TEXT = "text",
}

function isInteger(value: string) {
  return /^\d+$/.test(value);
}

function getFirstPart(name: string) {
  return name.substring(0, name.lastIndexOf("."));
}

function getLastPart(name: string) {
  return name.substring(name.lastIndexOf(".") + 1, name.length);
}

function convertToXPath(firstPart: string) {
  return (
    "." +
    firstPart
      .split(".")
      .reduce(
        (path, element) =>
          path +
          (isInteger(element)
            ? `[${parseInt(element) + 1}]`
            : `/*[name()="${element}"]`),
        "",
      )
  );
}

function constructQueryString(
  nodeType: NodeTypeEnum.ATTRIBUTE | NodeTypeEnum.ELEMENT,
  name: string,
): string {
  let xpath: string;
  let index: string | undefined = undefined;
  let firstPart = getFirstPart(name);
  let lastPart = getLastPart(name);
  if (isInteger(lastPart)) {
    index = lastPart;
    lastPart = getLastPart(firstPart);
    firstPart = getFirstPart(firstPart);
    if (isInteger(lastPart)) {
      throw new Error(`Invalid name ${name} for ${nodeType.toUpperCase()}`);
    }
  }
  xpath = firstPart !== "" ? convertToXPath(firstPart) : ".";
  if (nodeType === NodeTypeEnum.ELEMENT) {
    xpath = `${xpath}/*[name()="${lastPart}"]`;
    if (index) {
      xpath = `${xpath}[${parseInt(index) + 1}]`;
    }
  } else {
    // attribute node
    xpath = `${xpath}/@${lastPart}`;
    if (index) {
      throw new Error(`Invalid name ${name} for ${nodeType.toUpperCase()}`);
    }
  }
  return xpath;
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
    let queryString: string;
    if (nodeType !== NodeTypeEnum.TEXT) {
      queryString = constructQueryString(nodeType, name);
    } else {
      queryString = `./text()[normalize-space()][${index + 1}]`;
    }
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
  }, [xmlDoc, nodeType, name, parentNode, index]);

  return currentNode;
};
