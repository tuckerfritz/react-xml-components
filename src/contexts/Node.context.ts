import { createContext } from "react";

export type NodeContextType = {
  xmlDoc: XMLDocument;
  currentNodePath: string;
  currentNode: Node | null;
  parentNodePath: string | null;
  parentNode: Node | null;
  level: number;
  nsResolver?: XPathNSResolver;
};

export const NodeContext = createContext<NodeContextType>(null!);
