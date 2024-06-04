import React, { useRef, useState } from "react";
import { XML, XMLDocumentRefType, Select } from "@src/components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function SelectExample() {
  const editorRef = useRef<XMLDocumentRefType>(null);
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
        <XML ref={editorRef} initialDoc={xml}>
          <XML.Root>
            <XML.Element name="example">
              <Select>
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
                <option value="option 3">option 3</option>
              </Select>
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
