import XMLDocument from "@src/components/nodes/XMLDocument";
import XMLRoot from "@src/components/nodes/XMLRoot";
import XMLElement from "@src/components/nodes/XMLElement";
import XMLAttribute from "@src/components/nodes/XMLAttribute";
import XMLText from "@src/components/nodes/XMLText";

export { default as Input } from "@src/components/inputs/XMLInput";
export { default as Select } from "@src/components/inputs/XMLSelect";
export { default as TextArea } from "@src/components/inputs/XMLTextArea";

export { type XMLDocumentRefType } from "@src/components/nodes/XMLDocument";

// Namespace the node components under XML using XMLDocument as the base component
export const XML = Object.assign(XMLDocument, {
  Root: XMLRoot,
  Element: XMLElement,
  Attribute: XMLAttribute,
  Text: XMLText,
});
