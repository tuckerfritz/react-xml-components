import React, { useRef, useState } from "react";
import { XmlEditorRefType, Xml } from "../../components";
import XMLViewer from "react-xml-viewer";
import "../stories.css";

export function Textarea() {
  const editorRef = useRef<XmlEditorRefType>(null);
  const [xml, setXml] = useState(
    `<example>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</example>`,
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
        <Xml.Root ref={editorRef} initialXml={xml}>
          <Xml.Element name="example">
            <Xml.Textarea />
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
