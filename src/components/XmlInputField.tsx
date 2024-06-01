import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import NodeContext from "../contexts/Node.context";
import LevelContext from "../contexts/Level.context";

type XmlInputFieldProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>
// > | {
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>, textNode: Node) => void;
//   };

const XmlInputField = forwardRef<HTMLInputElement, XmlInputFieldProps>(
  (props, inputRef) => {
    const xmlDoc = useContext(XmlEditorContext);
    const { ancestorNodePath } = useContext(NodeContext);
    const level = useContext(LevelContext);

    const textNodePath = `${ancestorNodePath}`;

    const textNode = useMemo(() => {
      const text = xmlDoc.evaluate(
        textNodePath,
        xmlDoc.getRootNode(),
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE
      );
      if (text.singleNodeValue === null) {
        throw Error(`Text Node Not Found`);
      }
      return text.singleNodeValue;
    }, [xmlDoc]);

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        textNode.textContent = event.target.value;
      },
      [textNode]
    );

    return (
      <input
        {...props}
        ref={inputRef}
        className={props.className ? `rxml__input ${props.className}` : "rxml__input"}
        onChange={onChange}
        data-level={level}
      />
    );
  }
);

export default XmlInputField;
