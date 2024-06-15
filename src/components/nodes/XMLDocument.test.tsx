import { render, screen } from "@testing-library/react";
import XMLDocument, {
  XMLDocumentRefType,
} from "@src/components/nodes/XMLDocument";
import { createRef } from "react";
import { NodeContextType } from "@src/contexts/Node.context";
import "@testing-library/jest-dom";

const initialXmlStr = `<example>test</example>`;
const initialDoc = new DOMParser().parseFromString(
  initialXmlStr,
  "application/xml",
);
const updatedXmlStr = `<updated>test</updated>`;
const updatedDoc = new DOMParser().parseFromString(
  updatedXmlStr,
  "application/xml",
);

describe("<XMLDocument />", () => {
  it("gets back the same XML as a string", () => {
    const ref = createRef<XMLDocumentRefType>();
    render(<XMLDocument ref={ref} initialDoc={initialXmlStr} />);
    expect(ref.current?.getXmlString()).toEqual(initialXmlStr);
  });

  it("gets back the original document", () => {
    const ref = createRef<XMLDocumentRefType>();
    render(<XMLDocument ref={ref} initialDoc={initialDoc} />);
    expect(ref.current?.getXmlDocument()).toEqual(initialDoc);
  });

  it("can update the document with string", () => {
    const ref = createRef<XMLDocumentRefType>();
    render(<XMLDocument ref={ref} initialDoc={initialDoc} />);
    ref.current?.setXmlDocument(updatedXmlStr);
    expect(ref.current?.getXmlString()).toEqual(updatedXmlStr);
  });

  it("can update the document with a new instance", () => {
    const ref = createRef<XMLDocumentRefType>();
    render(<XMLDocument ref={ref} initialDoc={initialDoc} />);
    ref.current?.setXmlDocument(updatedDoc);
    expect(ref.current?.getXmlDocument()).toEqual(updatedDoc);
  });

  it("has a current level of zero", () => {
    render(
      <XMLDocument initialDoc={initialXmlStr}>
        {(context: NodeContextType) => <span>level is {context.level}</span>}
      </XMLDocument>,
    );
    expect(screen.queryByText("level is 0")).toBeInTheDocument();
  });
});
