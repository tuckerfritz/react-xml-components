import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { NodeContext, NodeContextType } from "@src/contexts/Node.context";

type XMLDocumentProps = {
  initialDoc: string | XMLDocument;
  children?: ((context: NodeContextType) => React.ReactNode) | React.ReactNode;
};

export type XMLDocumentRefType = {
  getXmlDocument: () => XMLDocument;
  getXmlString: () => string;
  setXmlDocument: (xml: XMLDocument | string) => void;
};

const XMLDocument = forwardRef<XMLDocumentRefType, XMLDocumentProps>(
  ({ initialDoc, children }, ref) => {
    const xmlDocParsed: XMLDocument = useMemo(
      () =>
        typeof initialDoc === "string"
          ? new DOMParser().parseFromString(initialDoc, "application/xml")
          : initialDoc,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );
    const xmlDocRef = useRef<XMLDocument>(xmlDocParsed);

    useImperativeHandle(ref, () => {
      return {
        getXmlDocument: () => xmlDocRef.current,
        getXmlString: () => {
          const serializer = new XMLSerializer();
          return serializer.serializeToString(xmlDocRef.current);
        },
        setXmlDocument: (doc) => {
          if (typeof doc === "string") {
            const serializer = new DOMParser();
            xmlDocRef.current = serializer.parseFromString(
              doc,
              "application/xml",
            );
          } else {
            xmlDocRef.current = doc;
          }
        },
      };
    }, []);

    const nodeContextValue: NodeContextType = useMemo(
      () => ({
        xmlDoc: xmlDocRef.current,
        currentNode: xmlDocRef.current,
        level: 0,
      }),
      [],
    );

    return (
      <NodeContext.Provider value={nodeContextValue}>
        {typeof children === "function" ? children(nodeContextValue) : children}
      </NodeContext.Provider>
    );
  },
);

XMLDocument.displayName = "XMLDocument";

export default XMLDocument;
