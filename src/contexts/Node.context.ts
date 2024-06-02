import { createContext } from "react";

export type NodeContextType = {
  xmlDoc: XMLDocument;
  currentNodePath: string;
  node: Node | null;
  ancestorNodePath: string | null;
  parentNode: Node | null;
  level: number;
};

const NodeContext = createContext<NodeContextType>(null!);

export default NodeContext;
