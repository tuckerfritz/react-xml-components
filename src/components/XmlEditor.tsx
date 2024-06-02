import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import NodeContext, { NodeContextType } from "../contexts/Node.context";

type XmlEditorProps = {
  initialXml: string | XMLDocument;
};

export type XmlEditorRef = {
  getXmlDocument: () => XMLDocument;
  getXmlString: () => string;
  setXmlDocument: (xml: XMLDocument | string) => void;
};

const XmlEditor = forwardRef<XmlEditorRef, PropsWithChildren<XmlEditorProps>>(
  ({ initialXml, children }, ref) => {
    const initialXmlDoc = useMemo(
      () =>
        typeof initialXml === "string"
          ? new DOMParser().parseFromString(initialXml, "application/xml")
          : initialXml,
      []
    );
    const xmlDocRef = useRef<XMLDocument>(initialXmlDoc);

    useImperativeHandle(
      ref,
      () => {
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
                "application/xml"
              );
            } else {
              xmlDocRef.current = doc;
            }
          },
        };
      },
      []
    );

    const nodeContextValue: NodeContextType = useMemo(
      () => ({
        xmlDoc: xmlDocRef.current,
        currentNodePath: "/",
        currentNode: xmlDocRef.current.getRootNode(),
        parentNodePath: null,
        parentNode: null,
        level: 0,
      }),
      [xmlDocRef.current]
    );

    return (
      <NodeContext.Provider value={nodeContextValue}>
        {children}
      </NodeContext.Provider>
    );
  }
);

XmlEditor.displayName = "XmlEditor";

export default XmlEditor;
