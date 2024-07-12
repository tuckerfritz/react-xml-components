# Documentation

React XML Components is a component library for easily editing XML documents.

## Example:

Given the following snippet of XML

```xml
<bookstore>
  <book>
    <title>Learning XML</title>
    <price>39.99</price>
  </book>
</bookstore>
```

We can edit it like so:

```jsx
import { XML, XMLDocumentRefType } from "react-xml-components";
import XMLViewer from "react-xml-viewer";

export function Example() {
  const editorRef = useRef<XMLDocumentRefType>(null);
  const [xml, setXml] = useState(`<bookstore>
  <book>
    <title>Learning XML</title>
    <price>39.99</price>
  </book>
</bookstore>`);

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
          <XML.Element name="bookstore">
            <XML.Element name="book">
              <XML.Element name="title">
                <Input/>
              </XML.Element>
              <XML.Element name="price">
                <Input/>
              </XML.Element>
            </XML.Element>
          </XML.Element>
        </XML>
        <button type="submit">submit</button>
      </form>
      <XMLViewer xml={xml} />
    </div>
  );
}
```

When the submit button is clicked, we use the ref to the XML element to get the XML back as a string and update our state.

## Components

This library splits components into two types:

<pre>
1) Components representing the XML Document and XML nodes:
  * XML
  * XML.Element
  * XML.Attribute
  * XML.Text
2) Input components for editing XML content:
  * Input
  * Select
  * TextArea
</pre>

In addition, this library also exports "NodeContext" that you can use in combination with React's useContext hook to wire up your own components with this library. This context can also be accessed in any element of the 1st type via a [child function](https://www.codedaily.io/tutorials/Using-Functions-as-Children-and-Render-Props-in-React-Components).

# Try It Out

This library isn't published on npm but you can run the following commands to view it in action:

```
git clone https://github.com/tuckerfritz/react-xml-components.git
npm i
npm run dev
```
