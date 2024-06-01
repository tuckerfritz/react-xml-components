import { PropsWithChildren, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import LevelContext from "../contexts/Level.context";
import NodeContext from "../contexts/Node.context";

type XmlEditorProps = {
  xml: string | XMLDocument;
};

export type XmlEditorRef = {
  getXmlDocument: () => XMLDocument;
  getXmlString: () => string;
  setXmlDocument: (xml: XMLDocument | string) => void;
};

const XmlEditor = forwardRef<XmlEditorRef, PropsWithChildren<XmlEditorProps>>(({ xml, children }, ref) => {
  const initialXml = useMemo(
    () =>
      typeof xml === "string"
        ? new DOMParser().parseFromString(xml, "application/xml")
        : xml,
    []
  );
  const xmlDocRef = useRef<XMLDocument>(initialXml);

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

  const nodeContextValue = useMemo(() => ({
    ancestorNodePath: "/",
    parentNode: null
  }), []);

  return (
    <XmlEditorContext.Provider
      value={xmlDocRef.current}
    >
      <LevelContext.Provider value={-1}>
        <NodeContext.Provider value={nodeContextValue}>
        {children}
        </NodeContext.Provider>
      </LevelContext.Provider>
    </XmlEditorContext.Provider>
  );
});

export default XmlEditor;
