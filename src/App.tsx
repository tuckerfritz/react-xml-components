import { useCallback, useRef } from "react";
import XmlEditor, { XmlEditorRef } from "./components/XmlEditor";
import XmlElement from "./components/XmlElement";
import XmlInput from "./components/XmlInput";
import XmlAttribute from "./components/XmlAttribute";
import XmlSelect from "./components/XmlSelect";
import XmlText from "./components/XmlText";
import XmlTextarea from "./components/XmlTextarea";

const initialXml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book>
    <title lang="fn">Learning XML</title>
    <price>39.95</price>
  </book>
  <book>
    <title lang="en">Learning <emphasis>MORE</emphasis>HTML</title>
    <price>39.95</price>
  </book>
</bookstore>`;

function App() {
  const editorRef = useRef<XmlEditorRef>(null);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
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
        <XmlEditor ref={editorRef} initialXml={initialXml}>
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
                <XmlInput onChange={onChange} />
              </XmlElement>
              <XmlElement name="price">
                {(context) => (
                  <>
                    <label>Price Element</label>
                    <div>{context.currentNode?.textContent}</div>
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
                      <div>{context.currentNode?.textContent}</div>
                    </>
                  )}
                </XmlAttribute>
                <XmlText index={0}>
                  <XmlInput onChange={onChange} />
                </XmlText>
                <XmlElement name="emphasis">
                  <XmlTextarea onChange={onChange} />
                </XmlElement>
                <XmlText index={1}>
                  <XmlInput onChange={onChange} />
                </XmlText>
              </XmlElement>
              <XmlElement name="price">
                <label>Price Element</label>
                <XmlInput onChange={onChange} />
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
