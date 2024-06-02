import React from "react";
import { useCallback, useRef } from "react";
import Xml, { XmlEditorRef } from "../components";

const initialXml = `<?xml version="1.0" encoding="UTF-8"?>
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

const initialDoc = new DOMParser().parseFromString(
  initialXml,
  "application/xml",
);
const nsResolver = new XPathEvaluator().createNSResolver(
  initialDoc.documentElement,
);

export function App() {
  const editorRef = useRef<XmlEditorRef>(null);

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
        <Xml.Root
          ref={editorRef}
          initialXml={initialDoc}
          nsResolver={nsResolver}
        >
          <Xml.Element name="bookstore">
            <Xml.Element name="book" index={0}>
              <Xml.Element name="title">
                <Xml.Attribute name="lang">
                  <label>Lang Attribute</label>
                  <Xml.Select>
                    <option value="en">English</option>
                    <option value="fn">French</option>
                  </Xml.Select>
                </Xml.Attribute>
                <label>Title Element</label>
                <Xml.Input onChange={onChange} />
              </Xml.Element>
              <Xml.Element name="h:price">
                {(context) => (
                  <>
                    <label>Price Element</label>
                    <div>{context.currentNode?.textContent}</div>
                  </>
                )}
              </Xml.Element>
            </Xml.Element>
            <Xml.Element name="book" index={1}>
              <Xml.Element name="title">
                <Xml.Attribute name="lang">
                  {(context) => (
                    <>
                      <label>Language Attribute</label>
                      <div>{context.currentNode?.textContent}</div>
                    </>
                  )}
                </Xml.Attribute>
                <Xml.Text index={0}>
                  <Xml.Input onChange={onChange} />
                </Xml.Text>
                <Xml.Element name="emphasis">
                  <Xml.Textarea onChange={onChange} />
                </Xml.Element>
                <Xml.Text index={1}>
                  <Xml.Input onChange={onChange} />
                </Xml.Text>
              </Xml.Element>
              <Xml.Element name="h:price">
                <label>Price Element</label>
                <Xml.Input onChange={onChange} />
              </Xml.Element>
            </Xml.Element>
          </Xml.Element>
        </Xml.Root>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </main>
  );
}
