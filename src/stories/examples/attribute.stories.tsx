import React, { useRef, useState } from "react";
import { XML, XMLDocumentRefType, Select } from "@src/components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function Attribute() {
  const editorRef = useRef<XMLDocumentRefType>(null);
  const [xml, setXml] = useState(`<book lang="en">Learning XML</book>`);

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
          <XML.Element name="book">
            <XML.Attribute name="lang">
              <Select>
                <option>en</option>
                <option>fr</option>
              </Select>
            </XML.Attribute>
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
