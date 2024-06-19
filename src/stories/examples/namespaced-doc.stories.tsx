import React, { useRef, useState } from "react";
import { XML, XMLDocumentRefType, Input } from "@src/components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

const initialDoc = `<xhtml:table xmlns:xhtml="http://www.w3.org/TR/html4/">
  <xhtml:tr>
    <xhtml:td>Apples</xhtml:td>
    <xhtml:td>Bananas</xhtml:td>
  </xhtml:tr>
</xhtml:table>`;
export function NamespacedDocument() {
  const editorRef = useRef<XMLDocumentRefType>(null);
  const [xml, setXml] = useState(initialDoc);

  const handleSubmit = () => {
    if (editorRef.current) {
      const updatedXml = editorRef.current.getXmlString();
      setXml(updatedXml);
    }
  };

  return (
    <div className="example">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <XML ref={editorRef} initialDoc={xml}>
          <XML.Element name="xhtml:table">
            <XML.Element name="xhtml:tr">
              <XML.Element name="xhtml:td.0">
                <Input />
              </XML.Element>
              <XML.Element name="xhtml:td.1">
                <Input />
              </XML.Element>
            </XML.Element>
          </XML.Element>
        </XML>
        <button type="submit">submit</button>
      </form>
      <XMLViewer xml={xml} />
    </div>
  );
}

export default {
  title: "Examples",
};
