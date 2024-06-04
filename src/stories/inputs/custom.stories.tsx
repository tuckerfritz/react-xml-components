import React, { useContext, useRef, useState } from "react";
import { XmlEditorRefType, Xml } from "../../components";
import XMLViewer from "react-xml-viewer";
import { NumericFormat } from "react-number-format";
import { NodeContext } from "../../contexts/Node.context";
import "../stories.css";

const CurrencyInput = () => {
  const { currentNode } = useContext(NodeContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentNode) {
      currentNode.textContent = e.currentTarget.value;
    }
  };
  return (
    <NumericFormat
      onChange={onChange}
      value={currentNode?.textContent ?? 0}
      prefix="$"
      decimalScale={2}
      thousandSeparator
    />
  );
};

export function CustomInput() {
  const editorRef = useRef<XmlEditorRefType>(null);
  const [xml, setXml] = useState(`<price>99.99</price>`);

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
          <Xml.Element name="price">
            <CurrencyInput />
          </Xml.Element>
        </Xml.Root>
        <button className="example__button" type="submit">
          submit
        </button>
      </form>
      <XMLViewer xml={xml} />
    </div>
  );
}

export default {
  title: "Inputs",
};
