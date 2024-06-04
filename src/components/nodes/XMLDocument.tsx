import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { NodeContext, NodeContextType } from "../../contexts/Node.context";

type XMLDocumentProps = {
  initialDoc: string | XMLDocument;
  nsResolver?: XPathNSResolver;
  type?: DOMParserSupportedType;
};

export type XMLDocumentRefType = {
  getXmlDocument: () => XMLDocument;
  getXmlString: () => string;
  setXmlDocument: (xml: XMLDocument | string) => void;
};

const XMLDocument = forwardRef<
  XMLDocumentRefType,
  PropsWithChildren<XMLDocumentProps>
>(({ initialDoc, nsResolver, children, type = "application/xml" }, ref) => {
  const xmlDocParsed: XMLDocument = useMemo(
    () =>
      typeof initialDoc === "string"
        ? new DOMParser().parseFromString(initialDoc, type)
        : initialDoc,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const xmlDocRef = useRef<XMLDocument>(xmlDocParsed);

  xmlDocRef.current = xmlDocParsed;

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
      currentNodePath: "",
      currentNode: xmlDocRef.current,
      level: 0,
      nsResolver,
    }),
    [nsResolver],
  );

  return (
    <NodeContext.Provider value={nodeContextValue}>
      {children}
    </NodeContext.Provider>
  );
});

XMLDocument.displayName = "XMLDocument";

export default XMLDocument;
