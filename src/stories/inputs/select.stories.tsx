import React, { useRef, useState } from "react";
import { XmlEditorRefType, Xml } from "../../components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function Select() {
  const editorRef = useRef<XmlEditorRefType>(null);
  const [xml, setXml] = useState(`<example>option 1</example>`);

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
            <Xml.Select>
              <option value="option 1">option 1</option>
              <option value="option 2">option 2</option>
              <option value="option 3">option 3</option>
            </Xml.Select>
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
