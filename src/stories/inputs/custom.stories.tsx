import React, { useContext, useRef, useState } from "react";
import { XML, XMLDocumentRefType } from "../../components";
import XMLViewer from "react-xml-viewer";
import { NumericFormat } from "react-number-format";
import { NodeContext } from "../../contexts/Node.context";
import "../stories.css";

const CurrencyInput = () => {
  const { currentNode } = useContext(NodeContext);

  const onValueChange = (values: { floatValue?: number }) => {
    if (currentNode) {
      const { floatValue } = values;
      currentNode.textContent = floatValue ? floatValue.toString() : "";
    }
  };
  return (
    <NumericFormat
      onValueChange={onValueChange}
      value={currentNode?.textContent ?? 0}
      prefix="$"
      decimalScale={2}
      thousandSeparator
    />
  );
};

export function CustomInput() {
  const editorRef = useRef<XMLDocumentRefType>(null);
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
        <XML ref={editorRef} initialDoc={xml}>
          <XML.Element name="price">
            <CurrencyInput />
          </XML.Element>
        </XML>
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
