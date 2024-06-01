import { useCallback, useRef } from "react";
import XmlEditor, { XmlEditorRef } from "./components/XmlEditor";
import XmlElement from "./components/XmlElement";
import XmlInputField from "./components/XmlInput";
import XmlAttribute from "./components/XmlAttribute";
import XmlSelect from "./components/XmlSelect";

const initialXml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book>
    <title lang="fn">Learning XML</title>
    <price>39.95</price>
  </book>
  <book>
    <title lang="en">Learning XML</title>
    <price>39.95</price>
  </book>
</bookstore>`;

function App() {
  const editorRef = useRef<XmlEditorRef>(null);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  }, []);

  const handleSubmit = () => {
    if (editorRef.current) {
      let updatedXml = editorRef.current.getXmlString();
      console.log(updatedXml);
    }
  };

  return (
    <main className="m-4">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <XmlEditor ref={editorRef} xml={initialXml}>
          <XmlElement name="bookstore">
            <XmlElement name="book" index={0}>
              <XmlElement name="title">
                <XmlAttribute name="lang">
                  <label>Lang Attribute</label>
                  <XmlSelect>
                    <option value="en">English</option>
                    <option value="fn">French</option>
                  </XmlSelect>
                </XmlAttribute>
                <label>Title Element</label>
                <XmlInputField onChange={onChange} />
              </XmlElement>
              <XmlElement name="price">
                {(context) => (
                  <>
                    <label>Price Element</label>
                    <div>{context.node.textContent}</div>
                  </>
                )}
              </XmlElement>
            </XmlElement>
            <XmlElement name="book" index={1}>
              <XmlElement name="title">
                <XmlAttribute name="lang">
                  {(context) => (
                    <>
                      <label>Language Attribute</label>
                      <div>{context.node.textContent}</div>
                    </>
                  )}
                </XmlAttribute>
                <label>Title Element</label>
                <XmlInputField onChange={onChange} />
              </XmlElement>
              <XmlElement name="price">
                <label>Price Element</label>
                <XmlInputField />
              </XmlElement>
            </XmlElement>
          </XmlElement>
        </XmlEditor>
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </main>
  );
}

export default App;
