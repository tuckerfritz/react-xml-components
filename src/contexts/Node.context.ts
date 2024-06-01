import { createContext } from "react";

type NodeContext = {
  ancestorNodePath: string;
  parentNode: Node | null;
};

const NodeContext = createContext<NodeContext>(null!);

export default NodeContext;
