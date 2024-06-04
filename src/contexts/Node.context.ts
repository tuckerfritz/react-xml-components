import { createContext } from "react";

export type NodeContextType = {
  xmlDoc: XMLDocument;
  currentNodePath: string;
  currentNode: Node;
  level: number;
  nsResolver?: XPathNSResolver;
};

export const NodeContext = createContext<NodeContextType>(null!);
