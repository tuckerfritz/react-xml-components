import React, { useRef, useState } from "react";
import { XmlEditorRefType, Xml } from "../../components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function Input() {
  const editorRef = useRef<XmlEditorRefType>(null);
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
        <Xml.Root ref={editorRef} initialXml={xml}>
          <Xml.Element name="example">
            <Xml.Input />
          </Xml.Element>
        </Xml.Root>
        <button type="submit">submit</button>
      </form>
      <XMLViewer xml={xml} />
    </div>
  );
}

export default {
  title: "Inputs",
};
