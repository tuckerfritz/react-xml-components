import React from "react";
import { useCallback, useRef } from "react";
import {
  XML,
  XMLDocumentRefType,
  Input,
  Select,
  TextArea,
} from "@src/components";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore xmlns:h="http://www.w3.org/TR/html4/">
  <book>
    <title lang="fn">Learning XML</title>
    <h:price>39.95</h:price>
  </book>
  <book>
    <title lang="en">Learning <emphasis>MORE</emphasis>HTML</title>
    <h:price>39.95</h:price>
  </book>
</bookstore>`;

const xmlDoc = new DOMParser().parseFromString(xml, "application/xml");
const nsResolver = new XPathEvaluator().createNSResolver(
  xmlDoc.documentElement,
);

export function Example() {
  const editorRef = useRef<XMLDocumentRefType>(null);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event);
    },
    [],
  );

  const handleSubmit = () => {
    if (editorRef.current) {
      const updatedXml = editorRef.current.getXmlString();
      console.log(updatedXml);
    }
  };

  return (
    <main className="m-4">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <XML ref={editorRef} initialDoc={xmlDoc} nsResolver={nsResolver}>
          <XML.Root>
            <XML.Element name="bookstore">
              <XML.Element name="book" index={0}>
                <XML.Element name="title">
                  <XML.Attribute name="lang">
                    <label>Lang Attribute</label>
                    <Select>
                      <option value="en">English</option>
                      <option value="fn">French</option>
                    </Select>
                  </XML.Attribute>
                  <label>Title Element</label>
                  <Input onChange={onChange} />
                </XML.Element>
                <XML.Element name="h:price">
                  {(context) => (
                    <>
                      <label>Price Element</label>
                      <div>{context.currentNode?.textContent}</div>
                    </>
                  )}
                </XML.Element>
              </XML.Element>
              <XML.Element name="book" index={1}>
                <XML.Element name="title">
                  <XML.Attribute name="lang">
                    {(context) => (
                      <>
                        <label>Language Attribute</label>
                        <div>{context.currentNode?.textContent}</div>
                      </>
                    )}
                  </XML.Attribute>
                  <XML.Text index={0}>
                    <Input onChange={onChange} />
                  </XML.Text>
                  <XML.Element name="emphasis">
                    <TextArea onChange={onChange} />
                  </XML.Element>
                  <XML.Text index={1}>
                    <Input onChange={onChange} />
                  </XML.Text>
                </XML.Element>
                <XML.Element name="h:price">
                  <label>Price Element</label>
                  <Input onChange={onChange} />
                </XML.Element>
              </XML.Element>
            </XML.Element>
          </XML.Root>
        </XML>

        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </main>
  );
}
