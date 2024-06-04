import React, { useRef, useState } from "react";
import { XML, XMLDocumentRefType, Input } from "@src/components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function InputExample() {
  const editorRef = useRef<XMLDocumentRefType>(null);
  const [xml, setXml] = useState(`<example>Please edit me!</example>`);

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
          <XML.Root>
            <XML.Element name="example">
              <Input />
            </XML.Element>
          </XML.Root>
        </XML>
        <button type="submit">submit</button>
      </form>
      <XMLViewer xml={xml} />
    </div>
  );
}

export default {
  title: "Inputs",
};
