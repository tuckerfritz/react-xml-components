import { createContext } from "react";

export type NodeContextType = {
  xmlDoc: XMLDocument;
  currentNode: Node;
  level: number;
};

export const NodeContext = createContext<NodeContextType>(null!);
