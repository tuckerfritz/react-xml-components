import React, { useRef, useState } from "react";
import { XML, XMLDocumentRefType, Input } from "@src/components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function NestedElement() {
  const editorRef = useRef<XMLDocumentRefType>(null);
  const [xml, setXml] = useState(
    `<nested><element>Please edit me!</element></nested>`,
  );

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
          <XML.Element name="nested.0.element.0">
            <Input />
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
