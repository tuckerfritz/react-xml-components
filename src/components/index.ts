export { type XmlEditorRefType } from "./XmlEditor";

import XmlAttribute from "./XmlAttribute";
import XmlEditor from "./XmlEditor";
import XmlElement from "./XmlElement";
import XmlInput from "./XmlInput";
import XmlSelect from "./XmlSelect";
import XmlText from "./XmlText";
import XmlTextarea from "./XmlTextarea";

export default {
  Attribute: XmlAttribute,
  Root: XmlEditor,
  Element: XmlElement,
  Input: XmlInput,
  Select: XmlSelect,
  Text: XmlText,
  Textarea: XmlTextarea,
};
